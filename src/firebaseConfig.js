// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

// Firebase configuration object (ensure your keys are correct)
const firebaseConfig = {
  apiKey: "AIzaSyD9s2NqsdMYAKGcUo-1Rf4z7ChnnvSMC0A",
  authDomain: "app-c8341.firebaseapp.com",
  databaseURL: "https://app-c8341-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "app-c8341",
  storageBucket: "app-c8341.firebasestorage.app",
  messagingSenderId: "18315703632",
  appId: "1:18315703632:web:9576836a894dfc9257e855",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export {
  auth,
  provider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
};
