import React, { useState, useEffect } from "react";
// import CommonSection from "../shared/CommonSection";
// import "../styles/tour.css";
// import TourCard from "../../shared/TourCard";
// import SearchBar from "./../shared/SearchBar";
// import Newsletter from "./../shared/Newsletter";
import { Col, Container, Row } from "reactstrap";
// import useFetch from "./hooks/useFetch";
import { BASE_URL } from "../../utils/config.js";
import useFetch from "../../hooks/useFetch.js";
import TourCard2 from "./TourCard2.jsx";

const ListTour = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  //   const [username, setUsername] = useState("");
  const {
    data: tours,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  useEffect(() => {
    const pages = Math.ceil(tourCount / 8);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, tourCount, tours]);

  // Assuming you have a function to get username when user logs in
  //   useEffect(() => {
  //     const loggedInUsername = localStorage.getItem("username");
  //     console.log("Logged in username:", loggedInUsername); // Check the username in the console
  //     setUsername(loggedInUsername);
  //   }, []);

  return (
    <>
      {/* <CommonSection title={"All Tours"} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section> */}

      <section className="pt-0">
        <Container>
          {loading && <h4 className="text-center pt-5">LOADING..........</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              {tours?.map((tour) => (
                <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
                  {" "}
                  <TourCard2 tour={tour} />{" "}
                </Col>
              ))}

              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? "active__page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
      {/* <Newsletter /> */}
    </>
  );
};

export default ListTour;
