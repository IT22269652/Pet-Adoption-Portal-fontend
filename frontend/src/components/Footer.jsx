import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-400 py-4 mt-auto">
      <div className="container mx-auto text-center px-4">
        <p className="text-gray-800">&copy; {new Date().getFullYear()} DreamPet. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;