import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBgqMDhVO-8thvyzdIaU3rmQ0CM3kW8KSg",
    authDomain: "hallo-fresh-grocery.firebaseapp.com",
    projectId: "hallo-fresh-grocery",
    storageBucket: "hallo-fresh-grocery.firebasestorage.app",
    messagingSenderId: "780717402194",
    appId: "1:780717402194:web:b3a07068156e359fc3178b",
    measurementId: "G-NCNGJJJ6S8"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Enable offline persistence if in browser
if (typeof window !== "undefined") {
    enableIndexedDbPersistence(db).catch((err: any) => {
        if (err.code === 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled in one tab at a time.
            console.warn("Multiple tabs open, Firestore persistence can only be enabled in one tab at a time.");
        } else if (err.code === 'unimplemented') {
            // The current browser doesn't support all of the features required to enable persistence
            console.warn("The current browser doesn't support Firestore persistence.");
        }
    });
}

// Initialize Analytics conditionally (only in browser)
let analytics: any;
if (typeof window !== 'undefined') {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { app, auth, db, analytics };
