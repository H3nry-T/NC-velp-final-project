// import axios from "axios";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const dataBase = getFirestore();
const testEventsCollection = collection(dataBase, "test_events");

export const getTestEvents = () => {
  getDocs(testEventsCollection)
    .then((snapshot) => {
      const testEvents = snapshot.docs.map((doc) => {
        return doc.data();
      });
      //   console.log(test);
      return testEvents;
    })
    .catch((err) => {
      console.error(err);
    });
};
