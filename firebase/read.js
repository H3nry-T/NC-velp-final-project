import { db } from "./firebase";
import axios from "axios";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDatabase,
  doc,
} from "firebase/firestore";

const dataBase = getFirestore();
const testEventsCollection = collection(dataBase, "test_events");

export async function getEventLocations() {
  let locations = [];
  const querySnapshot = await getDocs(collection(db, "test_markers"));
  querySnapshot.forEach((doc) => {
    const eventdetails = doc.data()
    eventdetails.id = doc.id
    locations.push(eventdetails);
  });
  return locations;
}

export const findLatAndLong = async (postcode) => {
  try {
    const latAndLongData = await axios.get(
      `http://postcodes.io/postcodes/${postcode}`
    );
    return latAndLongData.data.result;
  } catch (error) {
    console.error(error);
  }
};

export const getTestEvents = async () => {
  try {
    const snapshot = await getDocs(testEventsCollection);
    const testEvents = [];
    snapshot.docs.forEach((doc) => {
      const tempData = doc.data();
      testEvents.push(tempData);
    });
    // console.log(testEvents);
    return testEvents;
  } catch (error) {
    console.error(error);
  }
};


