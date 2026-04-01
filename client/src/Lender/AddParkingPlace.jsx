import React, { useState } from "react";
import Navbar from "./Navbar";
import AxiosInstance from "../AxiosInstance";

const AddParkingPlace = () => {
  const [placeName, setPlaceName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [areaName, setAreaName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!placeName || !latitude || !longitude || !areaName) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("placeName", placeName);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("areaName", areaName);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    const lender = JSON.parse(localStorage.getItem("lender"));
    const lenderId = lender.id;

    console.log(lenderId, "lenderId");

    try {
      setLoading(true);
      const response = await AxiosInstance.post(
        `/parking/${lenderId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage(response.data.msg);
    } catch (error) {
      setMessage("An error occurred while adding the parking place.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
        <h1 className="text-2xl font-bold mb-4">Add New Parking Place</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="placeName"
              className="block text-sm font-medium text-gray-700"
            >
              Place Name
            </label>
            <input
              type="text"
              id="placeName"
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label
              htmlFor="latitude"
              className="block text-sm font-medium text-gray-700"
            >
              Latitude
            </label>
            <input
              type="text"
              id="latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label
              htmlFor="longitude"
              className="block text-sm font-medium text-gray-700"
            >
              Longitude
            </label>
            <input
              type="text"
              id="longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label
              htmlFor="areaName"
              className="block text-sm font-medium text-gray-700"
            >
              Area Name
            </label>
            <input
              type="text"
              id="areaName"
              value={areaName}
              onChange={(e) => setAreaName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Image (optional)
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          {message && <p className="text-red-500">{message}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
            >
              {loading ? "Adding..." : "Add Parking Place"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddParkingPlace;
