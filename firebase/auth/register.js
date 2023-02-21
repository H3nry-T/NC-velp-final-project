import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const handleSignUp = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert(`you have registered as ${user.email}`);
    })
    .catch((err) => {
      alert(`${err.code} ${err.message}`);
    });
};
