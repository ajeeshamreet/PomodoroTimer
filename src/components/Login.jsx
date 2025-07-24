import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./Firebase.jsx"; 

const Login = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Logged in as:", user.displayName);
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
};

export default Login;
