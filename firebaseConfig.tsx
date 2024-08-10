import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, collection, addDoc, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore';
import { getAuth, Auth, signInWithEmailAndPassword } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuny5xpmnG3WJ66hPi3RtunJVFXPm1AcM",
  authDomain: "kingsword-canada.firebaseapp.com",
  projectId: "kingsword-canada",
  storageBucket: "kingsword-canada.appspot.com",
  messagingSenderId: "48460646446",
  appId: "1:48460646446:web:c3b0baea1384d5ccb477bf",
  measurementId: "G-PKX3ZF67W3"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore, Storage, Auth, and Analytics
const db: Firestore = getFirestore(app);
const storage = getStorage(app);
const auth: Auth = getAuth(app);

export { app, db, storage, auth, collection, addDoc, getDocs, getDoc, deleteDoc, doc, signInWithEmailAndPassword, firebaseConfig };
