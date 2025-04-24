// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOjavjCv3wnWEsaIqMVNUruz83HI3n4TQ",
  authDomain: "lstmovie-8bb07.firebaseapp.com",
  projectId: "lstmovie-8bb07",
  storageBucket: "lstmovie-8bb07.firebasestorage.app",
  messagingSenderId: "214059011383",
  appId: "1:214059011383:web:f4400d0a1b6b7203e15eb2",
  measurementId: "G-4YHGNSBF27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);