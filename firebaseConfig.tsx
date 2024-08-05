// firebaseConfig.tsx
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore, collection, addDoc } from "firebase/firestore";
import { getAnalytics, Analytics } from "firebase/analytics";


let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let analytics: Analytics | undefined;

if (typeof window !== "undefined") {
  // Firebase config
    const firebaseConfig = {
        apiKey: "AIzaSyAuny5xpmnG3WJ66hPi3RtunJVFXPm1AcM",
        authDomain: "kingsword-canada.firebaseapp.com",
        projectId: "kingsword-canada",
        storageBucket: "kingsword-canada.appspot.com",
        messagingSenderId: "48460646446",
        appId: "1:48460646446:web:c3b0baea1384d5ccb477bf",
        measurementId: "G-PKX3ZF67W3"
    };

    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    analytics = getAnalytics(app);
}

export { db, collection, addDoc };
