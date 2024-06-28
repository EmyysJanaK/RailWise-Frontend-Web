import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import trainImage from "../assets/trainImage.png"; 

const Login = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("HomePage");

  useEffect(() => {
    if (location.state && location.state.data) {
      setPrevLocation(location.state.data);
    }
  }, [location]);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-100">
      {/* Background Image */}
      <img
        src={trainImage}
        alt="Train Background"
        className="absolute inset-0 w-full h-full object-cover opacity-10 z-0"
      />
      <div className="relative z-10 w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Breadcrumbs */}
        <Breadcrumbs title="Login" prevLocation={prevLocation} />
      <div className="flex justify-center mb-8">
        <img
          src={trainImage}
          alt="Railwise Logo"
          className="w-20 h-20"
        />
      </div>

      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Railwise Login
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">USERNAME</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700">PASSWORD</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button type="button" className="absolute right-2 top-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.875 18.825a10.05 10.05 0 01-3.75 0M12 4.75v.01M21.95 8.538a7.5 7.5 0 00-2.8-3.487M3.05 8.538a7.5 7.5 0 012.8-3.487M4.075 19.528a7.5 7.5 0 002.8 3.487m10.25-3.487a7.5 7.5 0 01-2.8 3.487M16.9 7.862a3 3 0 11-5.8 0m0 0a7.5 7.5 0 00-2.8-3.487m8.6 3.487a7.5 7.5 0 00-2.8-3.487"
                />
              </svg>
            </button>
          </div>
          <div className="mb-6 text-right">
            <Link to="/forgot-password" className="text-blue-500">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-600">Don't you have an account?</span>
          <Link to="/SignUp" className="text-blue-500 ml-2">
            Sign Up
          </Link>
        </div>



      
        

        

      </div>
    </div>
  );
};

export default Login;
