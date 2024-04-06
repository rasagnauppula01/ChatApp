import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import React,{useState,useEffect} from "react";

const firebaseConfig = {
  apiKey: "AIzaSyB2IX0Zb9jfRvYPPOQ2pQMWLRnP5kOKOyE",
  authDomain: "chat-2e1e5.firebaseapp.com",
  projectId: "chat-2e1e5",
  storageBucket: "chat-2e1e5.appspot.com",
  messagingSenderId: "530230970270",
  appId: "1:530230970270:web:77c791bc36ab7f2f0fb88f"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db=getFirestore()

export { app };





// const App = () => {
//   const [user,setUser]=useState(null);
//   useEffect(()=>{
//     auth.onAuthStateChanged(person=>{
//       if(person){
//         setUser(person);
//       }
//       else{
//         setUser(null);
//       }
//     })
//   },[])
//   const signInWithGoogle=async() => {
//     try{
//       await auth.signInWithPopup(new firebaseConfig.auth.GoogleAuthProvider())
//     }
//     catch(err){
//       console.log(err);
//     }

//   }

//   return(
//     <div>
//       <center>
//         {user
//          ? 
//         <div>
//           <h1>welcome to home</h1>
//           <button>Sign out</button>
//         </div>
//         :
//         <button onClick={signInWithGoogle}>Sign in with Google</button>
//         }
//       </center>
//     </div>
//   )
// }