import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB349eOgUgJXDkztWKuKt6oJIqJUzCqNzM",
  authDomain: "fafh-186e4.firebaseapp.com",
  projectId: "fafh-186e4",
  storageBucket: "fafh-186e4.appspot.com",
  messagingSenderId: "104140197750",
  appId: "1:104140197750:web:489ecdaed8ec961a58b457",
  measurementId: "G-PXW67XDLEV",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}