import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

export function loginWithPassword(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("Login Successfully");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      alert("Logging fail");
    });
}

export function loginWithGoogle() {
  let provider = new GoogleAuthProvider();

  return signInWithPopup(auth, provider)
    .then(() => {
      console.log("Login Successfully");
    })
    .catch((error) => {
      console.log("login error");
      // Handle Errors here.
      const errorCode = error.code;
      console.log(errorCode);
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

export function logout() {
  return signOut(auth)
    .then(() => {
      clearAccessToken();
      console.log("Logout Sucessfully");
    })
    .catch((error) => {
      console.log(error.message);
    });
}

const setAccessToken = (token) => {
  sessionStorage.setItem("accessToken", token);
};

export const getAccessToken = () => {
  sessionStorage.getItem("accessToken");
};

const clearAccessToken = () => {
  sessionStorage.removeItem("accessToken");
};

export const authStateListener = () => {
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (!user && location.pathname !== "/login.html") {
      clearAccessToken();
      return (location.href = "login.html");
    } else if (user && location.pathname === "/login.html") {
      setAccessToken(user.accessToken);
      location.href = "index.html";
    }
  });
};
