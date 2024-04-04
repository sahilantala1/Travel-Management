// AddTour.js
import React, { useState } from "react";
import { BASE_URL } from "../../utils/config";
import "./AddTour.css";

const AddTour = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    address: "",
    distance: "",
    photo: "",
    desc: "",
    price: "",
    maxGroupSize: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/tours`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        // Redirect or display success message as needed
        console.log("Tour created successfully!");
        onClose(); // Close the AddTour component after successful creation
      } else {
        // Handle error response
        console.error("Failed to create tour:", result.error);
      }
    } catch (error) {
      console.error("Error creating tour:", error);
    }
  };

  return (
    <div className="container">
      <h2>Create Tour</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Distance:</label>
          <input
            type="text"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Photo:</label>
          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Max Group Size:</label>
          <input
            type="number"
            name="maxGroupSize"
            value={formData.maxGroupSize}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Create Tour</button>
        </div>
      </form>
    </div>
  );
};

export default AddTour;
