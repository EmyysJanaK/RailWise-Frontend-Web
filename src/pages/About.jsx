import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import trainImage from "../assets/trainImage.png";


const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("HomePage");

  useEffect(() => {
    console.log("Location state:", location.state)
    if (location.state && location.state.data) {
      setPrevLocation(location.state.data);
    }
  }, [location]);

  return (
    <div className="relative max-w-container mx-auto px-4 py-8">
      <img src={trainImage} alt="Train Background" className="absolute inset-0 w-full h-full object-cover opacity-10 z-0" />
      <div className="relative z-10">
        <Breadcrumbs title="About" prevLocation={prevLocation} />
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-blue-800 mb-6">About RailWise</h1>
          <p className="max-w-[600px] text-lg text-gray-700 mb-6 leading-relaxed">
            RailWise is a state-of-the-art train system that connects cities and regions with speed and efficiency. With a focus on safety and comfort, RailWise offers a seamless travel experience for passengers.
          </p>
          <p className="max-w-[600px] text-lg text-gray-700 mb-6 leading-relaxed">
            Our modern trains are equipped with the latest technology to ensure punctuality and convenience. We prioritize the comfort and satisfaction of our passengers, providing top-notch services and amenities.
          </p>
          <p className="max-w-[600px] text-lg text-gray-700 mb-6 leading-relaxed">
            RailWise is committed to sustainability and reducing our environmental impact. Our trains are energy-efficient, and we continuously work towards greener practices.
          </p>
          <Link to="/Services">
            <button className="w-52 h-12 bg-blue-600 text-white hover:bg-blue-700 duration-300 rounded-full shadow-lg transform hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Explore Our Services
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
