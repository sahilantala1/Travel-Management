import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { BASE_URL, IMAGE_URL } from "../../utils/config.js";
import "../../styles/UpdateTour.css";
import ListTour from "./ListTour";

function UpdateTour() {
  const { id } = useParams();
  const [credentials, setCredentials] = useState({
    id: id,
    title: "",
    city: "",
    address: "",
    distance: "",
    price: "",
    maxGroupSize: "",
    desc: "",
    photo: "",
    featured: false,
  });
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    async function fetchTourData() {
      try {
        const response = await fetch(`${BASE_URL}/tours/${id}`);
        const data = await response.json();
        setCredentials({
          id: data.data._id,
          title: data.data.title || "",
          city: data.data.city || "",
          address: data.data.address || "",
          distance: data.data.distance || "",
          price: data.data.price || "",
          maxGroupSize: data.data.maxGroupSize || "",
          desc: data.data.desc || "",
          photo: data.data.photo || "",
          featured: data.data.featured || false,
        });
      } catch (error) {
        console.error("Error fetching tour data:", error);
      }
    }

    fetchTourData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // Use functional updates to ensure you're always using the latest state
    if (name === "photo") {
      setCredentials((prevCredentials) => ({
        ...prevCredentials,
        [name]: files[0],
      }));
    } else {
      setCredentials((prevCredentials) => ({
        ...prevCredentials,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = new FormData();
      // Append all fields except 'photo'
      Object.keys(credentials).forEach((key) => {
        if (key !== "photo") {
          postData.append(key, credentials[key]);
        }
      });

      // Append 'photo' separately based on its type
      if (typeof credentials.photo === "object") {
        postData.append("photo", credentials.photo);
      } else {
        postData.append("photo", credentials.photo);
      }

      const res = await fetch(`${BASE_URL}/tours/${id}`, {
        method: "POST",
        cache: "no-cache",
        credentials: "include",
        headers: {},
        body: postData,
      });

      if (res.ok) {
        alert("Tour updated successfully!");
        setIsUpdated(true);
        // Reset the form after successful update
        setCredentials({
          id: id,
          title: "",
          city: "",
          address: "",
          distance: "",
          price: "",
          maxGroupSize: "",
          desc: "",
          photo: "",
          featured: false,
        });
      } else {
        console.error("Failed to update tour. Status:", res.status);
      }
    } catch (error) {
      console.error("Error updating tour:", error);
      alert("An error occurred while updating tour: " + error.message);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col className="m-auto">
            {/* Conditional rendering based on isUpdated state */}
            {!isUpdated ? (
              <div className="login__container d-flex justify-content-between">
                <div className="login__img">
                  {/* Conditionally render the image based on whether a new image is selected or not */}
                  {typeof credentials.photo === "object" ? (
                    <img src={URL.createObjectURL(credentials.photo)} alt="" />
                  ) : (
                    <img src={IMAGE_URL + credentials.photo} alt="" />
                  )}
                </div>

                <div className="login__form">
                  <h2>Update details</h2>
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <input
                        type="text"
                        placeholder="Title"
                        id="title"
                        value={credentials.title}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="text"
                        placeholder="City"
                        id="city"
                        value={credentials.city}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="text"
                        placeholder="Address"
                        id="address"
                        value={credentials.address}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="text"
                        placeholder="Distance"
                        id="distance"
                        value={credentials.distance}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="text"
                        placeholder="Price"
                        id="price"
                        value={credentials.price}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="text"
                        placeholder="Max Group Size"
                        id="maxGroupSize"
                        value={credentials.maxGroupSize}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="text"
                        placeholder="Description"
                        id="desc"
                        value={credentials.desc}
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <input
                        type="file"
                        name="photo"
                        id="photo"
                        onChange={handleChange}
                        accept="image/*"
                      />
                    </FormGroup>
                    <button
                      onClick={handleSubmit}
                      className="btn btn-primary secondary__btn auth__btn"
                      type="submit"
                    >
                      Update
                    </button>
                  </Form>
                </div>
              </div>
            ) : (
              // Render ListTour component if isUpdated state is true
              <ListTour />
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default UpdateTour;
