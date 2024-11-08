import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCOuMERRtLM5AqNqoAvAdO_f8tgl9-i_Kg",
  authDomain: "splitbill-86440.firebaseapp.com",
  projectId: "splitbill-86440",
  storageBucket: "splitbill-86440.firebasestorage.app",
  messagingSenderId: "1088508364041",
  appId: "1:1088508364041:web:e5ef23fbdbe7c095d33fd8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
