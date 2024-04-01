import React, { useState } from "react";
import ListTour from "./ListTour";
// import Tours from "../../pages/Tours";

const AdminPanel = ({ username }) => {
  // State to control the visibility of the Tours component
  const [showTours, setShowTours] = useState(false);

  const handleButtonClick = (buttonName) => {
    // Handle button click based on the buttonName if needed
    if (buttonName === "listTours") {
      setShowTours(true); // Show Tours component when List Tours button is clicked
    }
  };

  return (
    <>
      <h1 className="h1 text-center">Admin</h1>
      <div className="container admin-panel">
        <div className="left-panel">
          <button
            className="btn btn-primary m-2"
            onClick={() => handleButtonClick("listUsers")}
          >
            List Users
          </button>
          <button
            className="btn btn-primary m-2"
            onClick={() => handleButtonClick("listTours")}
          >
            List Tours
          </button>
          <button
            className="btn btn-primary m-2"
            onClick={() => handleButtonClick("addTour")}
          >
            Add Tour
          </button>
        </div>
      </div>

      {/* Render Tours component if showTours state is true */}
      {showTours && <ListTour />}
    </>
  );
};

export default AdminPanel;
