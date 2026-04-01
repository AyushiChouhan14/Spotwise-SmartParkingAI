import React from "react";
import { Link, useNavigate } from "react-router-dom";

const CarParkingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 mr-2 inline-block"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8h2a2 2 0 012 2v6a2 2 0 01-2 2H3m0 0v2a2 2 0 002 2h2a2 2 0 002-2v-2m0-10V4a2 2 0 00-2-2H3a2 2 0 00-2 2v2m16 0h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m0 0v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2m0-10V4a2 2 0 012-2h2a2 2 0 012 2v2"
    />
  </svg>
);

const UserNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/userLogin");
  };

  return (
    <nav className="bg-blue-900 text-white shadow-lg flex justify-between items-center p-4">
      <div className="flex items-center">
        <CarParkingIcon />
        <div className="text-lg font-bold">
          Smart Parking and Online Reservation
        </div>
      </div>

      <ul className="flex">
        <Link to="/user/view-map">
          <li className="cursor-pointer mr-6">View Map</li>
        </Link>
        <Link to="/user/viewBookings">
          <li className="cursor-pointer mr-6">View Booked Parking</li>
        </Link>
        {/* <Link to="/user/searchParking">
          <li className="cursor-pointer mr-6">Search for Parking</li>
        </Link>
        <Link to="/user/update-booking">
          <li className="cursor-pointer mr-6">Update Booking</li>
        </Link> */}
        <Link to="/user/give-rating">
          <li className="cursor-pointer mr-6">Give Rating</li>
        </Link>
        <Link to="/user/add-vehicle">
          <li className="cursor-pointer mr-6">Add Vehicle</li>
        </Link>
        <Link to="/user/viewProfile">
          <li className="cursor-pointer mr-6">View Profile</li>
        </Link>
        <li className="cursor-pointer" onClick={handleLogout}>
          Logout
        </li>
      </ul>
    </nav>
  );
};

export default UserNavbar;
