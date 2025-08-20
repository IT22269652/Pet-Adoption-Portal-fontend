import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setEditedUser(storedUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleUpdate = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/users/update/${user.id}`, editedUser);
      setMessage(response.data.message);
      const updatedUser = response.data.user;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsEditing(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/2 p-10 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Profile</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Name</label>
              <input
                type="text"
                value={user.name || ''}
                readOnly={!isEditing}
                onChange={handleChange}
                name="name"
                className="w-full p-2 border rounded-lg bg-gray-50"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Email</label>
              <input
                type="email"
                value={user.email || ''}
                readOnly={!isEditing}
                onChange={handleChange}
                name="email"
                className="w-full p-2 border rounded-lg bg-gray-50"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Contact Number</label>
              <input
                type="text"
                value={user.contactNumber || ''}
                readOnly={!isEditing}
                onChange={handleChange}
                name="contactNumber"
                className="w-full p-2 border rounded-lg bg-gray-50"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Address</label>
              <textarea
                value={user.address || ''}
                readOnly={!isEditing}
                onChange={handleChange}
                name="address"
                className="w-full p-2 border rounded-lg bg-gray-50"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleUpdate}
                className="mt-4 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 w-full"
              >
                Update
              </button>
              <button
                onClick={handleLogout}
                className="mt-4 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 w-full"
              >
                Logout
              </button>
            </div>
            {message && (
              <p className={`mt-4 ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-gray-200 flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
          alt="Profile Pet"
          className="w-full h-full object-cover"
        />
      </div>
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h3 className="text-2xl font-bold mb-4">Update Profile</h3>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={editedUser.name || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password (leave blank to keep current)</label>
              <input
                type="password"
                name="password"
                value={editedUser.password || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                value={editedUser.contactNumber || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={editedUser.email || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Address</label>
              <textarea
                name="address"
                value={editedUser.address || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleSave}
                className="mt-4 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 w-full"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="mt-4 bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;