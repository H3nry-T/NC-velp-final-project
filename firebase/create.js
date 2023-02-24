import { getFirestore, collection, addDoc } from "firebase/firestore";
import { testEventsCollection } from "./read";

//n.b. addDoc automatically creates an id, whereas setDoc appears to require one passed in

/* TODO I adding a promise chain instead
of async await because I need the error
 to propagate out of the function's scope */

// export async function createNewTestEvent(eventData) {
//   if (eventData) {
//     try {
//       const newEventRef = await addDoc(testEventsCollection, eventData);
//     } catch (error) {
//       alert(error);
//       return new Error(`${error} firebase: mismatch of data types`);
//     }
//   }
// }

export function createNewTestEvent(eventData) {
  return new Promise((resolve, reject) => {
    if (!eventData) {
      reject(new Error("eventData is required"));
      return;
    }

    addDoc(testEventsCollection, eventData)
      .then((newEventRef) => {
        resolve(newEventRef);
      })
      .catch((error) => {
        reject(new Error(`${error} firebase: mismatch of data types`));
      });
  });
}
