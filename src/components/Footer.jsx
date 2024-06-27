// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-gray-800 text-white p-4 text-center">
      <div>
        <h3>Contact Us</h3>
        <p>Email: info@railwise.com</p>
        <p>Phone: 123-456-7890</p>
      </div>
      <div>
        <h3>Follow Us</h3>
        <ul>
          <li>Twitter</li>
          <li>Facebook</li>
          <li>Instagram</li>
        </ul>
      </div>
      <p style={{ fontSize: '20px', fontStyle: 'italic' }}>&copy; 2024 Train Booking System</p>
    </footer>
  );
};

export default Footer;
