import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import WelcomeScreen from "./components/WelcomeScreen";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import "./App.css";
import { auth } from "./firebaseConfig"; 

const App = () => {
  const [user, setUser] = useState(null); 
  const [currentPage, setCurrentPage] = useState("login"); 
  const navigateToSignUp = () => setCurrentPage("signup");
  const navigateToLogin = () => setCurrentPage("login");
  const navigateToForgotPassword = () => setCurrentPage("forgot-password");

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null); 
        setCurrentPage("login"); 
      })
      .catch((error) => {
        console.error("Logout Error:", error.message);
      });
  };

  return (
    <div className="app-container">
      {user ? (
        <WelcomeScreen user={user} handleLogout={handleLogout} />
      ) : currentPage === "signup" ? (
        <SignUpForm navigateToLogin={navigateToLogin} />
      ) : currentPage === "forgot-password" ? (
        <ForgotPasswordForm navigateToLogin={navigateToLogin} />
      ) : (
        <LoginForm 
          setUser={setUser} 
          navigateToSignUp={navigateToSignUp} 
          navigateToForgotPassword={navigateToForgotPassword} 
        />
      )}
    </div>
  );
};

export default App;
