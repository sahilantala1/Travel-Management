import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ThankYou from "../pages/ThankYou";
import Home from "./../pages/Home";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import SearchResultList from "./../pages/SearchResultList";
import TourDetails from "./../pages/TourDetails";
import Tours from "./../pages/Tours";
import AdminPanel from "../components/Header/AdminPanel";
import UpdateTour from "../components/Header/UpdateTour";
import PayNow from "../pages/PayNow";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/tours/update/:id" element={<UpdateTour />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/pay-now" element={<PayNow />} />
      <Route path="/tours/search" element={<SearchResultList />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
};

export default Routers;
