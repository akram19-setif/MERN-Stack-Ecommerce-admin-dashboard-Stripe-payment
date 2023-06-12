// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJ-9eiO4yJe87IwqdqP1SmmKMEAHBRbQ8",
  authDomain: "shopdz-ad82c.firebaseapp.com",
  projectId: "shopdz-ad82c",
  storageBucket: "shopdz-ad82c.appspot.com",
  messagingSenderId: "688210923506",
  appId: "1:688210923506:web:6d2ba82dd2d51f8d95a56b",
  measurementId: "G-7JLNSDJ7NQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
