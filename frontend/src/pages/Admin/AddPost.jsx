import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
    image: null,
    description: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.type || !formData.price || !formData.description) {
      setError("All fields except image are required.");
      return;
    }

    // Name validation (letters and spaces only, min 2 characters)
    if (!/^[a-zA-Z\s]{2,}$/.test(formData.name)) {
      setError("Name must contain only letters and be at least 2 characters long.");
      return;
    }

    // Type validation (must be a valid non-empty option)
    if (formData.type === "") {
      setError("Please select a valid pet type.");
      return;
    }

    // Price validation (must be a positive number)
    if (isNaN(formData.price) || Number(formData.price) <= 0) {
      setError("Price must be a positive number.");
      return;
    }

    // Description validation (min 10 characters)
    if (formData.description.length < 10) {
      setError("Description must be at least 10 characters long.");
      return;
    }

    // Image validation (optional, checks file type if provided)
    if (formData.image && !["image/jpeg", "image/png", "image/jpg"].includes(formData.image.type)) {
      setError("Image must be a JPEG, JPG, or PNG file.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("type", formData.type);
    data.append("price", formData.price);
    data.append("image", formData.image);
    data.append("description", formData.description);

    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      if (response.ok) {
        navigate("/manage-post");
      } else {
        setError(result.message || "Failed to add post.");
      }
    } catch (error) {
      setError("Network error. Please try again later.");
      console.error("Add post error:", error);
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
      {/* Main Content - Add Post Form */}
      <div className="w-4/5 p-6">
        <h2 className="text-2xl font-bold mb-4">Add New Post</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md" encType="multipart/form-data">
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded-lg" placeholder="Enter pet name" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Type</label>
            <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded-lg">
              <option value="">Select Type</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Rabbit">Rabbit</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded-lg" placeholder="Enter price" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image Upload</label>
            <input type="file" name="image" onChange={handleChange} className="w-full p-2 border rounded-lg" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded-lg" placeholder="Enter description"></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;