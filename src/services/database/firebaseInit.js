import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import Metapp from 'services/database/firebaseConfig'

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database

  // databaseURL testing (Diego)
  databaseURL: "https://metrix-7f073-default-rtdb.firebaseio.com/",

  // databaseURL testing (juan esteban)
  // databaseURL: "https://metrix-4b9e0-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(Metapp);
