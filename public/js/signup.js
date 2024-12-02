import { authStateListener, signUpWithEmailAndPassword } from "./auth.js";

window.addEventListener("load", function () {
  // Listen for auth state changes
  authStateListener();

  document
    .getElementById("sign-up-email")
    .addEventListener("click", function () {
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
      signUpWithEmailAndPassword(email, password);
    });
});
