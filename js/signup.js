import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyChk7OPRWXvCONLbrCpNoN7nl2iq-XwGNw",
    authDomain: "fbtest-f7dc6.firebaseapp.com",
    projectId: "fbtest-f7dc6",
    storageBucket: "fbtest-f7dc6.appspot.com",
    messagingSenderId: "416701225763",
    appId: "1:416701225763:web:e8cf4837b2ee697aca0a96",
    databaseURL: "https://fbtest-f7dc6-default-rtdb.europe-west1.firebasedatabase.app/"
  };
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

document.getElementById('profilePhoto').addEventListener('change', function() {
    const fileName = this.files[0].name;
    document.getElementById('file-display').innerText = `Selected File: ${fileName}`;
  });

document.getElementById("signupForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const newsletterCheckbox = document.getElementById("newsletterCheckbox");
    const signupDisplayName = document.getElementById("signupDisplayName").value;
    const signupPassword = document.getElementById("signupPassword").value;
    const signupEmail = document.getElementById("signupEmail").value;
    const profilePhoto = document.getElementById("profilePhoto").files[0];

    const emailExists = await checkEmailExists(signupEmail);
    if (!emailExists) {
        try {
            
            const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);

          
            await updateProfile(userCredential.user, {
                displayName: signupDisplayName
            });

            
            const storageRef = ref(storage, 'profilePhotos/' + signupEmail + '/' + profilePhoto.name);
            const uploadTask = uploadBytesResumable(storageRef, profilePhoto);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    console.error('Error uploading file:', error);
                },
                async () => {
                   
                    const photoUrl = await getDownloadURL(uploadTask.snapshot.ref);

                    
                    await setDoc(doc(db, "users", signupEmail), {
                        DisplayName: signupDisplayName,
                        email: signupEmail,
                        photoUrl: photoUrl,
                        newsletter: newsletterCheckbox.checked
                    });

                    console.log("Signup successful for user: " + signupEmail);
                    window.location.href = "/html/login.html";
                }
            );
        } catch (error) {
            console.error("Error creating user:", error.message);
        }
    } else {
        alert("An account with this email already exists");
    }
});

async function checkEmailExists(email) {
    const userDocRef = doc(db, "users", email);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists();
}