import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "project-flex-396503.firebaseapp.com",
  projectId: "project-flex-396503",
  storageBucket: "project-flex-396503.appspot.com",
  messagingSenderId: "656598798787",
  appId: "1:656598798787:web:4b51610909ed4a08eeed76",
};

export const app = initializeApp(firebaseConfig);
