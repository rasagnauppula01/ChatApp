import React, { useState } from "react";
import Add from "../images/addAvatar.png";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth"; 
import firebase from "firebase/app";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider(); // Use GoogleAuthProvider from firebase/auth
    try {
      const userCredential = await signInWithPopup(auth, provider);
      // Handle user data as needed
      navigate('/')
    } catch (error) {
      setError("Error signing in with Google: " + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    // Perform form validation
    if (!displayName || !email || !password || !file) {
      return toast.error('Please fill in all fields and select an avatar.');
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      const storageRef = ref(storage, `${user.uid}/avatar.jpg`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          setError("Error uploading avatar: " + error.message);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          // Update profile
          await updateProfile(user, {
            displayName,
            photoURL: downloadURL,
          });
          // Create user on firestore
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });
          // Create empty user chats on firestore
          await setDoc(doc(db, "userChats", user.uid), {});
          navigate("/Login");
          toast.success('Registration successful!');
        }
      );
    } catch (error) {
      setError("Error creating user: " + error.message);
      toast.error("Error in Registration: " + error.message);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Let's ChatApp</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button type="submit">Sign up</button>
          {error && <span><h5>Something went wrong</h5></span>}
        </form>
        <p>You have an account? <Link to="/Login">Login</Link></p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Registration;
