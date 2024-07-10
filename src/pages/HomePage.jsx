import React, { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import axios from 'axios';
import QRCode from 'qrcode.react'; // You can use 'qrcode.react' library to generate QR codes
import PopularRoutes from '../components/PopularRoutes';

const HomePage = () => {
  const [announcements, setAnnouncements] = useState([]);

  // useEffect(() => {
  //   // Fetch popular routes
  //   axios.get('/api/popular-routes')
  //     .then(response => setPopularRoutes(response.data))
  //     .catch(error => console.error('Error fetching popular routes:', error));

  //   // Fetch announcements
  //   axios.get('/api/announcements')
  //     .then(response => setAnnouncements(response.data))
  //     .catch(error => console.error('Error fetching announcements:', error));
  // }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-100">
      <div className="relative z-10 flex-1">
        <main className="flex flex-col items-center justify-center flex-1 p-4">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-extrabold text-gray-900">Welcome to RailWise</h1>
            <p className="text-xl text-gray-700 mt-2">Book your train tickets easily and quickly with our platform.</p>
          </div>
          <SearchForm />
          <div className="mt-12 flex flex-col items-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Install Our Mobile App</h2>
            <QRCode value="https://www.railwise.com/mobile-app" size={128} />
            <p className="text-lg text-gray-700 mt-2">Scan the QR code to download our mobile app.</p>
          </div>
          <PopularRoutes />

          <div className="w-max">
            <p className="font-extrabold text-2xl text-center sm:font-extrabold sm:text-7xl animate-typing overflow-hidden whitespace-nowrap border-r-2 border-black pr-5 mb-4 mt-4 md:text-4xl items-center sm:text-center xl:my-10 xl:text-7xl" style={{ opacity: 1 }}>
              Book,Ride,Enjoy
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Important Announcements</h2>
            <ul className="space-y-4">
              {announcements.map((announcement, index) => (
                <li key={index} className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold text-gray-800">{announcement.title}</h3>
                  <p className="text-gray-600">{announcement.content}</p>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
