import { getFirestore,doc, deleteDoc } from "firebase/firestore";

const db = getFirestore();

export const deleteAnEvent = async (event) => {
    console.log(event.event_id);
    try{
        deleteDoc(doc(db, "test_events", event.event_id))
        console.log("Document successfully deleted!");
    }
    catch(e){
        console.error("Error removing document: ", e);
    }finally{
        console.log("Done");
    }
    
    return
    
   
};

