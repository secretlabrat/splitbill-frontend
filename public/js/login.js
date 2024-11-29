import { authStateListener, loginWithGoogle, loginWithPassword } from "./auth.js";


window.addEventListener("load", function () {
  // Listen for auth state changes
  authStateListener();

  document
    .getElementById("sign-in-email")
    .addEventListener("click", function () {
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
      loginWithPassword(email, password);
    });

  document
    .getElementById("sign-in-google")
    .addEventListener("click", function () {
      loginWithGoogle();
    });
});
