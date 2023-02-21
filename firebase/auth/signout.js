import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const handleSignOut = (replace) => {
  signOut(auth)
    .then(() => {
      alert("signed out successful!");
      replace("Login");
    })
    .catch((err) => {
      alert(`${err.message}`);
    });
};
