import React from "react";
import "./WelcomeScreen.css";

const WelcomeScreen = ({ user, handleLogout }) => {
  return (
    <div className="welcome-screen">
      <h1>Welcome, {user.displayName || "User"}!</h1> {/* Display the user's name or default to "User" */}
      <p>Email: {user.email}</p>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default WelcomeScreen;
