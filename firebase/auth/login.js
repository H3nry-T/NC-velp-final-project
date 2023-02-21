import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const handleLogIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert(`you have logged in as ${user.email}`);
    })
    .catch((err) => {
      alert(`${err.code} ${err.message}`);
    });
};
