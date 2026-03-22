// context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
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

      // Store additional user info in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        joined: serverTimestamp()
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Login existing user
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch additional user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        setCurrentUser({ 
          uid: user.uid, 
          email: user.email, 
          name: userData?.name || 'User',
          joined: userData?.joined?.toDate().toLocaleString('default', { month: 'long', year: 'numeric' }) || 'N/A'
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);