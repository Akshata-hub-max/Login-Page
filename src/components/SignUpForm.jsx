import React, { useState } from "react";
import { auth, provider, createUserWithEmailAndPassword, signInWithPopup } from "../firebaseConfig";
import "./SignUpForm.css";

const SignUpForm = ({ navigateToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");  // New state for name
  const [errorMessage, setErrorMessage] = useState("");

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long and include a letter, a number, and a special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user's name as custom data in Firestore (or any other database you're using)
      // Firestore logic can be added here to store the name (if you use Firestore for user data)

      console.log("User created:", user);
      setErrorMessage("");
      alert("Sign up successful!");
      navigateToLogin();
    } catch (error) {
      console.error("Error signing up:", error.message);
      setErrorMessage("Error signing up. Please try again.");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google User:", user);
      alert("Google Sign-Up Successful!");
      navigateToLogin();
    } catch (error) {
      console.error("Google Sign-Up Error:", error.message);
      alert("Google Sign-Up failed. Please try again.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-form">
        <h2>Create an Account</h2>
        <div className="google-signup">
          <button className="google-button" onClick={handleGoogleSignUp}>
            <img
              src="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/image8-2.jpg?width=893&height=600&name=image8-2.jpg"
              alt="Google Icon"
              className="google-icon"
            />
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="divider">
          <span>or sign up with email</span>
        </div>

        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Retype Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <div className="redirect-login">
          Already have an account? <a onClick={navigateToLogin}>Log in</a>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
