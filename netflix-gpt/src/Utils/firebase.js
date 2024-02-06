// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { FIREBASE_API } from "./constants";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API,
  authDomain: "netflix-clone-84dac.firebaseapp.com",
  projectId: "netflix-clone-84dac",
  storageBucket: "netflix-clone-84dac.appspot.com",
  messagingSenderId: "562201880387",
  appId: "1:562201880387:web:09c2c942ad2b79c8d971f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()