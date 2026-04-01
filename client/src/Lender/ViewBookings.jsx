// src/components/ViewBookings.js
import React, { useState, useEffect } from "react";
import AxiosInstance from "../AxiosInstance";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updateError, setUpdateError] = useState("");
  const navigate = useNavigate();

  const lenderData = localStorage.getItem("lender");
  let lenderId = null;

  if (lenderData) {
    try {
      const parsedLender = JSON.parse(lenderData);
      lenderId = parsedLender.id;
    } catch (e) {
      console.error("Failed to parse lender data from localStorage", e);
      setError("Invalid lender data. Please log in again.");
      setLoading(false);
      navigate("/lenderLogin");
    }
  } else {
    setError("Lender not found. Please log in.");
    setLoading(false);
    navigate("/lenderLogin");
  }

  useEffect(() => {
    if (!lenderId) return;

    const fetchBookings = async () => {
      try {
        const response = await AxiosInstance.get(
          `/booking/lender/${lenderId}`
        );
        if (response.data.success) {
          setBookings(response.data.bookings);
        } else {
          setError(response.data.msg || "Failed to fetch bookings.");
        }
      } catch (err) {
        setError(
          err.response?.data?.msg || "An error occurred while fetching bookings."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [lenderId, navigate]);

  // Function to handle status update
  const updateBookingStatus = async (bookingId, status) => {
    try {
      const response = await AxiosInstance.post(
        `/booking/update/status/${bookingId}?status=${status}`
      );

      if (response.data.success) {
        // Update the status of the booking in the bookings array
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === bookingId
              ? { ...booking, status: status }
              : booking
          )
        );
        setUpdateError(null);
      } else {
        setUpdateError(response.data.msg);
      }
    } catch (error) {
      setUpdateError("An error occurred while updating the status.");
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>

        {loading ? (
          <p>Loading bookings...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : bookings.length > 0 ? (
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="py-2 px-4">Booking ID</th>
                <th className="py-2 px-4">Parking Place</th>
                <th className="py-2 px-4">User</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Reservation Time</th>
                <th className="py-2 px-4">Start Time</th>
                <th className="py-2 px-4">End Time</th>
                <th className="py-2 px-4">Active</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="text-center border-t">
                  <td className="py-2 px-4">{booking.id}</td>
                  <td className="py-2 px-4">
                    {booking.parkingPlace.placeName}
                  </td>
                  <td className="py-2 px-4">{booking.user.name}</td>
                  <td className="py-2 px-4">
                    <select
                      className="border border-gray-300 p-2 rounded-lg"
                      value={booking.status}
                      onChange={(e) =>
                        updateBookingStatus(booking.id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="py-2 px-4">
                    {new Date(booking.reservationTime).toLocaleString()}
                  </td>
                  <td className="py-2 px-4">
                    {new Date(booking.startTime).toLocaleString()}
                  </td>
                  <td className="py-2 px-4">
                    {new Date(booking.endTime).toLocaleString()}
                  </td>
                  <td className="py-2 px-4">{booking.active ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No bookings found.</p>
        )}

        {updateError && <div className="text-red-500 mt-4">{updateError}</div>}
      </div>
    </div>
  );
};

export default ViewBookings;
