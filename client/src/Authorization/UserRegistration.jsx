import React, { useState } from "react";
import { Link } from "react-router-dom";
import AxiosInstance from "../AxiosInstance";

const UserRegistration = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        mobileNumber: "",
        address: "",
        image: null, 
      });
      
      const [message, setMessage] = useState("");
      const [error, setError] = useState("");
      const [loading, setLoading] = useState(false);
    
      // Handle input changes
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      // Handle file input change
      const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
      };
    
      // Handle form submission
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");
    
        try {
          const { name, email, password, mobileNumber, address, image } = formData;
    
          // Validate form fields
          if (!name || !email || !password) {
            setError("Please fill out all required fields.");
            setLoading(false);
            return;
          }
    
          // Prepare form data for API submission
          const data = new FormData();
          data.append("name", name);
          data.append("email", email);
          data.append("password", password);
          data.append("mobileNumber", mobileNumber);
          data.append("address", address);
          if (image) {
            data.append("image", image);
          }
    
          const response = await AxiosInstance.post("user/signup", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
    
          setMessage(response.data.message);
          setLoading(false);
        } catch (err) {
          setError(err.response?.data?.message || "An error occurred during registration.");
          setLoading(false);
        }
      };
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-500 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 border border-gray-300">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-semibold text-center text-gray-800">User Registration</h1>

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              {/* Name Input */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600 transition duration-300"
                  placeholder="Enter your name"
                  required
                />
                <label
                  htmlFor="name"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm"
                >
                  Name
                </label>
              </div>

              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600 transition duration-300"
                  placeholder="Email address"
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm"
                >
                  Email Address
                </label>
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600 transition duration-300"
                  placeholder="Password"
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm"
                >
                  Password
                </label>
              </div>

              {/* Mobile Number Input */}
              <div className="relative">
                <input
                  type="number"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600 transition duration-300"
                  placeholder="Mobile number"
                />
                <label
                  htmlFor="mobileNumber"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm"
                >
                  Mobile Number
                </label>
              </div>

              {/* Address Input */}
              <div className="relative">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600 transition duration-300"
                  placeholder="Address"
                />
                <label
                  htmlFor="address"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm"
                >
                  Address
                </label>
              </div>

              {/* Image Upload Input */}
              <div className="relative">
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600 transition duration-300"
                />
              </div>

              {/* Register Button */}
              <div className="relative">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 text-white rounded-md px-4 py-2 w-full hover:bg-blue-600 transition duration-300"
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>

              {/* Display success or error message */}
              {message && <p className="text-green-500 text-center mt-4">{message}</p>}
              {error && <p className="text-red-500 text-center mt-4">{error}</p>}

              {/* Navigation to Login */}
              <div className="text-sm text-gray-600 text-center">
                Already have an account?{" "}
                <Link to="/userLogin" className="text-blue-500 hover:underline">
                  Login here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserRegistration