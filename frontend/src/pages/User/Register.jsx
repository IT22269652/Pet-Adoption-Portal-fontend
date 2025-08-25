import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Basic validation
    if (!name || !password || !contactNumber || !email || !address) {
      setError('All fields are required.');
      return;
    }

    // Name validation (letters and spaces only, min 2 characters)
    if (!/^[a-zA-Z\s]{2,}$/.test(name)) {
      setError('Name must contain only letters and be at least 2 characters long.');
      return;
    }

    // Email validation
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Password validation (min 8 characters, at least one letter and one number)
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      setError('Password must be at least 8 characters long and include at least one letter and one number.');
      return;
    }

    // Contact number validation (10 digits, numbers only)
    if (!/^\d{10}$/.test(contactNumber)) {
      setError('Contact number must be exactly 10 digits.');
      return;
    }

    // Address validation (min 10 characters)
    if (address.length < 10) {
      setError('Address must be at least 10 characters long.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name,
        password,
        contactNumber,
        email,
        address,
      });
      setMessage(response.data.message);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <div className="w-3/4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter name"
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
            <div className="mb-4">
              <label className="block text-gray-700">Contact Number</label>
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter contact number"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter email"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter address"
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
              Register
            </button>
            {message && <p className="mt-4 text-green-600">{message}</p>}
            {error && <p className="mt-4 text-red-600">{error}</p>}
            <p className="mt-4 text-gray-600">
              Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            </p>
          </form>
        </div>
      </div>
      <div className="w-1/2 bg-gray-200">
        <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" alt="Register Image" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Register;