import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVy_AlpXnnR43bWpSNiJ_vuKTuxBgFRxw",
  authDomain: "fafh-f8ccf.firebaseapp.com",
  projectId: "fafh-f8ccf",
  storageBucket: "fafh-f8ccf.appspot.com",
  messagingSenderId: "768720524101",
  appId: "1:768720524101:web:03623767ff5146c93a242c",
  measurementId: "G-99NFGNK96S",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
