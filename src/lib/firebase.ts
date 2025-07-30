import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "afortu",
  appId: "1:280531811428:web:5c9b7096e63736f8f17371",
  storageBucket: "afortu.firebasestorage.app",
  apiKey: "AIzaSyAwvf4ONYgS8MfNoJ2Sl9cQ7xXCcbMi5-I",
  authDomain: "afortu.firebaseapp.com",
  messagingSenderId: "280531811428",
  databaseURL: "https://afortu-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };