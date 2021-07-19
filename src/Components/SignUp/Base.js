import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

export const app = firebase.initializeApp({
  apiKey: "AIzaSyDBcQEsVCGlEhJkgtUjsKiAZ5hak41vXUo",
  authDomain: "sam-weather-12.firebaseapp.com",
  projectId: "sam-weather-12",
  storageBucket: "sam-weather-12.appspot.com",
  messagingSenderId: "1022091738381",
  appId: "1:1022091738381:web:20417bb141e81d43574444",
});
