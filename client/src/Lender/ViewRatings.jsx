import React, { useEffect, useState } from "react";
import AxiosInstance from "../AxiosInstance";
import Navbar from "./Navbar";

const ViewRatings = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const lender = JSON.parse(localStorage.getItem("lender"));
  const lenderId = lender.id;

  // Fetch ratings on component mount
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await AxiosInstance.get(`/rating/parking/${lenderId}`);
        setRatings(response.data.ratings);
        setError(null);
      } catch (error) {
        setError("Failed to fetch ratings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  const renderStars = (ratingValue) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= ratingValue) {
        stars.push(
          <span key={i} className="text-yellow-500">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300">
            ★
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Ratings</h1>

        {loading ? (
          <div className="text-center">
            <p className="text-gray-600">Loading ratings...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-md text-center">
            {error}
          </div>
        ) : ratings.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600">No ratings found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ratings.map((rating) => (
              <div
                key={rating.id}
                className="bg-white shadow-md rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold mb-2">
                  Rating by {rating.user.name}
                </h2>
                <div className="flex items-center mb-2">
                  {renderStars(rating.ratingValue)}{" "}
                  {/* Render stars based on rating value */}
                </div>
                <p className="text-gray-700 mb-2">
                  <strong>Comment:</strong>{" "}
                  {rating.comment || "No comment provided."}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Rating Time:</strong>{" "}
                  {new Date(rating.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewRatings;
