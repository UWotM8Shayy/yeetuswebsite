import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {
    getFirestore,
    doc,
    getDoc,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import {
    getAuth,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyChk7OPRWXvCONLbrCpNoN7nl2iq-XwGNw",
    authDomain: "fbtest-f7dc6.firebaseapp.com",
    projectId: "fbtest-f7dc6",
    storageBucket: "fbtest-f7dc6.appspot.com",
    messagingSenderId: "416701225763",
    appId: "1:416701225763:web:e8cf4837b2ee697aca0a96",
    databaseURL: "https://fbtest-f7dc6-default-rtdb.europe-west1.firebasedatabase.app/"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

document.getElementById("signupRedirectButton").addEventListener("click", function () {
    window.location.href = "/html/signup.html";
});

document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        // Sign in user with email and password
        await signInWithEmailAndPassword(auth, email, password);

        console.log("Login successful! Welcome, " + email);
        window.location.href = "/html/home.html?email=" + encodeURIComponent(email);
    } catch (error) {
        console.error("Incorrect email or password. Please try again.", error.message);
    }
});



