// import React, { useState, useContext } from "react";
// import ListTour from "./ListTour";
// import { BASE_URL } from "../../utils/config";
// import "./Admin.css";
// import { AuthContext } from "../../context/AuthContext";
// import AddTour from "./AddTour";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

// const AdminPanel = ({ username }) => {
//   const [showUsers, setShowUsers] = useState(false);
//   const [showTours, setShowTours] = useState(false);
//   const [showAddTour, setShowAddTour] = useState(false);
//   const [showListTourBookings, setShowListTourBookings] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [bookedUsers, setBookedUsers] = useState([]);
//   const [selectedBookingId, setSelectedBookingId] = useState(null);
//   const { token } = useContext(AuthContext);

//   const handleButtonClick = async (buttonName) => {
//     if (buttonName === "listUsers") {
//       setShowUsers(true);
//       setShowTours(false);
//       setShowAddTour(false);
//       setShowListTourBookings(false);
//       const res = await fetch(`${BASE_URL}/users`, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           "content-type": "application/json",
//         },
//       });
//       const result = await res.json();
//       if (!result.success) alert("You are not an admin");
//       else setUsers(result.data);
//     } else if (buttonName === "listTours") {
//       setShowTours(true);
//       setShowUsers(false);
//       setShowAddTour(false);
//       setShowListTourBookings(false);
//     } else if (buttonName === "addTour") {
//       setShowAddTour(true);
//       setShowTours(false);
//       setShowUsers(false);
//       setShowListTourBookings(false);
//     } else if (buttonName === "listTourBookings") {
//       setShowListTourBookings(true);
//       setShowUsers(false);
//       setShowTours(false);
//       setShowAddTour(false);
//       await fetchBookedUsers();
//     }
//   };

//   const deleteUser = async (userId) => {
//     const res = await fetch(`${BASE_URL}/users/${userId}`, {
//       method: "DELETE",
//       credentials: "include",
//       headers: {
//         "content-type": "application/json",
//       },
//     });
//     const result = await res.json();
//     if (result.success) {
//       setUsers(users.filter((user) => user._id !== userId));
//     } else {
//       alert("Failed to delete user");
//     }
//   };

//   const fetchBookedUsers = async () => {
//     const res = await fetch(`${BASE_URL}/booking`, {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         "content-type": "application/json",
//       },
//     });
//     const result = await res.json();
//     if (result.success) {
//       console.log(result.data);
//       setBookedUsers(result.data);
//     } else {
//       alert("Failed to fetch booked users");
//     }
//   };

//   const showAllData = (bookingId) => {
//     setSelectedBookingId(bookingId);
//   };

//   return (
//     <>
//       <div className="container admin-panel">
//         <div className="left-panel">
//           <button
//             className="btn btn-primary m-2"
//             onClick={() => handleButtonClick("listUsers")}
//           >
//             List Users
//           </button>
//           <button
//             className="btn btn-primary m-2"
//             onClick={() => handleButtonClick("listTours")}
//           >
//             List Tours
//           </button>
//           <button
//             className="btn btn-primary m-2"
//             onClick={() => handleButtonClick("addTour")}
//           >
//             Create Tour
//           </button>
//           <button
//             className="btn btn-primary m-2"
//             onClick={() => handleButtonClick("listTourBookings")}
//           >
//             List TourBookings
//           </button>
//         </div>
//       </div>

//       {showUsers && (
//         <div className="container user-list">
//           <h2 className="userHead h2 text-center ">User List</h2>
//           <ul>
//             <li>
//               <div>Number Of Users</div>
//               <div>ID</div>
//               <div>Username</div>
//               <div>Email</div>
//               <div className="delete-user">Action</div>{" "}
//             </li>
//             {users.map(
//               (user, index) =>
//                 user.username !== "admin" && (
//                   <li key={user._id}>
//                     <div>{index}</div>
//                     <div>{user._id}</div>
//                     <div>{user.username}</div>
//                     <div>{user.email}</div>
//                     <div>
//                       <FontAwesomeIcon
//                         style={{ backgroundColor: "white", color: "red" }}
//                         icon={faTrashAlt}
//                         onClick={() => deleteUser(user._id)}
//                       />
//                     </div>
//                   </li>
//                 )
//             )}
//           </ul>
//         </div>
//       )}

//       {showTours && <ListTour />}
//       {showAddTour && <AddTour onClose={() => setShowAddTour(false)} />}

//       {showListTourBookings && (
//         <div className="container booked-users">
//           <h2 className="userHead h2 text-center">Booked Tours</h2>
//           <table className="table table-striped">
//             <thead>
//               <tr>
//                 <th>User ID</th>
//                 <th>User Name</th>
//                 <th>User Email</th>
//                 <th>Tour Name</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookedUsers.map((booking) => (
//                 <React.Fragment key={booking.userId}>
//                   <tr>
//                     <td>{booking.userId}</td>
//                     <td>{booking.userName}</td>
//                     <td>{booking.userEmail}</td>
//                     <td>{booking.tourName}</td>
//                     <td>
//                       <button onClick={() => showAllData(booking.userId)}>
//                         View Details
//                       </button>
//                     </td>
//                   </tr>
//                   {selectedBookingId === booking.userId && (
//                     <tr>
//                       <td colSpan="5">
//                         <p>User ID: {booking.userId}</p>
//                         <p>User Name: {booking.fullName}</p>
//                         <p>User Email: {booking.userEmail}</p>
//                         <p>Tour ID: {booking._id}</p>
//                         <p>GuestSize: {booking.guestSize}</p>
//                         <p>phone : {booking.phone}</p>

//                         <p>Time: {booking.createdAt}</p>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </>
//   );
// };

// export default AdminPanel;

import React, { useState, useContext } from "react";
import ListTour from "./ListTour";
import { BASE_URL } from "../../utils/config";
import "./Admin.css";
import { AuthContext } from "../../context/AuthContext";
import AddTour from "./AddTour";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const AdminPanel = ({ username }) => {
  const [showUsers, setShowUsers] = useState(false);
  const [showTours, setShowTours] = useState(false);
  const [showAddTour, setShowAddTour] = useState(false);
  const [showListTourBookings, setShowListTourBookings] = useState(false);
  const [users, setUsers] = useState([]);
  const [bookedUsers, setBookedUsers] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const { token } = useContext(AuthContext);

  const handleButtonClick = async (buttonName) => {
    if (buttonName === "listUsers") {
      setShowUsers(true);
      setShowTours(false);
      setShowAddTour(false);
      setShowListTourBookings(false);
      const res = await fetch(`${BASE_URL}/users`, {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      const result = await res.json();
      if (!result.success) alert("You are not an admin");
      else setUsers(result.data);
    } else if (buttonName === "listTours") {
      setShowTours(true);
      setShowUsers(false);
      setShowAddTour(false);
      setShowListTourBookings(false);
    } else if (buttonName === "addTour") {
      setShowAddTour(true);
      setShowTours(false);
      setShowUsers(false);
      setShowListTourBookings(false);
    } else if (buttonName === "listTourBookings") {
      setShowListTourBookings(true);
      setShowUsers(false);
      setShowTours(false);
      setShowAddTour(false);
      await fetchBookedUsers();
    }
  };

  const deleteUser = async (userId) => {
    const res = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const result = await res.json();
    if (result.success) {
      setUsers(users.filter((user) => user._id !== userId));
    } else {
      alert("Failed to delete user");
    }
  };

  const fetchBookedUsers = async () => {
    const res = await fetch(`${BASE_URL}/booking`, {
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const result = await res.json();
    if (result.success) {
      console.log(result.data);
      setBookedUsers(result.data);
    } else {
      alert("Failed to fetch booked users");
    }
  };

  const showAllData = (bookingId) => {
    setSelectedBookingId(bookingId === selectedBookingId ? null : bookingId);
  };

  return (
    <>
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
            Create Tour
          </button>
          <button
            className="btn btn-primary m-2"
            onClick={() => handleButtonClick("listTourBookings")}
          >
            List TourBookings
          </button>
        </div>
      </div>

      {showUsers && (
        <div className="container user-list">
          <h2 className="userHead h2 text-center ">User List</h2>
          <ul>
            <li>
              <div>Number Of Users</div>
              <div>ID</div>
              <div>Username</div>
              <div>Email</div>
              <div className="delete-user">Action</div>{" "}
            </li>
            {users.map(
              (user, index) =>
                user.username !== "admin" && (
                  <li key={user._id}>
                    <div>{index}</div>
                    <div>{user._id}</div>
                    <div>{user.username}</div>
                    <div>{user.email}</div>
                    <div>
                      <FontAwesomeIcon
                        style={{ backgroundColor: "white", color: "red" }}
                        icon={faTrashAlt}
                        onClick={() => deleteUser(user._id)}
                      />
                    </div>
                  </li>
                )
            )}
          </ul>
        </div>
      )}

      {showTours && <ListTour />}
      {showAddTour && <AddTour onClose={() => setShowAddTour(false)} />}

      {showListTourBookings && (
        <div className="container booked-users">
          <h2 className="userHead h2 text-center">Booked Tours</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>User ID</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Tour Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookedUsers.map((booking) => (
                <React.Fragment key={booking.userId}>
                  <tr>
                    <td>{booking.userId}</td>
                    <td>{booking.userName}</td>
                    <td>{booking.userEmail}</td>
                    <td>{booking.tourName}</td>
                    <td>
                      <button
                        className={
                          selectedBookingId === booking.userId
                            ? "btn btn-danger"
                            : "btn btn-warning"
                        }
                        onClick={() => showAllData(booking.userId)}
                      >
                        {selectedBookingId === booking.userId
                          ? "Close"
                          : "View Details"}
                      </button>
                    </td>
                  </tr>
                  {selectedBookingId === booking.userId && (
                    <tr>
                      <td colSpan="5">
                        <p>User ID: {booking.userId}</p>
                        <p>User Name: {booking.fullName}</p>
                        <p>User Email: {booking.userEmail}</p>
                        <p>Tour ID: {booking._id}</p>
                        <p>GuestSize: {booking.guestSize}</p>
                        <p>phone : {booking.phone}</p>

                        <p>Time: {booking.createdAt}</p>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default AdminPanel;
