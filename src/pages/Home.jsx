import React, { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import axios from 'axios';
import QRCode from 'qrcode.react'; // You can use 'qrcode.react' library to generate QR codes
import PopularRoutes from '../components/PopularRoutes';

const HomePage = () => {
  const [announcements, setAnnouncements] = useState([]);


  return (
    <div className="relative isolate overflow-hidden bg-gray-700 py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div className="relative z-10 flex-1">
        <main className="flex flex-col items-center justify-center flex-1 p-4">
          <div className="text-center mb-8">
            <h1 className="text-7xl font-extrabold text-white">Welcome to RailWise</h1>
            <p className="text-2xl text-white mt-2">Book your train tickets easily and quickly with our platform.</p>
          </div>
          <SearchForm />
          <div className="mt-12 flex flex-col items-center">
            <h2 className="text-3xl font-bold text-white mb-4">Install Our Mobile App</h2>
            <QRCode value="https://www.railwise.com/mobile-app" size={128} />
            <p className="text-2xl text-white mt-2">Scan the QR code to download our mobile app.</p>
          </div>
          <PopularRoutes />

          <div className="w-max">
            <p className="font-extrabold text-3xl  text-white text-center sm:font-extrabold sm:text-7xl animate-typing overflow-hidden whitespace-nowrap border-r-2 border-black pr-5 mb-4 mt-4 md:text-4xl items-center sm:text-center xl:my-10 xl:text-7xl" style={{ opacity: 1 }}>
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
