
//UPDATE DATA WHEN USER ADD HIMSELF TO THE EVENTS
import { getAuth } from "firebase/auth";
import { useEffect,useState } from "react";
import { getFirestore, doc, arrayUnion,updateDoc, setDoc, getDoc } from "firebase/firestore";
import { auth } from "./firebase";



const db = getFirestore();
// ---------------

//1 STEP CHANGE DATA "ANY"
const myupdate = async () => {
    try {
      const ref = doc(db, "test_events", "zbj87Ysm5i5vZA7GEFzb");
      await updateDoc(ref, {allo: "update@update.com"});
      console.log("Document updated successfully");
    } catch (e) {
      console.error("Error updating document:", e);
    }
  }
  
  const test = ()=>{

    const [user, setUser] = useState(null);
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
      });
      
      
      return unsubscribe;
    }, []);
  }
//GET USERNAME FROM USER WHEN IS LOGED IN



// //WE ADD USER IN THE EVENT


const authUser = auth.currentUser;
const UserInformationOnRegisterTestEvent = {
  email: authUser.email,
  userId: authUser.uid,
}

export const registerOnEvent = async (event) => {
  console.log(event);
  try{
    const ref = doc(db, "test_events", event.event_id);   
    await updateDoc(ref, {
      volunteers:arrayUnion(UserInformationOnRegisterTestEvent)
  });

    console.log("Document updated successfully"); 
  }
  catch (e) {
    console.error("Error updating document:", e);
  }
}
//increment the number of people in the event

