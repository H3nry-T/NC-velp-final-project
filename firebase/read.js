// // import axios from "axios";
// import { getFirestore, collection, query, where, getDocs  } from "firebase/firestore";

// const dataBase = getFirestore();
// const testEventsCollection = collection(dataBase, "test_events");
// export const getTestEvents = async () => {
//   try {
//     const myQueryFireBase = query(testEventsCollection, where("id", "==", "WPBPeJ7P30cPeqEOY4RO"));
//     const snapshot = await getDocs(myQueryFireBase);

//     const testEvents = [];
//     const result = snapshot.docs[0].data()
//     console.log("🔥result:", result);

    
//   } catch (error) {
//     console.log(error); 
//   }

// }



import { getFirestore, collection, query, where, getDocs, addDoc ,updateDoc} from "firebase/firestore";

const db = getFirestore();
const myDataFromFireBase = collection(db, "test_events");

// add data on firebase
// export const createEvents = async () => {
//   await addDoc(myDataFromFireBase, {name:"JASOONqqq",event:"qqqEVENT1"});
//  console.log("DATA SEND TO FIREBASE");
// };
const updateData = async () => {
  const id = "zbj87Ysm5i5vZA7GEFzb"
  const mAj = {email:"test123@yoyo.com"};
  const myEven = doc(db, "test_events", id)
  console.log("🚨🔥:", myEven);

  // await updateDoc(myDataFromFireBase, mAj);
}
