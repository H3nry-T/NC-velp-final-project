import {db} from './firebase'
import axios from "axios"
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

export const findLatAndLong = (postcode) => {
    return axios
        .get(`http://postcodes.io/postcodes/m11rn`)
        .then(({data}) => {
           return (data.result)
        })
}

export { getEventLocations }