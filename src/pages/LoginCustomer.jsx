import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import trainImage from "../assets/trainImage.png"; 

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("HomePage");

  useEffect(() => {
    if (location.state && location.state.data) {
      setPrevLocation(location.state.data);
    }
  }, [location]);

  return (
    <div className="relative max-w-container mx-auto px-4 py-8">
      {/* Background Image */}
      <img
        src={trainImage}
        alt="Train Background"
        className="absolute inset-0 w-full h-full object-cover opacity-10 z-0"
      />
      <div className="relative z-10">
        {/* Breadcrumbs */}
        <Breadcrumbs title="About" prevLocation={prevLocation} />

        {/* Main Content */}
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">About RailWise</h1>
          <p className="max-w-[600px] text-lg text-gray-700 mb-6 leading-relaxed">
            RailWise is a state-of-the-art train system that connects cities and regions with speed and efficiency. With a focus on safety and comfort, RailWise offers a seamless travel experience for passengers.
          </p>
          <p className="max-w-[600px] text-lg text-gray-700 mb-6 leading-relaxed">
            Our modern trains are equipped with the latest technology to ensure punctuality and convenience. We prioritize the comfort and satisfaction of our passengers, providing top-notch services and amenities.
          </p>
          <p className="max-w-[600px] text-lg text-gray-700 mb-6 leading-relaxed">
            RailWise is committed to sustainability and reducing our environmental impact. Our trains are energy-efficient and we continuously work towards greener practices.
          </p>

          {/* Customer Login and Interaction */}
          <div className="flex items-center justify-center mt-8">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-semibold text-blue-800 mb-2">Customer Login</h2>
              <p className="text-lg text-gray-700 mb-4 text-center">
                Log in to RailWise to access exclusive services and personalized features.
              </p>
              <Link to="/Login">
                <button className="w-52 h-12 bg-blue-600 text-white hover:bg-blue-700 duration-300 rounded-full shadow-lg transform hover:scale-105 transition-transform">
                  Log In
                </button>
              </Link>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <Link to="/Services">
              <button className="w-52 h-12 bg-blue-600 text-white hover:bg-blue-700 duration-300 rounded-full shadow-lg transform hover:scale-105 transition-transform">
                Explore Our Services
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
