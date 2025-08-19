import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side - Form */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <div className="w-3/4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Register</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input type="text" className="w-full p-2 border rounded-lg" placeholder="Enter name" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input type="password" className="w-full p-2 border rounded-lg" placeholder="Enter password" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Contact Number</label>
              <input type="text" className="w-full p-2 border rounded-lg" placeholder="Enter contact number" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input type="email" className="w-full p-2 border rounded-lg" placeholder="Enter email" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <textarea className="w-full p-2 border rounded-lg" placeholder="Enter address"></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">Register</button>
            <p className="mt-4 text-gray-600">
              Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            </p>
          </form>
        </div>
      </div>
      {/* Right Side - Image Placeholder */}
      <div className="w-1/2 bg-gray-200">
        <img src="/assets/register-image.jpg" alt="Register Image" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default Register;