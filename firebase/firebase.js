// Import the functions you need from the SDKs you need
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//======================//
//== Firebase Imports ==//
//======================//

import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDatabase,
  doc,
} from "firebase/firestore";

//---------------------//

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB165I7TZpXfWoCKQVXDIzQ3LHHoIC7UF0",
  authDomain: "test-d9699.firebaseapp.com",
  projectId: "test-d9699",
  storageBucket: "test-d9699.appspot.com",
  messagingSenderId: "959354945276",
  appId: "1:959354945276:web:a88d20d257b36e6713e179",
};

//OLD CONFIG DO NOT DELETE
// {
//   apiKey: "AIzaSyA_3Ucha-eEIEgAfCbXM2yA7Nr5UmVk9Wg",
//   authDomain: "fir-auth-7678a.firebaseapp.com",
//   projectId: "fir-auth-7678a",
//   storageBucket: "fir-auth-7678a.appspot.com",
//   messagingSenderId: "534706956586",
//   appId: "1:534706956586:web:d094759d5e094bec939653",
// };
/*========================= */
/*================= */
// Get a Firestore instance

// Use the collection function to create a reference to your collection

// Initialize Firebase
let app;
let auth;
if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  app = getApp();
  auth = getAuth();
}
let db = getFirestore(app);
export { auth, app, db, collection, addDoc, getDocs };
