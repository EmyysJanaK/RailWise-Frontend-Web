import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import trainImage from "../assets/trainImage.png"; 
import axios from "axios";
import { UserContext } from "../context/UserContext";

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [prevLocation, setPrevLocation] = useState("HomePage");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (location.state && location.state.data) {
      setPrevLocation(location.state.data);
    }
  }, [location]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/user/register", {
        username,
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
      }, { withCredentials: true });

      if (response.status === 200) {
        // Save user data to localStorage and context
        login(response.data);
        // Navigate to the home page
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message || "Registration failed");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="absolute inset-0 bg-purple-900 opacity-75"></div>
      <div className="relative z-10 w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <Breadcrumbs title="SignUp" prevLocation={prevLocation} />
        <div className="flex justify-center mb-8">
          <img
            src={trainImage}
            alt="Railwise Logo"
            className="w-20 h-20"
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          SL Railway Sign Up
        </h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-700">USERNAME</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">FIRST NAME</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">LAST NAME</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">EMAIL</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">PHONE</label>
            <input
              type="tel"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">GENDER</label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700">PASSWORD</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
          <div className="mb-6">
            <label className="block text-gray-700">CONFIRM PASSWORD</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-600">Already have an account?</span>
          <Link to="/Login" className="text-blue-500 ml-2">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
