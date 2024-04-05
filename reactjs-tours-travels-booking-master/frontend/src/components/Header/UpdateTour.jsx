// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
// import { BASE_URL } from "../../utils/config.js";
// // import { Link } from "react-router-dom";
// import "../../styles/UpdateTour.css";
// // import ListTour from "./ListTour";

// function UpdateTour(props) {
//   const { id } = useParams();
//   const [credentials, setCredentials] = useState({
//     id: props?.data?._id,
//     title:"",
//     city: "",
//     address: "",
//     distance: "",
//     price: "",
//     maxGroupSize: "",
//     desc: "",
//     photo: "",
//     featured: false,
//   });

//   // const [showTours, setShowTours] = useState(true);

//   useEffect(() => {
//     async function fetchTourData() {
//       try {
//         const response = await fetch(`${BASE_URL}/tours/${id}`);
//         const data = await response.json();
//         setCredentials({
//           id: data.data._id,
//           title: data.data.title || "",
//           city: data.data.city || "",
//           address: data.data.address || "",
//           distance: data.data.distance || "",
//           price: data.data.price || "",
//           maxGroupSize: data.data.maxGroupSize || "",
//           desc: data.data.desc || "",
//           photo: data.data.photo || "",
//           featured: data.data.featured || false,
//         });
//       } catch (error) {
//         console.error("Error fetching tour data:", error);
//       }
//     }

//     fetchTourData();
//   }, [id]);

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${BASE_URL}/tours/${id}`, {
//         method: "PUT",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(credentials),
//       });
//       const result = await res.json();
      
//       console.log(result);
//       if (!result.success) {
//         alert("Failed to update tour");
//       } else {
//         // Redirect or show success message
//         alert("Tour updated successfully");
//         window.location.href = "/admin/";
//         // {showTours && <ListTour />}
//       }
//     } catch (error) {
//       console.error("Error updating tour:", error);
//       alert("An error occurred while updating tour");
//     }
//   };

//   return (
//     <section>
//       <Container>
//         <Row>
//           <Col className="m-auto">
//             <div className="login__container d-flex justify-content-between">
//               <div className="login__img">
//                 <img src={credentials.photo} alt="" />
//               </div>

//               <div className="login__form">
//                 <h2>Update details</h2>
//                 <Form onSubmit={handleSubmit}>
//                   <FormGroup>
//                     <input
//                       type="text"
//                       placeholder="Title"
//                       id="title"
//                       value={credentials.title}
//                       onChange={handleChange}
//                       required
//                     />
//                   </FormGroup>
//                   <FormGroup>
//                     <input
//                       type="text"
//                       placeholder="City"
//                       id="city"
//                       value={credentials.city}
//                       onChange={handleChange}
//                       required
//                     />
//                   </FormGroup>
//                   <FormGroup>
//                     <input
//                       type="text"
//                       placeholder="Address"
//                       id="address"
//                       value={credentials.address}
//                       onChange={handleChange}
//                       required
//                     />
//                   </FormGroup>
//                   <FormGroup>
//                     <input
//                       type="text"
//                       placeholder="Distance"
//                       id="distance"
//                       value={credentials.distance}
//                       onChange={handleChange}
//                       required
//                     />
//                   </FormGroup>
//                   <FormGroup>
//                     <input
//                       type="text"
//                       placeholder="Price"
//                       id="price"
//                       value={credentials.price}
//                       onChange={handleChange}
//                       required
//                     />
//                   </FormGroup>
//                   <FormGroup>
//                     <input
//                       type="text"
//                       placeholder="Max Group Size"
//                       id="maxGroupSize"
//                       value={credentials.maxGroupSize}
//                       onChange={handleChange}
//                       required
//                     />
//                   </FormGroup>
//                   <FormGroup>
//                     <input
//                       type="text"
//                       placeholder="Description"
//                       id="desc"
//                       value={credentials.desc}
//                       onChange={handleChange}
//                       required
//                     />
//                   </FormGroup>
//                   <Button
//                     className="btn secondary__btn auth__btn"
//                     type="submit"
//                   >
//                     Update
//                   </Button>
//                 </Form>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// }

// export default UpdateTour;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { BASE_URL } from "../../utils/config.js";
import "../../styles/UpdateTour.css";
import ListTour from "./ListTour";

function UpdateTour(props) {
  const { id } = useParams();
  const [credentials, setCredentials] = useState({
    id: props?.data?._id,
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
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    setCredentials({ ...credentials, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/tours/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const result = await res.json();

      console.log(result);
      if (!result.success) {
        alert("Failed to update tour");
      } else {
        // Redirect or show success message
        alert("Tour updated successfully");
        setIsUpdated(true);
      }
    } catch (error) {
      console.error("Error updating tour:", error);
      alert("An error occurred while updating tour");
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
                  <img src={credentials.photo} alt="" />
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
                  {/* <FormGroup>
                      <input
                        type="file"
                        id="photo"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </FormGroup> */}
                    <Button className="btn secondary__btn auth__btn" type="submit">
                      Update
                    </Button>
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
