// src/Firebase.jsx
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWbKJV3FoxTl4D9UESXvQDINV-XrvPiuc",
  authDomain: "pomodoro-bd322.firebaseapp.com",
  projectId: "pomodoro-bd322",
  storageBucket: "pomodoro-bd322.firebasestorage.app",
  messagingSenderId: "611089185867",
  appId: "1:611089185867:web:a3411df55654ce8b06e1ce"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };