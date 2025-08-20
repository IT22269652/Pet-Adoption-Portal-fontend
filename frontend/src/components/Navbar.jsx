import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/${searchTerm.toLowerCase()}`;
    }
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="text-xl font-semibold text-gray-800">
          <Link to="/" className="hover:text-yellow-500">DreamPet</Link>
        </div>
        <div className="flex space-x-6 items-center">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by pet type (e.g., dog, cat)..."
              className="p-2 border rounded-l-lg focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
            >
              Search
            </button>
          </form>
          <Link to="/" className="text-gray-600 hover:text-yellow-500">All Pets</Link>
          <Link to="/cats" className="text-gray-600 hover:text-yellow-500">Cats</Link>
          <Link to="/dogs" className="text-gray-600 hover:text-yellow-500">Dogs</Link>
          <Link to="/birds" className="text-gray-600 hover:text-yellow-500">Birds</Link>
          <Link to="/rabbit" className="text-gray-600 hover:text-yellow-500">Rabbits</Link>
          <Link to="/admin-login" className="text-gray-600 hover:text-yellow-500">Admin Login</Link>
          <Link to="/login" className="text-gray-600 hover:text-yellow-500">Login</Link>
          <Link to="/register" className="text-gray-600 hover:text-yellow-500">Register</Link>
          <Link to="/profile" className="text-gray-600 hover:text-yellow-500">Profile</Link>
          <Link to="/cart" className="text-gray-600 hover:text-yellow-500">Cart</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;