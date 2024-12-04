import React, { useState } from "react";
import { auth, provider, signInWithPopup, signInWithEmailAndPassword } from "../firebaseConfig"; 
import "./LoginForm.css";


const LoginForm = ({ setUser, navigateToSignUp, navigateToForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setErrorMessage("Both email and password are required.");
      return;
    }
    try {
      console.log("Email:", email);
      console.log("Password:", password);
  
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
 
      setUser({ name: user.displayName || "User", email: user.email });
  
    } catch (error) {
      console.error("Login Error:", error);
    }
  };
  

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser({ name: user.displayName, email: user.email });
      alert("Google Login Successful!");
    } catch (error) {
      console.error("Google Login Error:", error.message);
      alert("Google Login failed. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <div className="welcome-section">
          <img
            src="https://t4.ftcdn.net/jpg/04/01/56/37/360_F_401563791_gINUyI5pNVLWXytyxf3XLlLwwaLq2rFZ.jpg"
            alt="Hi Hand"
            className="hi-hand"
          />
          <p className="positive-thought">"Welcome back! Let's make today amazing."</p>
        </div>
        <div className="google-login">
          <button onClick={handleGoogleLogin} className="google-button">
            <img
              src="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/image8-2.jpg?width=893&height=600&name=image8-2.jpg"
              alt="Google Icon"
              className="google-icon"
            />
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="divider">
          <span>or login with email</span>
        </div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <div className="forgot-password">
            <a onClick={navigateToForgotPassword}>Forgot Password?</a>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="signup-link">
          Don’t have an account? <a onClick={navigateToSignUp}>Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
