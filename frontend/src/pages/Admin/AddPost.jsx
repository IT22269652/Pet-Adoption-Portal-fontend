import React from 'react';

const AddPost = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-600 text-white p-4">
        <h3 className="text-xl font-bold mb-4">Admin Panel</h3><br></br>
        <ul>
          <li className="mb-2"><a href="/add-post" className="hover:text-gray-300">Add Post</a></li><br></br>
          <li className="mb-2"><a href="/manage-post" className="hover:text-gray-300">Manage Posts</a></li><br></br>
          <li className="mb-2"><a href="/manage-users" className="hover:text-gray-300">Manage Users</a></li>
        </ul>
      </div>
      {/* Main Content - Add Post Form */}
      <div className="w-4/5 p-6">
        <h2 className="text-2xl font-bold mb-4">Add New Post</h2>
        <form className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input type="text" className="w-full p-2 border rounded-lg" placeholder="Enter pet name" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Type</label>
            <select className="w-full p-2 border rounded-lg">
              <option value="">Select Type</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
              <option value="rabbit">Rabbit</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input type="number" className="w-full p-2 border rounded-lg" placeholder="Enter price" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image Upload</label>
            <input type="file" className="w-full p-2 border rounded-lg" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea className="w-full p-2 border rounded-lg" placeholder="Enter description"></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddPost;