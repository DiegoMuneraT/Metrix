// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
//import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// fire base config testing (Diego)
const firebaseConfig = {
  apiKey: "AIzaSyDyVBmMBWYA4JuEiQ8m9X7sYYbz3YmpFUA",
  authDomain: "metrix-7f073.firebaseapp.com",
  projectId: "metrix-7f073",
  storageBucket: "metrix-7f073.appspot.com",
  messagingSenderId: "1022737468292",
  appId: "1:1022737468292:web:7c9023b4aafcf0303b6bd1",
  measurementId: "G-WMZ0C2NFE4",
};

// firebase config testing (Juan Esteban)

// const firebaseConfig = {
//   apiKey: "AIzaSyB7lpI8LBfqc1oBj4qR8MR5FjBYs6bkdec",
//   authDomain: "metrix-4b9e0.firebaseapp.com",
//   databaseURL: "https://metrix-4b9e0-default-rtdb.firebaseio.com",
//   projectId: "metrix-4b9e0",
//   storageBucket: "metrix-4b9e0.appspot.com",
//   messagingSenderId: "391256473986",
//   appId: "1:391256473986:web:dca414fe6a8d7fabd34f9b",
//   measurementId: "G-9Y69TNX3VR",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default app
