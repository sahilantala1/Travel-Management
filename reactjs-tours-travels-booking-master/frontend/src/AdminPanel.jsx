import React, { useState } from "react";

const AdminPanel = ({ handleSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    address: "",
    distance: "",
    price: "",
    maxGroupSize: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData); // Call the handleSubmit function with formData
  };

  return (
    <div>
      <h2>Create Tour</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          type="text"
          name="distance"
          value={formData.distance}
          onChange={handleChange}
          placeholder="Distance"
        />
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <input
          type="text"
          name="maxGroupSize"
          value={formData.maxGroupSize}
          onChange={handleChange}
          placeholder="Max Group Size"
        />
        <button type="submit">Create Tour</button>
      </form>
    </div>
  );
};

export default AdminPanel;
