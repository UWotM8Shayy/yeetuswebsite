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




async function displayUserData(email) {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const userData = docSnap.data();
        const photoUrl = userData.photoUrl;

       
        const downloadUrl = await getDownloadURL(ref(storage, photoUrl));

        
        document.getElementById("username").textContent = userData.DisplayName;
        document.getElementById("email").textContent = userData.email;
        
        document.getElementById("password").textContent = "************";

        document.getElementById("profile-picture").src = downloadUrl;
        document.getElementById("profile-picture").alt = "User Profile Picture";
    } else {
        console.log("User not found in the database.");
    }
}
const email = getParameterByName('email');
if (email == null)
{
    window.location.href = "/html/login.html";
}else {displayUserData(email);}
