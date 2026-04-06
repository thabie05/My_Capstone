// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register a new user
  const register = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        joined: serverTimestamp(),
        photoURL: null
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  // Update user profile (e.g., photoURL)
  const updateUserProfile = async (uid, data) => {
    try {
      await updateDoc(doc(db, 'users', uid), data);
      // Also update local state
      setCurrentUser(prev => ({ ...prev, ...data }));
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.data();
          console.log('Fetched user data:', userData);
          let joinedDate = 'N/A';
          if (userData?.joined) {
            joinedDate = userData.joined.toDate().toLocaleString('default', { month: 'long', year: 'numeric' });
          } else if (user.metadata?.creationTime) {
            const creationDate = new Date(user.metadata.creationTime);
            joinedDate = creationDate.toLocaleString('default', { month: 'long', year: 'numeric' });
          }
          setCurrentUser({ 
            uid: user.uid, 
            email: user.email, 
            name: userData?.name || 'User',
            joined: joinedDate,
            photoURL: userData?.photoURL || null
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          setCurrentUser({ 
            uid: user.uid, 
            email: user.email, 
            name: 'User',
            joined: 'N/A',
            photoURL: null
          });
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    user: currentUser,
    isAuthenticated: !!currentUser,
    login,
    register,
    logout,
    loading,
    updateUserProfile   // expose this function
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);