// AddTour.js
// Add
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
    if (e.target.name === "photo") {
      console.log(e.target.files[0]);
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = new FormData();
      Object.keys(formData).forEach((key) => {
        postData.append(key, formData[key]);
      });

      const res = await fetch(`${BASE_URL}/tours`, {
        method: "POST",
        credentials: "include",
        // mode: "no-cors",
        headers: {},
        body: postData,
      });

      // Log the response body
      console.log(res);

      if (res.ok) {
        alert("Tour created successfully!");
        onClose();
      } else {
        console.error("Failed to create tour. Response:");
      }
    } catch (error) {
      console.error("Error creating tour:", error);
    }
  };

  return (
    <div className="container maincontainer">
      <div className="createtourform container">
        <h2 className="createTour h2 text-center">Create Tour</h2>
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
          <div className="innerdiv">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />

            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <label>Distance</label>
            <input
              type="text"
              name="distance"
              value={formData.distance}
              onChange={handleChange}
              required
            />

            <label>Photo</label>
            <input type="file" name="photo" onChange={handleChange} required />
            <label>Description</label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              required
            />

            <br></br>
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />

            <label>Max Group Size</label>
            <input
              type="number"
              name="maxGroupSize"
              value={formData.maxGroupSize}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button className="btn btn-success" type="submit">
              Create Tour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTour;
