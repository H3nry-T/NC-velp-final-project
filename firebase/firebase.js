// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_3Ucha-eEIEgAfCbXM2yA7Nr5UmVk9Wg",
  authDomain: "fir-auth-7678a.firebaseapp.com",
  projectId: "fir-auth-7678a",
  storageBucket: "fir-auth-7678a.appspot.com",
  messagingSenderId: "534706956586",
  appId: "1:534706956586:web:d094759d5e094bec939653",
};

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
export { auth, app };

export const handleSignUp = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert(`you have registered as ${user.email}`);
    })
    .catch((err) => {
      alert(`${err.code} ${err.message}`);
    });
};

export const handleLogIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert(`you have logged in as ${user.email}`);
    })
    .catch((err) => {
      alert(`${err.code} ${err.message}`);
    });
};
