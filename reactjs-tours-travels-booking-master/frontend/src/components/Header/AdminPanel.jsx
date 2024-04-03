import React, { useState, useContext } from "react";
import ListTour from "./ListTour";
// import Bs
import { BASE_URL } from "../../utils/config";
import "./Admin.css";
import { AuthContext } from "../../context/AuthContext";
// import Tours from "../../pages/Tours";

const AdminPanel = ({ username }) => {
  // State to control the visibility of the Tours component
  const [showTours, setShowTours] = useState(false);
  const [users, setUsers] = useState([]);
  const { user, token } = useContext(AuthContext);
  console.log(token);
  const handleButtonClick = async (buttonName) => {
    // Handle button click based on the buttonName if needed
    if (buttonName === "listTours") {
      setShowTours(true); // Show Tours component when List Tours button is clicked
    }

    if (buttonName === "listUsers") {
      // setuser(true);

      const res = await fetch(`${BASE_URL}/users`, {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const result = await res.json();
      if (!result.success) alert("you are not admin");
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
      {/* Render user data if users state is not empty */}
      {users.length > 0 && (
        <div className="user-list">
          <h2>User List</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {/* Render user information */}
                <div>
                  <strong>ID:</strong> {user._id}
                </div>
                <div>
                  <strong>Name:</strong> {user.username}
                </div>
                <div>
                  <strong>Email:</strong> {user.email}
                </div>
                {/* Add more user information if needed */}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Render Tours component if showTours state is true */}
      {showTours && <ListTour />}
    </>
  );
};

export default AdminPanel;
