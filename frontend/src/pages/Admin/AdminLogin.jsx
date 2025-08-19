import React from 'react'
import { Link } from 'react-router-dom';

const AdminLogin = () => {
  return (
     <div className="flex h-screen">
      {/* Left Side - Form */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <div className="w-3/4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Login</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input type="text" className="w-full p-2 border rounded-lg" placeholder="Enter username" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input type="password" className="w-full p-2 border rounded-lg" placeholder="Enter password" />
            </div>
             <br></br>
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">Login</button>
           
          </form>
        </div>
      </div>
      {/* Right Side - Image Placeholder */}
      <div className="w-1/2 bg-gray-200">
        <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" alt="Login Image" className="w-full h-full object-cover" />
      </div>
    </div>
  )
}

export default AdminLogin