
//UPDATE DATA WHEN USER ADD HIMSELF TO THE EVENTS
import { getAuth } from "firebase/auth";


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
  
  myupdate();
const [user, setUser] = useState(null);

useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    setUser(user);
    console.log("🚨🔥  file: update.js:25  unsubscribe  user:", user);
  });


  return unsubscribe;
}, []);
//GET USERNAME FROM USER WHEN IS LOGED IN

const auth = getAuth();
const authUser = auth.currentUser;
console.log("🚨🔥  file: update.js:25  unsubscribe  user:", authUser);

//WE ADD USER IN THE EVENT



//increment the number of people in the event
