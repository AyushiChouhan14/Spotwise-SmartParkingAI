import React, { useState, useEffect } from 'react';
import AxiosInstance from '../AxiosInstance';
import UserNavbar from './UserNavbar';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState(null);
  
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [userId, setUserId] = useState(null);
  
    const userData = localStorage.getItem('user');
  
    useEffect(() => {
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUserId(parsedUser.id);
          
          console.log("userId",userId);
  
          setName(parsedUser.name || '');
          setEmail(parsedUser.email || '');
          setMobileNumber(parsedUser.mobileNumber || '');
          setAddress(parsedUser.address || '');
  
        } catch (e) {
          console.error('Failed to parse user data from localStorage', e);
          setErrorMsg('Invalid user data. Please log in again.');
          navigate('/userLogin');
        }
      } else {
        setErrorMsg('user not found. Please log in.');
        navigate('/userLogin');
      }
    }, []);
  
    const handleImageChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!name || !email || !mobileNumber || !address) {
        setErrorMsg('Please fill in all required fields.');
        return;
      }
  
      setLoading(true);
      setErrorMsg('');
      setSuccessMsg('');
  
      // Create form data
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      if (password) formData.append('password', password);
      formData.append('mobileNumber', mobileNumber);
      formData.append('address', address);
      if (image) formData.append('image', image);

      
      try {
        const response = await AxiosInstance.put(`/user/${userId}`, formData);
  
        if (response.status === 200 && response.data.success) {
          setSuccessMsg(response.data.message || 'Profile updated successfully.');
  
          const updatedUser = {
            ...JSON.parse(userData),
            name,
            email,
            mobileNumber,
            address,
            image: image ? image.name : JSON.parse(userData).image,
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        } else {
          setErrorMsg(response.data.message || 'Failed to update profile.');
        }
      } catch (error) {
        if (error.response) {
          setErrorMsg(error.response.data.msg || 'Failed to update profile.');
        } else if (error.request) {
          setErrorMsg('No response from server. Please try again later.');
        } else {
          setErrorMsg('An error occurred. Please try again.');
        }
        console.error('Update profile error:', error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div>
        <UserNavbar />
        <div className="container mx-auto p-8">
          <h1 className="text-3xl font-bold mb-6">Update Profile</h1>
  
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
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
  
            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
  
            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
  
            {/* Mobile Number Field */}
            <div className="mb-4">
              <label htmlFor="mobileNumber" className="block text-gray-700 font-medium mb-2">
                Mobile Number<span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="mobileNumber"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
  
            {/* Address Field */}
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                Address<span className="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                required
              ></textarea>
            </div>
  
            {/* Image Upload Field */}
            <div className="mb-6">
              <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
                Profile Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* Optional: Display current or selected image */}
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  className="mt-4 w-32 h-32 object-cover rounded-full"
                />
              ) : (
                // Assuming the lender object contains an image URL
                JSON.parse(userData)?.image && (
                  <img
                    src={`http://localhost:8080/images/${JSON.parse(userData).image}`}
                    alt="Profile"
                    className="mt-4 w-32 h-32 object-cover rounded-full"
                  />
                )
              )}
            </div>
  
            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    );
  };

export default UserProfile