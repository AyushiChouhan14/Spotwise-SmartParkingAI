import React from "react";
import UserNav from "./UserNavbar";
import { Link } from "react-router-dom";

const UserHome = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <UserNav />
      <div className="max-w-6xl mx-auto p-6">
        <header className="bg-white shadow-md rounded-lg p-4 mb-6">
          <h1 className="text-3xl font-bold text-blue-900">Welcome to Smart Parking</h1>
          <p className="text-gray-600">
            Manage your parking needs seamlessly. Explore the features available to you!
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <h2 className="text-xl font-semibold">View Map</h2>
            <p className="text-gray-500">
              Explore parking options near you.
            </p>
            <Link to="/user/view-map">
              <button className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition">
                Go to Map
              </button>
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <h2 className="text-xl font-semibold">Search for Parking</h2>
            <p className="text-gray-500">
              Find available parking spaces quickly.
            </p>
            <Link to="/user/search-parking">
              <button className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition">
                Search Now
              </button>
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <h2 className="text-xl font-semibold">View Booked Parking</h2>
            <p className="text-gray-500">
              Check your current bookings and details.
            </p>
            <Link to="/user/view-booked-parking">
              <button className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition">
                View Bookings
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
