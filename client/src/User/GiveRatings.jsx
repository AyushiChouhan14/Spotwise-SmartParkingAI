import React, { useState, useEffect } from "react";
import AxiosInstance from "../AxiosInstance";
import UserNavbar from "./UserNavbar";

const GiveRatings = () => {
  const [parkingPlaces, setParkingPlaces] = useState([]);
  const [selectedParkingPlace, setSelectedParkingPlace] = useState("");
  const [ratingValue, setRatingValue] = useState(1);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  // Fetch the logged-in user ID from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;

  // Fetch parking places for dropdown selection
  useEffect(() => {
    const fetchParkingPlaces = async () => {
      try {
        const response = await AxiosInstance.get("/parking");
        setParkingPlaces(response.data.parkingPlace); // Assuming your API returns an array of parking places
      } catch (error) {
        console.error("Error fetching parking places:", error);
      }
    };

    fetchParkingPlaces();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage(null);
  
    try {
      const response = await AxiosInstance.post(
        `/rating/add?parkingPlaceId=${selectedParkingPlace}&userId=${userId}&ratingValue=${ratingValue}&comment=${comment}`
      );
  
      if (response.data.success) {
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
      setResponseMessage({
        type: "error",
        message: "An error occurred while adding the rating.",
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <UserNavbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Give Rating</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
          <div className="mb-4">
            <label htmlFor="parkingPlace" className="block text-gray-700 font-semibold mb-2">
              Parking Place
            </label>
            <select
              id="parkingPlace"
              value={selectedParkingPlace}
              onChange={(e) => setSelectedParkingPlace(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select a Parking Place</option>
              {parkingPlaces.map((place) => (
                <option key={place.id} value={place.id}>
                  {place.placeName} - {place.areaName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="ratingValue" className="block text-gray-700 font-semibold mb-2">
              Rating Value (1 to 5)
            </label>
            <input
              type="number"
              id="ratingValue"
              value={ratingValue}
              onChange={(e) => setRatingValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              min="1"
              max="5"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="comment" className="block text-gray-700 font-semibold mb-2">
              Comment
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              rows="4"
              placeholder="Enter your comments about the parking place"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg transition-colors duration-300 ${
              loading ? "bg-blue-300" : "hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Rating"}
          </button>
        </form>

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

export default GiveRatings;
