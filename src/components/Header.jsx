import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for routing

const Header = () => {
  return (
    <header className="bg-[#003d91] text-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src="/Screenshot 2024-07-29 214710.png" alt="Airline Logo" className="h-10" /> {/* Replace with actual logo path */}
        <h1 className="ml-4 text-xl font-semibold">Flight Status</h1>
      </div>
      <nav className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
      </nav>
    </header>
  );
};

export default Header;
