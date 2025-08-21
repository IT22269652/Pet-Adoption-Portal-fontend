import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cart");
        const data = await response.json();
        console.log("Fetched cart data:", data); // Debug log
        if (response.ok) {
          // Ensure data is an array and contains populated post data
          const items = Array.isArray(data) ? data : [];
          setCartItems(items);
        } else {
          console.error("Failed to fetch cart items:", data.message || "No details");
        }
      } catch (error) {
        console.error("Network error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, []);

  const handleUnsave = async (cartId) => {
    console.log("Attempting to unsave cart item with ID:", cartId);
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${cartId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Unsave successful:", data);
        setCartItems(cartItems.filter((item) => item._id !== cartId));
      } else {
        console.error("Unsave failed:", data.message || "Unknown server error");
        alert(`Failed to unsave: ${data.message || "Please check server status"}`);
      }
    } catch (error) {
      console.error("Network error unsaving post:", error);
      alert("Network error. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Cart</h2>
      {cartItems.length > 0 ? (
        <div>
          <p>Debug: Found {cartItems.length} items</p> {/* Debug info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item) => {
              console.log("Rendering item:", item); // Debug log for each item
              // Construct image URL similar to Home.jsx
              const imageUrl = item.postId?.image
                ? item.postId.image.startsWith("http")
                  ? item.postId.image
                  : `http://localhost:5000${item.postId.image}`
                : "https://via.placeholder.com/200";
              return (
                <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={item.postId?.name || "Unknown"}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">
                      {item.postId?.name || "Unnamed Pet"}
                    </h3>
                    <p className="text-gray-600">Type: {item.postId?.type || "Unknown"}</p>
                    <p className="text-gray-600">Price: ${item.postId?.price || 0}</p>
                    <p className="text-gray-600 mt-2">
                      Description: {item.postId?.description || "No description"}
                    </p>
                    <button
                      onClick={() => handleUnsave(item._id)}
                      className="mt-4 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
                    >
                      Unsave
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-center py-10 text-gray-600">Your cart is empty.</p>
      )}
      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 mx-auto block"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Cart;