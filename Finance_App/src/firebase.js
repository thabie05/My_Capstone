// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration (replace with your own)
const firebaseConfig = {
  apiKey: "AIzaSyBkMOF2BUA6EK4WYrlRxww8_zP9sfBF9cs",
  authDomain: "expense-tracker-20c32.firebaseapp.com",
  projectId: "expense-tracker-20c32",
  storageBucket: "expense-tracker-20c32.firebasestorage.app",
  messagingSenderId: "817674894380",
  appId: "1:817674894380:web:c42dfef5d452862c2fe589",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);