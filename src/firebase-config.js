import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDiP9EkprUpfhyBBqdpTwmOItdPVuFNgj8",
    authDomain: "phone-auth-5eeeb.firebaseapp.com",
    projectId: "phone-auth-5eeeb",
    storageBucket: "phone-auth-5eeeb.appspot.com",
    messagingSenderId: "78836410767",
    appId: "1:78836410767:web:dd9239540208233c9403fa"
};

<<<<<<< HEAD
export const app = initializeApp(firebaseConfig);
//export const authentication = getAuth(app);
=======
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
>>>>>>> bcb3d0a150d647732e51589ee63b3e5e34db086f
