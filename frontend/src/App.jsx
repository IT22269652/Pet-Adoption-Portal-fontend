import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './pages/User/Register';
import Login from './pages/User/Login';
import AdminLogin from './pages/Admin/AdminLogin';
import AddPost from './pages/Admin/AddPost';
import ManagePost from './pages/Admin/ManagePost';
import ManageUsers from './pages/Admin/ManageUsers';
import Profile from './pages/User/Profile';
import Cart from './components/Cart';
import Applicants from './pages/Admin/Applicants';

function App() {
  
  return (
    <Router>
      <Routes>
        {/* Routes with Navbar and Footer */}
        <Route
          path="/"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <Home />
              <Footer />
            </div>
          }
        />
        <Route
          path="/:type"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <Home />
              <Footer />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <Login />
              <Footer />
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <Register />
              <Footer />
            </div>
          }
        />
        <Route
          path="/profile"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <Profile />
              <Footer />
            </div>
          }
        />
         <Route
          path="/cart"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <Cart />
              <Footer />
            </div>
          }
        />
        <Route
          path="/admin-login"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <AdminLogin />
              <Footer />
            </div>
          }
        />
        
        
        {/* Add Post route without Navbar and Footer */}
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/manage-post" element={<ManagePost />} />
        <Route path="/applicants" element={<Applicants />} />
      </Routes>
    </Router>
  );
}

export default App;