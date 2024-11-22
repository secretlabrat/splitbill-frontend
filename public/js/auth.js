import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";


export function loginWithPassword(email, password) {
  console.log('email');

 signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      alert('Logging sucessfully');
      location.href = `index.html?uid=${user.uid}`;
      // ...
    })
    .catch((error) => {

      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      alert('Logging fail');
    })
  };

  export function loginWithGoogle() {
  
    let provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        location.href = 'index.html';
        // IdP data available using getAdditionalUserInfo(result)
        
        // ...
      }).catch((error) => {
        console.log('login error');
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);

        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage);
        console.log(email);

        // ...
      });
    };
  
export function lougot() {
  return signOut(auth)
    .then(() => {
      console.log("Logout Sucessful");
    })
    .catch((error) => {
      console.log(error.message);
    });
}
