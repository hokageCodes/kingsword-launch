import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { getAuth, Auth, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAuny5xpmnG3WJ66hPi3RtunJVFXPm1AcM",
  authDomain: "kingsword-canada.firebaseapp.com",
  projectId: "kingsword-canada",
  storageBucket: "kingsword-canada.appspot.com",
  messagingSenderId: "48460646446",
  appId: "1:48460646446:web:c3b0baea1384d5ccb477bf",
  measurementId: "G-PKX3ZF67W3"
};

let app: FirebaseApp;
let db: Firestore;
let auth: Auth;
let storage: FirebaseStorage;

if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);
} else {
  throw new Error("Firebase can only be initialized on the client-side");
}

export { db, collection, addDoc, getDocs, getDoc, deleteDoc, doc, auth, signInWithEmailAndPassword, storage };
