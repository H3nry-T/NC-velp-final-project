//UPDATE DATA WHEN USER ADD HIMSELF TO THE EVENTS
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  arrayUnion,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { auth } from "./firebase";
import { useNavigation } from "@react-navigation/native";

const db = getFirestore();
const test = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);
};


export const registerOnEvent = async (event) => {
  const authUser = auth.currentUser;
  const UserInformationOnRegisterTestEvent = {
    email: authUser.email,
    userId: authUser.uid,
  };
  console.log(auth);
  try {
    const ref = doc(db, "test_events", event.event_id);
    await updateDoc(ref, {
      volunteers: arrayUnion(UserInformationOnRegisterTestEvent),
    });

    console.log("Document updated successfully");
  } catch (e) {
    console.error("Error updating document:", e);
  }
};




export const updateEvent = async (event) => {
console.log("update event ");

};