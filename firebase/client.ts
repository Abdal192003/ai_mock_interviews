
import { initializeApp,getApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcDx0Wqb99L5gfCSMHTV6Td_HN6mdlYsI",
  authDomain: "prepwise-b96c3.firebaseapp.com",
  projectId: "prepwise-b96c3",
  storageBucket: "prepwise-b96c3.firebasestorage.app",
  messagingSenderId: "607414096903",
  appId: "1:607414096903:web:d2f7dcd6b339146a2886a2",
  measurementId: "G-ZMJQC21NFE"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);