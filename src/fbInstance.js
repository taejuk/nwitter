import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBXSNElpG3wu7Za3cG9pLczppNDhzt-FKA",
  authDomain: "nwitter-2086d.firebaseapp.com",
  projectId: "nwitter-2086d",
  storageBucket: "nwitter-2086d.appspot.com",
  messagingSenderId: "760610480471",
  appId: "1:760610480471:web:d76ec53e81cf088f2cde12",
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();

export const dbService = firebase.firestore();

export const storageService = firebase.storage();
