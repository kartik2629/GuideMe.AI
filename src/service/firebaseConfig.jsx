import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9zM_m_5GYh0-H6D0a_7f4RuyB3Fv9dJM",
  authDomain: "guidemeai-57bae.firebaseapp.com",
  projectId: "guidemeai-57bae",
  storageBucket: "guidemeai-57bae.firebasestorage.app",
  messagingSenderId: "602957579901",
  appId: "1:602957579901:web:32bc1d2456db8ba13f1314",
  measurementId: "G-PZ5CX95C9G",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);
export { auth, provider, signInWithPopup, signOut };
