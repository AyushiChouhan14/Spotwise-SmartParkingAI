import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosInstance from "../AxiosInstance";
import UserNavbar from "./UserNavbar";
import { toast } from "react-toastify";

const BookParkingPlace = () => {
  const { lenderId } = useParams(); // Fetch lenderId from URL
  const [userId, setUserId] = useState(""); // User ID state
  const [startTime, setStartTime] = useState(""); // Start time state
  const [endTime, setEndTime] = useState(""); // End time state
  const [loading, setLoading] = useState(false); // Loading state
  const [responseMessage, setResponseMessage] = useState(null); // Response message state

  // Get user data from localStorage and set userId once when the component mounts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      setUserId(user.id);
    }
  }, []); // Empty dependency array ensures this runs only once

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage(null);

    try {
      // Make the API request to book the parking place
      const response = await AxiosInstance.post(`/booking/parking/${lenderId}/book?userId=${userId}&startTime=${startTime}&endTime=${endTime}`);
      // Handle the response
      if (response.data.success) {
        toast.success(response.data.msg)
        setResponseMessage({
          type: "success",
          message: response.data.msg,
        });
      } else {
        setResponseMessage({
          type: "error",
          message: response.data.msg,
        });
      }
    } catch (error) {
      // Handle errors
      setResponseMessage({
        type: "error",
        message: "An error occurred while booking the parking place.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <UserNavbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Book Parking Place
        </h1>
        <form
          className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
          onSubmit={handleSubmit}
        >
          {/* Hidden Lender ID */}
          <input type="hidden" value={lenderId} />

          {/* Hidden User ID */}
          <input type="hidden" value={userId} />
          {/* Start Time */}
          <div className="mb-4">
            <label
              htmlFor="startTime"
              className="block text-gray-700 font-semibold mb-2"
            >
              Start Time
            </label>
            <input
              type="datetime-local"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* End Time */}
          <div className="mb-4">
            <label
              htmlFor="endTime"
              className="block text-gray-700 font-semibold mb-2"
            >
              End Time
            </label>
            <input
              type="datetime-local"
              id="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg transition-colors duration-300 ${
              loading ? "bg-blue-300" : "hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Booking..." : "Book Parking Place"}
          </button>
        </form>

        {/* Response Message */}
        {responseMessage && (
          <div
            className={`mt-4 p-4 rounded-lg ${
              responseMessage.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {responseMessage.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookParkingPlace;
