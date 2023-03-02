import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCmhOvD_KUgeF8hIVl0uZsFN3Gb_5U7s70",
  authDomain: "mvcshop-896a4.firebaseapp.com",
  projectId: "mvcshop-896a4",
  storageBucket: "mvcshop-896a4.appspot.com",
  messagingSenderId: "422387615936",
  appId: "1:422387615936:web:38eae51d423ce8a5f80525"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
const FacebookAuthProvider = firebase.auth.FacebookAuthProvider;
const GithubAuthProvider = firebase.auth.GithubAuthProvider;

export {
  db,
  auth,
  storage,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
};
