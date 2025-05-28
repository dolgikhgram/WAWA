import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDC1i0H2GKYHzNl2aibPmu7B5N_WHr4T1Y",
  authDomain: "wawaboost-a14b7.firebaseapp.com",
  projectId: "wawaboost-a14b7",
  storageBucket: "wawaboost-a14b7.firebasestorage.app",
  messagingSenderId: "761690607662",
  appId: "1:761690607662:web:e6e4d9b0e680a38785cfbf",
  measurementId: "G-0L5VYWPZ6Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, db, storage }; 