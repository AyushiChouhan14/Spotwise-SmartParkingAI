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

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("lender");
    navigate("/lenderLogin");
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
        <Link to="/lenderHome">
          <li className="cursor-pointer mr-6">Home</li>
        </Link>
        <Link to="/addParkingPlace">
          <li className="cursor-pointer mr-6">Add Parking Place</li>
        </Link>
        <Link to="/viewHisBookings">
          <li className="cursor-pointer mr-6">View Bookings</li>
        </Link>
        <Link to="/ratings">
          <li className="cursor-pointer mr-6">View Ratings</li>
        </Link>
        <Link to="/lenderProfile">
          <li className="cursor-pointer mr-6">Profile</li>
        </Link>
        <li className="cursor-pointer" onClick={handleLogout}>
          Logout
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
