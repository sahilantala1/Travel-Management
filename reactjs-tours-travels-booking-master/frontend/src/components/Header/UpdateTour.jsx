import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [pristine, setPristine] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTourData() {
      try {
        const response = await fetch(`${BASE_URL}/tours/${id}`);
        if (response.ok) {
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
        } else {
          setError("Failed to fetch tour data");
        }
      } catch (error) {
        console.error("Error fetching tour data:", error);
        setError("Error fetching tour data");
      }
    }

    fetchTourData();
  }, [id]);

  const handleChange = (e) => {
    setPristine(false);
    const { name, value, files } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: name === "photo" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = new FormData();
      Object.entries(credentials).forEach(([key, value]) => {
        postData.append(key, value);
      });

      console.log("Submitting PUT request:", postData);

      const res = await fetch(`${BASE_URL}/tours/${id}`, {
        method: "PUT",
        credentials: "include",
        mode: "cors",
        body: postData,
      });
      console.log(id);
      console.log("PUT request response:", res);

      if (!res.ok) {
        throw new Error(`Failed to update tour. Status: ${res.status}`);
      }

      alert("Tour updated successfully!");
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
      navigate("/admin");
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
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img
                  src={
                    typeof credentials.photo === "object"
                      ? URL.createObjectURL(credentials.photo)
                      : IMAGE_URL + credentials.photo
                  }
                  alt=""
                />
              </div>

              <div className="login__form">
                <h2>Update details</h2>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Title"
                      id="title"
                      name="title"
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
                      name="city"
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
                      name="address"
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
                      name="distance"
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
                      name="price"
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
                      name="maxGroupSize"
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
                      name="desc"
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
                    className="btn btn-primary secondary__btn auth__btn"
                    type="submit"
                    disabled={pristine}
                  >
                    Update
                  </button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default UpdateTour;
