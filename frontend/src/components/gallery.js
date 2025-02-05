import React, { useEffect, useState } from "react"; // Import React and hooks
import axios from "axios"; // Import axios
const Gallery = () => {
  const [images, setImages] = useState([]);

  // Fetch images from the server when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/image/images")
      .then((res) => setImages(res.data)) // Set images from the response
      .catch((err) => console.error("Error fetching images:", err)); // Error handling
  }, []);

  return (
    <div>
      <h1>Gallery Component</h1> {/* Component title */}
      <h2>Public Image Gallery</h2> {/* Subheading */}
      {images.length === 0 ? (  // Check if images are loaded
        <p>No images found.</p>  // Show message if no images
      ) : (
        <div className="image-gallery">
          {images.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:5000${img.url}`}  // Assuming the img.url returns the image path
              alt={`Uploaded ${index + 1}`}  // Descriptive alt text
              width="200px"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
