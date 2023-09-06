// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


// Enable Firebase debugging
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7gslbS1EDR1UUfpNMW5h-MzDYteSI-Dg",
  authDomain: "hooptracker-react.firebaseapp.com",
  projectId: "hooptracker-react",
  storageBucket: "hooptracker-react.appspot.com",
  messagingSenderId: "389406248327",
  appId: "1:389406248327:web:161a0aa140190ade991722",
  measurementId: "G-JZ0YPMDQB2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
window.firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);