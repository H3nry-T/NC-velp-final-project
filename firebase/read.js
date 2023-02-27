import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const testEventsCollection = collection(db, "test_events");

export const getTestEvents = async () => {
  try {
    const snapshot = await getDocs(testEventsCollection);

    const testEvents = [];
    snapshot.docs.forEach((doc) => {
      const tempData = doc.data();
      const eventData = {
        ...tempData,
        event_id: doc.id,
      };
      testEvents.push(eventData);
    });
    return testEvents;
  } catch (error) {
    console.error(error);
  }
};

export { testEventsCollection };
