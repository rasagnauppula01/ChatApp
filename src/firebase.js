import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB2IX0Zb9jfRvYPPOQ2pQMWLRnP5kOKOyE",
  authDomain: "chat-2e1e5.firebaseapp.com",
  projectId: "chat-2e1e5",
  storageBucket: "chat-2e1e5.appspot.com",
  messagingSenderId: "530230970270",
  appId: "1:530230970270:web:77c791bc36ab7f2f0fb88f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db=getFirestore()