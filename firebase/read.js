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

async function getEventLocations() {
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

export { getEventLocations };
