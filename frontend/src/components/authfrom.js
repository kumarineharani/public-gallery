import React, { useState } from "react";
import axios from "axios";

export default function AuthForm({ setIsAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true); // true = login mode, false = sign up mode
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Toggle between login and sign-up modes
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setMessage("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (isLogin) {
      // Login mode
      try {
        const response = await axios.post("http://localhost:5000/auth/login", {
          username,
          password,
        });
        localStorage.setItem("authToken", response.data.token);
        setIsAuthenticated(true);
      } catch (error) {
        setMessage("Login failed. Please check your credentials.");
      }
    } else {
      // Sign up mode
      try {
        await axios.post("http://localhost:5000/auth/register", {
          username,
          password,
        });
        setMessage("Sign up successful! Please log in.");
        setIsLogin(true); // Switch to login mode after successful sign up
      } catch (error) {
        setMessage("Sign up failed. Username might already be in use.");
      }
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "5px" }}>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      {message && <div style={{ color: "red", marginBottom: "10px" }}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <button
        onClick={toggleMode}
        style={{
          marginTop: "10px",
          padding: "5px 10px",
          backgroundColor: "#ddd",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
      </button>
    </div>
  );
}
