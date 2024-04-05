import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "./tour-card.css";
import calculateAvgRating from "../../utils/avgRating";
import { IMAGE_URL } from "../../utils/config";

const TourCard2 = ({ tour, onDelete }) => {
  const { _id, title, city, photo, price, featured, reviews } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const handleDelete = () => {
    alert("You Want To Delete");
    console.log("Delete button clicked for tour ID:", _id);
    onDelete();
  };

  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
          <img src={IMAGE_URL + photo} alt="tour-img" />
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
            <Link to={`/tours/${_id}`}>{title}</Link>
          </h5>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              ${price} <span> /per person</span>
            </h5>

            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
            <Link
              to={`/tours/update/${tour._id}`}
              className="btn btn-sm btn-primary"
            >
              Update
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard2;
