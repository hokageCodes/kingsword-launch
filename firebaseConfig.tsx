"use client";

import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, orderBy,serverTimestamp } from "firebase/firestore";
import { getAuth, Auth, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";

// Define Firebase services
let app: FirebaseApp;
let db: Firestore;
let auth: Auth;
let storage: FirebaseStorage;

const firebaseConfig = {
  apiKey: "AIzaSyAuny5xpmnG3WJ66hPi3RtunJVFXPm1AcM",
  authDomain: "kingsword-canada.firebaseapp.com",
  projectId: "kingsword-canada",    
  storageBucket: "kingsword-canada.appspot.com",
  messagingSenderId: "48460646446",
  appId: "1:48460646446:web:c3b0baea1384d5ccb477bf",
  measurementId: "G-PKX3ZF67W3"
};

// Initialize Firebase and services
const initializeFirebase = () => {
  if (!app) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
  }
};

// Run initialization function
initializeFirebase();

// Export services
export {
  db,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  auth,
  signInWithEmailAndPassword,
  storage,
  query,
  orderBy,
  serverTimestamp
};
