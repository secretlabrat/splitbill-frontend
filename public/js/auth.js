import { auth } from "./firebase-config";
import {
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

export function loginWithPassword(email, password) {
  return signInWithEmailAndPassword(auth, email, password).then((user) => {
    console.log(user);
  });
}

export function lougot() {
  return signOut(auth)
    .then(() => {
      console.log("Logout Sucessful");
    })
    .catch((error) => {
      console.log(error.message);
    });
}
