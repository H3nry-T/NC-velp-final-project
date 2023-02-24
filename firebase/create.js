import { getFirestore, collection, addDoc } from "firebase/firestore";
import { testEventsCollection } from "./read";

//n.b. addDoc automatically creates an id, whereas setDoc appears to require one passed in

export async function createNewTestEvent(eventData) {
  if (eventData) {
    try {
      const newEventRef = await addDoc(testEventsCollection, eventData);
    } catch (error) {
      console.error(error);
    }
  }
}
