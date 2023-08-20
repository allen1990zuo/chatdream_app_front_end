// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBg8WN7ZcBZQSZFJn6UvGrUfK_XeNpdkng",
  authDomain: "chatdream-c6852.firebaseapp.com",
  projectId: "chatdream-c6852",
  storageBucket: "chatdream-c6852.appspot.com",
  messagingSenderId: "189019560984",
  appId: "1:189019560984:web:2ac95ffda7326f6012776d",
  measurementId: "G-PNP8NX7VCH"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const goggleAuthProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp);

export { auth, goggleAuthProvider, db };
