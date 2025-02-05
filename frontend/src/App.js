import React, { useState, useEffect } from "react";
import "./App.css";
import AuthForm from "./components/authfrom";
import Upload from "./components/upload";
import Gallery from "./components/gallery";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    localStorage.removeItem("authToken");
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* Display the logo */}
        <img src= "/p.jpg" alt="logo " width="300" height="150" style={{ borderRadius: "10px" }} />
        
        <h1>Image Uploader & Public Gallery</h1>
        {!isAuthenticated ? (
          <AuthForm setIsAuthenticated={setIsAuthenticated} />
        ) : (
          <>
            <Upload />
            <Gallery />
          </>
        )}
      </header>
    </div>
  );
}

export default App;
