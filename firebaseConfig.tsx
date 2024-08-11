import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore, collection, addDoc, getDocs, getDoc, deleteDoc, doc } from "firebase/firestore";
import { getAuth, Auth, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Correct import
import { getAnalytics, Analytics } from "firebase/analytics";

let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let auth: Auth | undefined;
let storage: ReturnType<typeof getStorage> | undefined; // Use ReturnType to type storage
let analytics: Analytics | undefined;

const firebaseConfig = {
  apiKey: "AIzaSyAuny5xpmnG3WJ66hPi3RtunJVFXPm1AcM",
  authDomain: "kingsword-canada.firebaseapp.com",
  projectId: "kingsword-canada",
  storageBucket: "kingsword-canada.appspot.com",
  messagingSenderId: "48460646446",
  appId: "1:48460646446:web:c3b0baea1384d5ccb477bf",
  measurementId: "G-PKX3ZF67W3"
};

// Initialize Firebase only if it's not already initialized
if (typeof window !== "undefined" && !app) {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app); // Initialize Firebase Storage
  analytics = getAnalytics(app);
}

export { db, collection, addDoc, getDocs, getDoc, deleteDoc, doc, auth, signInWithEmailAndPassword, storage, firebaseConfig };
