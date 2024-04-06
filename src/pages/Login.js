import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    // Perform form validation
    if (!email || !password) {
      return toast.error('Please enter both email and password.');
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError("Error signing in: " + error.message);
      toast.error("Error signing in: " + error.message);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Let's ChatApp</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign In</button>
          {error && <span><h5>Something went wrong</h5></span>}
        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
        <div className="defaultlogin">
          <h5>Default Login Details</h5>
          <b><span>Email:</span></b>
          <span> rasagnauppula@gmail.com</span><br/>
          <b><span>Password:</span></b>
          <span> rasagna123</span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
