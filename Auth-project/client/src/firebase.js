// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-a7b1e.firebaseapp.com",
  projectId: "mern-auth-a7b1e",
  storageBucket: "mern-auth-a7b1e.appspot.com",
  messagingSenderId: "324636013364",
  appId: "1:324636013364:web:64f506a5003c3478f66b61"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);