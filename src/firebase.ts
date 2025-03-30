// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDqSa7Jgvbs9LmPFYFqcKh0kG-Cue0mNc4",
  authDomain: "taskmasterapp-9c23f.firebaseapp.com",
  projectId: "taskmasterapp-9c23f",
  storageBucket: "taskmasterapp-9c23f.firebasestorage.app",
  messagingSenderId: "991885258961",
  appId: "1:991885258961:web:2d00d1746bd0d9057e15f0",
  measurementId: "G-SKQ6JNSMME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

