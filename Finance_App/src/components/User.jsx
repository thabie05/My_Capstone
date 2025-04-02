// User.jsx
import React from 'react';

const User = () => {
  // Sample user data - replace with actual data from your app
  const user = {
    name: "Thabelo Tshishonga",
    email: "Thabelo.Tshishonga@gmail.com",
    joined: "March 2025",
    avatar: "https://via.placeholder.com/150",
    preferences: {
      currency: "ZAR",
      theme: "Dark",
      notifications: true
    }
  };

  return (
    <div className="min-h-screen text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">User Profile</h1>
        
        <div className="bg-[#252f53be] rounded-2xl shadow-lg p-8">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <img 
              src="/developer.jpg" 
              alt="User avatar" 
              className="w-32 h-32 rounded-full border-4 border-blue-600"
            />
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
                  <dd className="font-medium">{user.preferences.currency}</dd>
                </div>
                <div>
                  <dt className="text-gray-400">Theme</dt>
                  <dd className="font-medium">{user.preferences.theme}</dd>
                </div>
                <div>
                  <dt className="text-gray-400">Notifications</dt>
                  <dd className="font-medium">
                    {user.preferences.notifications ? "Enabled" : "Disabled"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;