// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; 
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 
import {getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvocQb81-Zb8_DExaHTUXqzcs_3giE5dY",
  authDomain: "podcast-platform-e33ba.firebaseapp.com",
  projectId: "podcast-platform-e33ba",
  storageBucket: "podcast-platform-e33ba.appspot.com",
  messagingSenderId: "524115993883",
  appId: "1:524115993883:web:578f190269e05989fb9fbe",
  measurementId: "G-RS37QKYSFJ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
export {auth, db, storage};
