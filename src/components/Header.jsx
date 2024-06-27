// src/components/Header.jsx
import React from 'react';

const Header = () => {
  const handleTicketClick = () => {
    // Redirect to the ticket page
    history.push('/ticket');

  };

  return (
    <header className="header bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-4xl font-bold text-yellow-500">Train Booking System</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#" className="hover:underline text-yellow-500">Home</a></li>
          <li><a href="#" className="hover:underline text-yellow-500">About</a></li>
          <li><a href="#" className="hover:underline text-yellow-500" onClick={handleTicketClick}>Tickets</a></li>
          <li><a href="#" className="hover:underline text-yellow-500">Stations</a></li>
          <li><a href="#" className="hover:underline text-yellow-500">Train Status</a></li>
        </ul>
      </nav>
      <div>
        <button className="bg-yellow-500 text-blue-600 px-4 py-2 rounded">Login</button>
      </div>
      <div className="shapes">
        <div className="circle"></div>
        <div className="square"></div>
        <div className="triangle"></div>
      </div>
    </header>
  );
};

export default Header;
