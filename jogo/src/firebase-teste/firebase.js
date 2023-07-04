// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlfV1O-7xgBu3V7FbkSegGovv4OMpiVcc",
  authDomain: "spaceweb-auth.firebaseapp.com",
  projectId: "spaceweb-auth",
  storageBucket: "spaceweb-auth.appspot.com",
  messagingSenderId: "864641570899",
  appId: "1:864641570899:web:cddb6563f758ae103bcea6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app