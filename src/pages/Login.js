import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
const Login = () => {

  const [error, setError] = useState(null);
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const email = e.target[0].value;
    const password = e.target[1].value;
    

    try {
     await signInWithEmailAndPassword(auth, email, password)
     navigate("/")
    } catch (error) {
      setError("Error creating user: " + error.message);
    }
  };


  return (
    <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">Lets Chat</span>
          <span className="title">Login</span>
          <form onSubmit={handleSubmit}>
            
            <input type="email" placeholder="email"/>
            <input type="password" placeholder="password"/>
            
            <button>Sign In</button>
            {error && <span>Something went wrong,<br></br> please enter correct E-mail or password </span>}
            {/* {error && <span>{error}</span>} */}
          </form>
          <p>You don't have an account? <Link to="/register">Register</Link></p>
        </div>
    </div>
  )
}
export default Login;
