import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Stations = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("HomePage");

  useEffect(() => {
    if (location.state && location.state.data) {
      setPrevLocation(location.state.data);
    }
  }, [location]);

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
      />
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
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Train Booking System
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Book your train tickets easily and conveniently. Explore various
            routes and enjoy a comfortable journey.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-bold leading-9 tracking-tight text-white">
                Train Visuals
              </h3>
              <p className="mt-4 text-center text-gray-300">
                Experience the beauty of train journeys through stunning visuals.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-bold leading-9 tracking-tight text-white">
                Features
              </h3>
              <p className="mt-4 text-center text-gray-300">
                Enjoy a range of features including real-time tracking, easy cancellations, and more.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-bold leading-9 tracking-tight text-white">
                Testimonials
              </h3>
              <p className="mt-4 text-center text-gray-300">
                Hear from our satisfied customers about their experiences.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-bold leading-9 tracking-tight text-white">
                Contact Us
              </h3>
              <p className="mt-4 text-center text-gray-300">
                Have questions? Get in touch with our support team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stations;