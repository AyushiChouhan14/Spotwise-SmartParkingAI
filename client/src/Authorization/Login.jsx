import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "../AxiosInstance";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const { email, password } = formData;

      if (!email || !password) {
        setError("Please fill out all required fields.");
        setLoading(false);
        return;
      }

      const response = await AxiosInstance.post("/login/lender", {
        email,
        password,
      });

      if (response.data.success) {
        setMessage(response.data.msg);
        localStorage.setItem("lender", JSON.stringify(response.data.lender));
        navigate("/lenderHome");
      } else {
        setError(response.data.msg);
      }
    } catch (err) {
      setError("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-500 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 border border-gray-300">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-semibold text-center text-gray-800">Lender Login</h1>

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              {/* Email Input */}
              <div className="relative">
                <input
                  autoComplete="off"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600 transition duration-300"
                  placeholder="Email address"
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-sm"
                >
                  Email Address
                </label>
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  autoComplete="off"
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600 transition duration-300"
                  placeholder="Password"
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-sm"
                >
                  Password
                </label>
              </div>

              {/* Login Button */}
              <div className="relative">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 text-white rounded-md px-4 py-2 w-full hover:bg-blue-600 transition duration-300"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>

              {/* Display success or error message */}
              {message && <p className="text-green-500 text-center mt-4">{message}</p>}
              {error && <p className="text-red-500 text-center mt-4">{error}</p>}

              {/* Navigation to Register */}
              <div className="text-sm text-gray-600 text-center">
                Don't have an account?{" "}
                <Link to="/lenderRegister" className="text-blue-500 hover:underline">
                  Register here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
