// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDyVBmMBWYA4JuEiQ8m9X7sYYbz3YmpFUA",
  authDomain: "metrix-7f073.firebaseapp.com",
  projectId: "metrix-7f073",
  storageBucket: "metrix-7f073.appspot.com",
  messagingSenderId: "1022737468292",
  appId: "1:1022737468292:web:7c9023b4aafcf0303b6bd1",
  measurementId: "G-WMZ0C2NFE4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = getDatabase(app);