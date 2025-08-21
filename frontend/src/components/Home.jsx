import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { type } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/posts");
        const data = await response.json();
        if (response.ok) {
          setPosts(data);
        } else {
          console.error("Failed to fetch posts:", data.message || "No details");
        }
      } catch (error) {
        console.error("Network error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = type
    ? posts.filter((post) => post.type.toLowerCase() === type.toLowerCase())
    : posts;

  const handleSavePost = async (postId) => {
    console.log("Attempting to save post with ID:", postId);
    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId }),
      });
      const data = await response.json();
      console.log("Server response:", data);
      if (response.ok) {
        alert("Added to cart!");
        navigate("/cart");
      } else {
        console.error("Save failed:", data.message || "Unknown server error");
        alert(`Failed to save: ${data.message || "Please check server status"}`);
      }
    } catch (error) {
      console.error("Network or fetch error:", error);
      alert("Network error. Ensure the server is running at http://localhost:5000.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full">
        <img 
          src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Pet Adoption Header" 
          className="w-full h-[450px] object-cover object-center" 
        />
      </header>
      <main className="flex-grow">
        <section className="text-center py-16 bg-gray-100">
          <h1 className="text-4xl font-bold text-gray-800">Welcome to Pet Adoption Portal</h1>
          <p className="mt-4 text-lg text-gray-600">Find your perfect companion today!</p>
        </section>
        {filteredPosts.length > 0 && (
          <section className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {type ? `${type.charAt(0).toUpperCase() + type.slice(1)} Pets` : "Available Pets"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={post.image ? `http://localhost:5000${post.image}` : "https://via.placeholder.com/200"} alt={post.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{post.name}</h3>
                    <p className="text-gray-600">Type: {post.type}</p>
                    <p className="text-gray-600">Price: ${post.price}</p>
                    <p className="text-gray-600 mt-2">Description: {post.description}</p>
                    <div className="mt-4 flex justify-between">
                      <button
                        onClick={() => handleSavePost(post._id)}
                        className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        {filteredPosts.length === 0 && (
          <p className="text-center py-10 text-gray-600">
            {type ? `No ${type} pets available at the moment.` : "No pets available at the moment."}
          </p>
        )}
      </main>
    </div>
  );
};

export default Home;