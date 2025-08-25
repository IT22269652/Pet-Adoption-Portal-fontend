import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      setMessage(response.data.message);
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <div className="w-3/4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded-lg" placeholder="Enter email" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded-lg" placeholder="Enter password" />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">Login</button>
            {message && <p className="mt-4 text-green-600">{message}</p>}
            <p className="mt-4 text-gray-600">
              Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
            </p>
          </form>
        </div>
      </div>
      <div className="w-1/2 bg-gray-200">
        <img src="https://image.petmd.com/files/2023-10/syptomchcker.jpg" alt="Login Image" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default Login;