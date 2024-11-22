import { loginWithPassword } from "./auth.js";
import { loginWithGoogle } from "./auth.js";
// function authStateListener() {
//     // [START auth_state_listener]
//     firebase.auth().onAuthStateChanged((user) => {
//         if (user) {
//             // User is signed in, see docs for a list of available properties
//             // https://firebase.google.com/docs/reference/js/v8/firebase.User
//             var uid = user.uid;
//             // ...
//             location.href = 'splitbill.html';
//         } else {
//             // User is signed out
//             // ...
//         }
//     });
//     // [END auth_state_listener]
// }

window.addEventListener('load', function () {

    // Listen for auth state changes
    // authStateListener();

document.getElementById('sign-in-email').addEventListener('click', function () {

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    loginWithPassword(email, password);
    // firebase.auth().signInWithEmailAndPassword(emailTxt, passtxt)
    //     .then((userCredential) => {
    //         // Signed in
    //         let user = userCredential.user;
    //         // ...
    //         console.log('Logging sucessfully');
    //         alert('Logging sucessfully');
    //         location.href = 'inddex.html';
    //     })
    //     .catch((error) => {
    //         let errorCode = error.code;
    //         let errorMessage = error.message;
    //         alert('Logging fail');
    //         console.log('Logging fail', errorMessage);
    //     });

});

document.getElementById('sign-in-google').addEventListener('click', function () {
    loginWithGoogle();
});
});