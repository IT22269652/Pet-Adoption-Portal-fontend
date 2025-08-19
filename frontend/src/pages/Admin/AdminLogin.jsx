import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', { username, password });
      setMessage(response.data.message);
      // Store the token (replace with real token from backend)
      localStorage.setItem('token', response.data.token || 'admin-token'); // Use real token
      setTimeout(() => {
        navigate('/add-post');
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Form */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <div className="w-3/4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter username"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter password"
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">Login</button>
            {message && <p className="mt-4 text-green-600">{message}</p>}
            <p className="mt-4 text-gray-600">
              Back to <Link to="/login" className="text-blue-600 hover:underline">User Login</Link>
            </p>
          </form>
        </div>
      </div>
      {/* Right Side - Image Placeholder */}
      <div className="w-1/2 bg-gray-200">
        <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" alt="Admin Login Image" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default AdminLogin;