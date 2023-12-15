// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAy-hHC5gBzGLyMRM5mTeS_WuZDbc0QqvE",
  authDomain: "graphql-app-a8e63.firebaseapp.com",
  projectId: "graphql-app-a8e63",
  storageBucket: "graphql-app-a8e63.appspot.com",
  messagingSenderId: "550201743702",
  appId: "1:550201743702:web:a8d11be80c52c362f7def7",
  measurementId: "G-9K4LFM0M96",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
