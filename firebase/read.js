// import axios from "axios";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const dataBase = getFirestore();
const testEventsCollection = collection(dataBase, "test_events");

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
