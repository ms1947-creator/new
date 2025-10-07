// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2c4X7qXGh1064bZWbp_aSueg-To6bwLM",
  authDomain: "farmalynk-67917.firebaseapp.com",
  projectId: "farmalynk-67917",
  storageBucket: "farmalynk-67917.firebasestorage.app",
  messagingSenderId: "1009606870723",
  appId: "1:1009606870723:web:a1e360ade7b67268de0476",
  measurementId: "G-PJ3KVK9P2N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Firestore
const db = getFirestore(app);

// Export all needed objects
export { app, analytics, auth, googleProvider, db, RecaptchaVerifier };
