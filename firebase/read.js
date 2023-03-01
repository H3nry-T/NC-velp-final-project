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
  console.log(1)
  let locations = [];
  const querySnapshot = await getDocs(collection(db, "test_events"));
  querySnapshot.forEach((doc) => {
    const eventdetails = doc.data()
    eventdetails.event_id = doc.id
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
  console.log(2)
  try {
    const snapshot = await getDocs(testEventsCollection);
    const testEvents = [];
    snapshot.docs.forEach((doc) => {
      const tempData = doc.data();
      tempData.event_id = doc.id
      testEvents.push(tempData);
    });
    return testEvents;
  } catch (error) {
    console.error(error);
  }
};

export { testEventsCollection };
