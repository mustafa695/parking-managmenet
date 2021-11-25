import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
const firebaseConfig = {
  apiKey: "AIzaSyCzCyWN_yBywwELfi3n3dae-iHWWyMCcD4",
  authDomain: "parking-system-8fadb.firebaseapp.com",
  projectId: "parking-system-8fadb",
  storageBucket: "parking-system-8fadb.appspot.com",
  messagingSenderId: "455577191246",
  appId: "1:455577191246:web:29cba8dfa73ee0ef06541f",
  measurementId: "G-QVVDH2QSPB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export {
    firebase,
    db,
    auth
}