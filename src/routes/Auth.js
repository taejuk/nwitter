import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "fbInstance";
import React, { useState } from "react";

const Auth = () => {
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };
  return (
    <div>
      <AuthForm />
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google...
        </button>
      </div>
    </div>
  );
};

export default Auth;
