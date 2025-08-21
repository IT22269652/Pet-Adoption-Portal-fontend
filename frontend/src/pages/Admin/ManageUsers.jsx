import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/delete/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-600 text-white p-4">
        <h3 className="text-xl font-bold mb-4">Admin Panel</h3><br></br>
        <ul>
          <li className="mb-2"><a href="/" className="hover:text-gray-300">Home Page</a></li><br></br>
          <li className="mb-2"><a href="/add-post" className="hover:text-gray-300">Add Post</a></li><br></br>
          <li className="mb-2"><a href="/manage-post" className="hover:text-gray-300">Manage Posts</a></li><br></br>
          <li className="mb-2"><a href="/manage-users" className="hover:text-gray-300">Manage Users</a></li><br></br>
          <li className="mb-2"><a href="/applicants" className="hover:text-gray-300">Applicants</a></li>
        </ul>
      </div>
      {/* Main Content */}
      <div className="w-4/5 p-4">
        <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Contact Number</th>
              <th className="p-2 text-left">Address</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-b">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.contactNumber}</td>
                <td className="p-2">{user.address}</td>
                <td className="p-2">
                  <button onClick={() => handleDelete(user._id)} className="bg-red-600 text-white p-1 rounded-lg hover:bg-red-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUsers;