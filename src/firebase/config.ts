import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics, isSupported } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDC1i0H2GKYHzNl2aibPmu7B5N_WHr4T1Y",
  authDomain: "wawaboost-a14b7.firebaseapp.com",
  projectId: "wawaboost-a14b7",
  storageBucket: "wawaboost-a14b7.firebasestorage.app",
  messagingSenderId: "761690607662",
  appId: "1:761690607662:web:e6e4d9b0e680a38785cfbf",
  measurementId: "G-0L5VYWPZ6Y"
};

let app: FirebaseApp;
let analytics: Analytics | null = null;
let db: Firestore;
let storage: FirebaseStorage;
let isInitialized = false;

try {
  app = initializeApp(firebaseConfig);
  
  // Проверяем поддержку analytics
  isSupported().then(yes => yes ? analytics = getAnalytics(app) : null);
  
  db = getFirestore(app);
  storage = getStorage(app);
  isInitialized = true;
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization failed:', error);
  throw new Error('Firebase initialization failed');
}

export const checkFirebaseConnection = async () => {
  if (!isInitialized) {
    throw new Error('Firebase is not initialized');
  }
  try {
    const testCollection = collection(db, 'test');
    const testDoc = await addDoc(testCollection, { test: true });
    await deleteDoc(doc(db, 'test', testDoc.id));
    return true;
  } catch (error) {
    console.error('Firebase connection check failed:', error);
    return false;
  }
};

export { app, analytics, db, storage, isInitialized }; 