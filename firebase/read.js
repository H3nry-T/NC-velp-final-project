import {db} from './firebase'
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    getDatabase,
    doc,
  } from "firebase/firestore";

async function getEventLocations() {
    let myArray = [];
    const querySnapshot = await getDocs(collection(db, "test_markers"));
    querySnapshot.forEach((doc) => {
      myArray.push({id: doc.id, data: doc.data()});
    });
    return myArray;
  }
  
  getEventLocations().then((result) => {
    console.log(result);
  });

export { getEventLocations }