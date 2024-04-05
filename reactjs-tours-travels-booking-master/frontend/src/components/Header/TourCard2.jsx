import React, { useState } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "./tour-card.css";
import calculateAvgRating from "../../utils/avgRating";
// import { BASE_URL } from "../../utils/config.js";
import UpdateTour from "./UpdateTour.jsx";
// import "../../styles/UpdateTour.css";

const TourCard2 = ({ tour }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const { _id, title, city, photo, price, featured, reviews } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const handleUpdateClick = () => {
    setShowUpdateForm(true);
  };
  console.log(_id);
  return (
    <>
      <div className="tour__card">
        <Card>
          <div className="tour__img">
            <img src={photo} alt="tour-img" />
            {featured && <span>Featured</span>}
          </div>

          <CardBody>
            <div className="card__top d-flex align-items-center justify-content-between">
              <span className="tour__location d-flex align-items-center gap-1">
                <i className="ri-map-pin-line"></i> {city}
              </span>
              <span className="tour__rating d-flex align-items-center gap-1">
                <i className="ri-star-fill"></i>{" "}
                {avgRating === 0 ? null : avgRating}
                {totalRating === 0 ? (
                  "Not rated"
                ) : (
                  <span>({reviews.length})</span>
                )}
              </span>
            </div>

            <h5 className="tour__title">
              <Link to={`/tours/${_id}`}>{_id}</Link>
            </h5>

            <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
              <h5>
                ${price} <span> /per person</span>
              </h5>

              <button className="btn btn-danger ">Delete</button>
              {/* <button className="btn btn-primary" onClick={handleUpdateClick}>
        Update
      </button> */}
              <Link to={`/tours/update/${tour._id}`} className="btn btn-sm btn-primary">
                Update
              </Link>
            </div>
          </CardBody>
        </Card>
        {/* {showUpdateForm && <UpdateTour data={tour} />} */}
      </div>
      {/* {showUpdateForm && <UpdateTour data={tour} />} */}
    </>
  );
};

export default TourCard2;
