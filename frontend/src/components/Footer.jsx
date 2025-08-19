import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white py-4 mt-auto">
      <div className="container mx-auto text-center px-4">
        <p className="text-gray-600">&copy; {new Date().getFullYear()} DreamDog. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;