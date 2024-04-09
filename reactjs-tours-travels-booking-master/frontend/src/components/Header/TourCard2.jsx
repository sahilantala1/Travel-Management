import React from "react";
import { Card, CardBody } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useHistory
import "./tour-card.css";
import calculateAvgRating from "../../utils/avgRating";
import { IMAGE_URL } from "../../utils/config";

const TourCard2 = ({ tour, onDelete }) => {
  const { _id, title, city, photo, price, featured, reviews } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const { id } = useParams(); // Access the id parameter from the URL
  const history = useNavigate(); // Initialize useHistory hook

  const handleDelete = () => {
    const isConfirmed = window.confirm("Are you sure?");
    if (isConfirmed) {
      console.log("Delete button clicked for tour ID:", _id);
      onDelete();
    }
  };

  const handleUpdate = () => {
    history(`/tours/update/${_id}`);
    console.log(_id);
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

          <h5 className="tour__title">{title}</h5>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              ${price} <span> /per person</span>
            </h5>

            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
            <button className="btn btn-primary" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard2;
