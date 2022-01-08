// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const API_KEY = process.env.REACT_APP_API_KEY;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "ph-mngr.firebaseapp.com",
  projectId: "ph-mngr",
  storageBucket: "ph-mngr.appspot.com",
  messagingSenderId: "309675027165",
  appId: "1:309675027165:web:97be228bcf4aeec3294934",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);

export { firebaseApp, firebaseStorage, db };
