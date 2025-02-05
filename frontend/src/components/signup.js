import React, { useState } from "react";
import axios from "axios";

export default function SignUp({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        username,
        password
      });

      // Save token in localStorage and update authentication state
      localStorage.setItem("authToken", response.data.token);
      setIsAuthenticated(true); // User is authenticated now
    } catch (err) {
      setError("Error during sign-up");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
