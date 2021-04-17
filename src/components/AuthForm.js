import { authService } from "fbInstance";
import React, { useState } from "react";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

  const [error, setError] = useState("");
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter the Email"
          required
          onChange={onChange}
          value={email}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter the Password"
          required
          onChange={onChange}
          value={password}
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
      </form>
      <p style={{ color: "red" }}>{error}</p>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
    </>
  );
};
export default AuthForm;
