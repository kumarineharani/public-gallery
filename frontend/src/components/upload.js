import React, { useState } from "react"; // Ensure React is imported
import axios from "axios";

export default function Upload() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.post("http://localhost:5000/image/upload", formData);
      alert("Image Uploaded!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
