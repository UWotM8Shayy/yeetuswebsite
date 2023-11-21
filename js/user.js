import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
    getFirestore,
    doc,
    getDoc,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import {
    getStorage,
    ref,
    getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js";

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
const storage = getStorage(app);

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const email = getParameterByName('email');

const docRef = doc(db, "users", email);
getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) {
        const userData = docSnap.data();
        const photoUrl = userData.photoUrl;

        getDownloadURL(ref(storage, photoUrl)).then((downloadUrl) => {
            const logoImg = document.querySelector(".logo-container img");
            logoImg.src = downloadUrl;
            logoImg.alt = "User Profile Picture";
        }).catch((error) => {
            console.error("Error getting download URL:", error);
        });
    } else {
        console.log("User not found in the database.");
    }
}).catch((error) => {
    console.error("Error getting user data:", error);
});
