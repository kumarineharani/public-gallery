import React, { useState } from "react";
import axios from "axios";

export default function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      await axios.post("http://localhost:5000/auth/login", { username, password });
      setIsAuthenticated(true); // User is authenticated now
    } catch (err) {
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
