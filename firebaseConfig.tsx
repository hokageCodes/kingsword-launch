// src/firebaseConfig.tsx
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore, collection, addDoc, getDoc, doc } from "firebase/firestore";
import { getAuth, Auth, signInWithEmailAndPassword, User } from "firebase/auth";
import { getAnalytics, Analytics } from "firebase/analytics";

let app: FirebaseApp;
let db: Firestore;
let auth: Auth;
let analytics: Analytics;

const firebaseConfig = {
  apiKey: "AIzaSyAuny5xpmnG3WJ66hPi3RtunJVFXPm1AcM",
  authDomain: "kingsword-canada.firebaseapp.com",
  projectId: "kingsword-canada",
  storageBucket: "kingsword-canada.appspot.com",
  messagingSenderId: "48460646446",
  appId: "1:48460646446:web:c3b0baea1384d5ccb477bf",
  measurementId: "G-PKX3ZF67W3"
};

if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  analytics = getAnalytics(app);
}

export { db, collection, addDoc, auth, signInWithEmailAndPassword, getDoc, doc };
