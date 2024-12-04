import React, { useState } from "react";
import { auth, sendPasswordResetEmail } from "../firebaseConfig"; 
import "./ForgotPasswordForm.css"; 


const ForgotPasswordForm = ({ navigateToLogin }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
      setError("");
    } catch (err) {
      console.error("Error resetting password:", err);
      setError("Failed to send password reset email. Please check your email.");
      setMessage("");
    }
  };



  return (
    <div className="forgot-password-page"> 
      <div className="forgot-password-form">
        <h2>Reset Your Password</h2>
        <p>Enter your registered email to receive a password reset link.</p>
        <form onSubmit={handlePasswordReset}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="reset-button">
            Send Reset Email
          </button>
        </form>
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
        <div className="back-to-login">
          <a onClick={navigateToLogin}>Back to Login</a>
        </div>
      </div>
    </div>
  );
};


export default ForgotPasswordForm;
