// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh6uBCX7BjmpF_QmmA35EgrDE4_WhZ4eM",
  authDomain: "fir-push-778ed.firebaseapp.com",
  projectId: "fir-push-778ed",
  storageBucket: "fir-push-778ed.appspot.com",
  messagingSenderId: "1085225324214",
  appId: "1:1085225324214:web:386cbcae50903f57146017",
  measurementId: "G-5Z41YH5WTP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);