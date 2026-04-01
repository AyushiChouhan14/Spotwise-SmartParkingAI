import React, { useState } from "react";
import AxiosInstance from "../AxiosInstance";
import { useNavigate } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import { toast } from "react-toastify";

const AddVehicle = () => {
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!vehicleName || !vehicleNumber || !image) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData();
    formData.append("vehicleName", vehicleName);
    formData.append("vehicleNumber", vehicleNumber);
    formData.append("image", image);

    const userId = JSON.parse(localStorage.getItem("user")).id;

    try {
      const response = await AxiosInstance.post(
        `/vehicle/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.msg)
        setSuccessMsg(response.data.msg || "Vehicle added successfully.");
        setVehicleName("");
        setVehicleNumber("");
        setImage(null);
      } else {
        setErrorMsg(response.data.msg || "Failed to add vehicle.");
      }
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data.msg || "Failed to add vehicle.");
      } else if (error.request) {
        setErrorMsg("No response from server. Please try again later.");
      } else {
        setErrorMsg("An error occurred. Please try again.");
      }
      console.error("Add vehicle error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <UserNavbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Add Vehicle</h1>

        {successMsg && (
          <div className="bg-green-100 text-green-700 p-4 mb-4 rounded">
            {successMsg}
          </div>
        )}

        {errorMsg && (
          <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="mb-4">
            <label
              htmlFor="vehicleName"
              className="block text-gray-700 font-medium mb-2"
            >
              Vehicle Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="vehicleName"
              value={vehicleName}
              onChange={(e) => setVehicleName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="vehicleNumber"
              className="block text-gray-700 font-medium mb-2"
            >
              Vehicle Number<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="vehicleNumber"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-gray-700 font-medium mb-2"
            >
              Vehicle Image<span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Vehicle"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
