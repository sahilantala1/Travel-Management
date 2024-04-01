import React, { useState } from "react";
import Tours from "../../pages/Tours";

const AdminPanel = ({ username }) => {
  const handleButtonClick = (buttonName) => {};

  const listData = () => {
    return <></>;
  };

  return (
    <>
      <h1 className="h1 text-center ">Admin</h1>
      <div className="container admin-panel">
        <div className="left-panel">
          <button
            className="btn btn-primary m-2 "
            onClick={() => handleButtonClick("listUsers")}
          >
            List Users
          </button>
          <button className="btn btn-primary m-2" onClick={() => listData()}>
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
    </>
  );
};

export default AdminPanel;
