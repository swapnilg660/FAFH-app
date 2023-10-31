import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDch0aF4CguUQYKBtOYOKxShW0UzGOcrLY",
  authDomain: "foodlog-642cd.firebaseapp.com",
  projectId: "foodlog-642cd",
  storageBucket: "foodlog-642cd.appspot.com",
  messagingSenderId: "818626644091",
  appId: "1:818626644091:web:fe2baa8d9fc7c44f483ade",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
