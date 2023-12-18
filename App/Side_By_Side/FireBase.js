import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyDpFX4FqeDFB-rfeWV2gjDjJDuk-CCxR_8",
  authDomain: "test-d15ed.firebaseapp.com",
  projectId: "test-d15ed",
  storageBucket: "test-d15ed.appspot.com",
  messagingSenderId: "225984308246",
  appId: "1:225984308246:web:a912d8e93b7a3f041fc137",
  measurementId: "G-G76TP1MJ4F"
};

if(!firebase.app.length){
  firebase.initializeApp(firebaseConfig);
}

export {firebase};