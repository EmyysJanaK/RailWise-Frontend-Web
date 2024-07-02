// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-2">Contact Us</h3>
          <p>Email: <a href="mailto:info@railwise.com" className="text-blue-400 hover:underline">info@railwise.com</a></p>
          <p>Phone: <a href="tel:123-456-7890" className="text-blue-400 hover:underline">123-456-7890</a></p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Follow Us</h3>
          <ul className="space-y-2">
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">About Us</h3>
          <p>RailWise is dedicated to providing the best train travel experience, connecting cities and regions with speed and efficiency. Our commitment to safety, comfort, and sustainability ensures a superior journey for all passengers.</p>
        </div>
      </div>
      <div className="container mx-auto mt-8 text-center border-t border-gray-700 pt-4">
        <p className="text-sm" style={{ fontSize: '20px', fontStyle: 'italic' }}>&copy; 2024 Train Booking System</p>
      </div>
    </footer>
  );
};

export default Footer;
