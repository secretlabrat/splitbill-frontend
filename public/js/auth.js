import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

export function signUpWithEmailAndPassword(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(() => console.log("sign up sucessfully"))
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
}

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
  return sessionStorage.getItem("accessToken");
};

const clearAccessToken = () => {
  sessionStorage.removeItem("accessToken");
};

export const authStateListener = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user)
      sessionStorage.setItem("email", user.email);
      setAccessToken(user.accessToken);
    } else {
      clearAccessToken();
      sessionStorage.removeItem("email");
    }
    if (
      user &&
      (location.pathname === "/login.html" ||
        location.pathname === "/signup.html")
    ) {
      location.href = "/";
    } else if (
      !user &&
      !(
        location.pathname === "/login.html" ||
        location.pathname === "/signup.html"
      )
    ) {
      return (location.href = "/login.html");
    }
  });
};
