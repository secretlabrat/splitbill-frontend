import { authStateListener, logout } from "./auth.js";

window.addEventListener("load", () => {
  authStateListener();

  document.getElementById("logout").addEventListener("click", logout);
});
