// components/User.js
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const User = () => {
  const { user, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  if (!user) return <div className="text-white p-8">Loading...</div>;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, etc.)');
      return;
    }

    // Max size 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const storage = getStorage();
      const storageRef = ref(storage, `profilePictures/${user.uid}`);
      
      // Delete old picture if exists
      try {
        await deleteObject(storageRef);
      } catch (err) {
        // Ignore if no old picture
      }

      // Upload new file
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload error:", error);
          alert("Upload failed. Please try again.");
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          // Update Firestore user document
          await updateDoc(doc(db, 'users', user.uid), { photoURL: downloadURL });
          // Update local context
          await updateUserProfile(user.uid, { photoURL: downloadURL });
          setUploading(false);
          alert("Profile picture updated!");
        }
      );
    } catch (err) {
      console.error(err);
      alert("Error uploading picture.");
      setUploading(false);
    }
  };

  // Preferences placeholder (can be stored in Firestore later)
  const preferences = {
    currency: "ZAR",
    theme: "Dark",
    notifications: true
  };

  return (
    <div className="min-h-screen text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">User Profile</h1>

        <div className="bg-[#252f53be] rounded-2xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            {/* Profile Picture with upload */}
            <div className="relative">
              <img 
                src={user.photoURL || "/developer.png"} 
                alt="User avatar" 
                className="w-32 h-32 rounded-full border-4 border-blue-600 object-cover"
              />
              <button
                onClick={handleUploadClick}
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full text-xs hover:bg-blue-700"
                disabled={uploading}
              >
                📷
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                  <div className="text-white text-sm">{Math.round(uploadProgress)}%</div>
                </div>
              )}
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
              <p className="text-gray-400">{user.email}</p>
              <p className="text-gray-400">Member since {user.joined}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-gray-400">Full Name</dt>
                  <dd className="font-medium">{user.name}</dd>
                </div>
                <div>
                  <dt className="text-gray-400">Email Address</dt>
                  <dd className="font-medium">{user.email}</dd>
                </div>
                <div>
                  <dt className="text-gray-400">Member Since</dt>
                  <dd className="font-medium">{user.joined}</dd>
                </div>
              </dl>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Preferences</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-gray-400">Currency</dt>
                  <dd className="font-medium">{preferences.currency}</dd>
                </div>
                <div>
                  <dt className="text-gray-400">Theme</dt>
                  <dd className="font-medium">{preferences.theme}</dd>
                </div>
                <div>
                  <dt className="text-gray-400">Notifications</dt>
                  <dd className="font-medium">
                    {preferences.notifications ? "Enabled" : "Disabled"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;