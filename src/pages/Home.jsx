import React, { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import axios from 'axios';
import QRCode from 'qrcode.react'; // You can use 'qrcode.react' library to generate QR codes
import PopularRoutes from '../components/PopularRoutes';
import { useRef } from 'react';

const HomePage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState("");
  const [seat, setSeat] = useState("");
  const searchFormRef = useRef(null);
  


  return (
    <div className="relative py-24 overflow-hidden bg-gray-700 isolate sm:py-32">
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
        <main className="flex flex-col items-center justify-center flex-1 p-4" ref={searchFormRef}>
          <div className="mb-8 text-center">
            <h1 className="font-extrabold text-white text-7xl">Welcome to RailWise</h1>
            <p className="mt-2 text-2xl text-white">Book your train tickets easily and quickly with our platform.</p>
          </div>
          <SearchForm departure={departure} arrival={arrival} date={date} seat={seat} />
          <div className="flex flex-col items-center mt-12">
            <h2 className="mb-4 text-3xl font-bold text-white">Install Our Mobile App</h2>
            <QRCode value="https://www.railwise.com/mobile-app" size={128} />
            <p className="mt-2 text-2xl text-white">Scan the QR code to download our mobile app.</p>
          </div>
          <PopularRoutes setDeparture={setDeparture} setArrival={setArrival} searchFormRef={searchFormRef} />

          <div className="w-max">
            <p className="items-center pr-5 mt-4 mb-4 overflow-hidden text-3xl font-extrabold text-center text-white border-r-2 border-black sm:font-extrabold sm:text-7xl animate-typing whitespace-nowrap md:text-4xl sm:text-center xl:my-10 xl:text-7xl" style={{ opacity: 1 }}>
              Book,Ride,Enjoy
            </p>
          </div>

          <div className="mt-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">Important Announcements</h2>
            <ul className="space-y-4">
              {announcements.map((announcement, index) => (
                <li key={index} className="p-4 bg-white rounded-lg shadow-md">
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
