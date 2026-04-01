import React, { useEffect, useState } from "react";
import AxiosInstance from "../AxiosInstance";
import UserNavbar from "./UserNavbar";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // Still showing loading state initially
  const [error, setError] = useState(null);
  const [releaseError, setReleaseError] = useState(null); // For release errors
  const [releaseSuccess, setReleaseSuccess] = useState(null); // For release success

  // Fetch the logged-in user ID from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;

  // Fetch bookings on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await AxiosInstance.get(`/booking/user/${userId}`);
        setBookings(response.data.bookings); // Populate bookings
        setError(null); // Clear errors
      } catch (error) {
        setError("Failed to fetch bookings. Please try again later.");
      } finally {
        setLoading(false); // Stop loading after the request
      }
    };

    if (userId) {
      fetchBookings();
    } else {
      setLoading(false);
      setError("User ID not found. Please log in.");
    }
  }, [userId]);

  // Function to release parking place
  const releaseParkingPlace = async (bookingId) => {
    try {
      const response = await AxiosInstance.post(`/booking/release/${bookingId}`);
      if (response.data.success) {
        setReleaseSuccess(`Parking place for booking ${bookingId} released successfully.`);
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking.id !== bookingId)
        );
        setReleaseError(null); // Clear any previous release errors
      } else {
        setReleaseError(response.data.msg);
      }
    } catch (error) {
      setReleaseError("An error occurred while releasing the parking place.");
    }
  };

  return (
    <div>
      <UserNavbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Your Bookings</h1>

        {loading ? (
          <div className="text-center">
            <p className="text-gray-600">Loading bookings...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-md text-center">
            {error}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600">No bookings found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white shadow-md rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold mb-2">
                  Booking #{booking.id}
                </h2>
                <p className="text-gray-700 mb-2">
                  <strong>Reservation Time:</strong>{" "}
                  {new Date(booking.reservationTime).toLocaleString()}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Start Time:</strong>{" "}
                  {new Date(booking.startTime).toLocaleString()}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>End Time:</strong>{" "}
                  {new Date(booking.endTime).toLocaleString()}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Status:</strong> {booking.status}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Parking Place:</strong>{" "}
                  {booking.parkingPlace.placeName}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Area:</strong> {booking.parkingPlace.areaName}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Lender:</strong> {booking.parkingPlace.lender.name}
                </p>
                
                {/* Conditionally render "Release Parking Place" button */}
                {booking.status === "Accepted" && (
                  <button
                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    onClick={() => releaseParkingPlace(booking.id)}
                  >
                    Release Parking Place
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Success and Error Messages */}
        {releaseSuccess && (
          <div className="mt-4 bg-green-100 text-green-700 p-4 rounded-md text-center">
            {releaseSuccess}
          </div>
        )}
        {releaseError && (
          <div className="mt-4 bg-red-100 text-red-700 p-4 rounded-md text-center">
            {releaseError}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBookings;
