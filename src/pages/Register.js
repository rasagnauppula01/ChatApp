import React, { useState } from "react";
import Add from "../images/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate,Link } from "react-router-dom";

const Registration = () => {
  const [error, setError] = useState(null);
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

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

          await updateProfile(user, {
            displayName,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, "userChats", user.uid), {});
          navigate("/Login")
        }
      );
    } catch (error) {
      setError("Error creating user: " + error.message);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lets Chat</span>
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
          {error && <span>{error}</span>}
        </form>
        <p>You have an account? <Link to="/Login">Login</Link></p>
      </div>
    </div>
  );
};

export default Registration;
