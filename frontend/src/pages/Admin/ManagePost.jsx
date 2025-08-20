import React, { useState, useEffect } from "react";

const ManagePost = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/posts");
        const data = await response.json();
        if (response.ok) {
          setPosts(data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setPosts(posts.filter((post) => post._id !== id));
          setMessage("Post deleted successfully!");
          setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        setMessage("Failed to delete post.");
        setTimeout(() => setMessage(""), 3000);
      }
    }
  };

  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleUpdate = (post) => {
    setSelectedPost(post);
    setShowUpdatePopup(true);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-600 text-white p-4">
        <h3 className="text-xl font-bold mb-4">Admin Panel</h3><br></br>
        <ul>
          <li className="mb-2"><a href="/add-post" className="hover:text-gray-300">Add Post</a></li><br></br>
          <li className="mb-2"><a href="/manage-post" className="hover:text-gray-300">Manage Posts</a></li><br></br>
          <li className="mb-2"><a href="/manage-users" className="hover:text-gray-300">Manage Users</a></li><br></br>
          <li className="mb-2"><a href="/applicants" className="hover:text-gray-300">Applicants</a></li>
        </ul>
      </div>
      {/* Main Content - Manage Posts */}
      <div className="w-4/5 p-6">
        <h2 className="text-2xl font-bold mb-4">Manage Posts</h2>
        {message && <div className="text-green-500 text-center mb-4">{message}</div>}
        {posts.length > 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-6 gap-4 font-bold border-b pb-2 mb-4">
              <span>Image</span>
              <span>Name</span>
              <span>Type</span>
              <span>Price</span>
              <span>Description</span>
              <span>Action</span>
            </div>
            {posts.map((post) => (
              <div key={post._id} className="grid grid-cols-6 gap-4 border-b py-2 items-center">
                <img src={post.image || "https://via.placeholder.com/50"} alt={post.name} className="w-12 h-12 object-cover" />
                <span>{post.name}</span>
                <span>{post.type}</span>
                <span>${post.price}</span>
                <span>{post.description}</span>
                <div>
                  <button
                    onClick={() => handleUpdate(post)}
                    className="bg-blue-600 text-white px-2 py-1 rounded-lg mr-2 hover:bg-blue-700"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No posts available.</p>
        )}
        {showUpdatePopup && selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h3 className="text-xl font-bold mb-4">Update Post</h3>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const data = new FormData();
                  data.append("name", selectedPost.name);
                  data.append("type", selectedPost.type);
                  data.append("price", selectedPost.price);
                  if (selectedPost.image instanceof File) {
                    data.append("image", selectedPost.image);
                  }
                  data.append("description", selectedPost.description);

                  try {
                    const response = await fetch(`http://localhost:5000/api/posts/${selectedPost._id}`, {
                      method: "PUT",
                      body: data,
                    });
                    if (response.ok) {
                      setPosts(posts.map((p) => (p._id === selectedPost._id ? { ...selectedPost } : p)));
                      setShowUpdatePopup(false);
                    }
                  } catch (error) {
                    console.error("Update error:", error);
                  }
                }}
                encType="multipart/form-data"
              >
                <div className="mb-4">
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={selectedPost.name}
                    onChange={(e) => setSelectedPost({ ...selectedPost, name: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Type</label>
                  <select
                    name="type"
                    value={selectedPost.type}
                    onChange={(e) => setSelectedPost({ ...selectedPost, type: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                    <option value="rabbit">Rabbit</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={selectedPost.price}
                    onChange={(e) => setSelectedPost({ ...selectedPost, price: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Image Upload</label>
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => setSelectedPost({ ...selectedPost, image: e.target.files[0] })}
                    className="w-full p-2 border rounded-lg"
                  />
                  {selectedPost.image && typeof selectedPost.image === "string" && (
                    <img src={selectedPost.image} alt="Current" className="w-20 h-20 object-cover mt-2" />
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={selectedPost.description}
                    onChange={(e) => setSelectedPost({ ...selectedPost, description: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowUpdatePopup(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePost;