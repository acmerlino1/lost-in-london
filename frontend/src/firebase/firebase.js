import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsTBGexfZU2wUmG8IelOJfVHKLueML2BQ",
  authDomain: "lost-in-london-b23aa.firebaseapp.com",
  databaseURL: "https://lost-in-london-b23aa.firebaseio.com",
  projectId: "lost-in-london-b23aa",
  storageBucket: "lost-in-london-b23aa.appspot.com",
  messagingSenderId: "189616144997",
  appId: "1:189616144997:web:17a2123874f2f6bfd3bc8c",
  measurementId: "G-9JJHTVVB2W",
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;
