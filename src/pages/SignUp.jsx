import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import trainImage from "../assets/trainImage.png"; 
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import useFormInput from "../hooks/useFormInput";
import useAuth from "../hooks/useAuth";

const SignUp = () => {
  const location = useLocation();
  const { register, error } = useAuth();
  const [prevLocation, setPrevLocation] = useState("HomePage");
  const username = useFormInput("");
  const email = useFormInput("");
  const phone = useFormInput("");
  const password = useFormInput("");
  const confirmPassword = useFormInput("");

  useEffect(() => {
    if (location.state && location.state.data) {
      setPrevLocation(location.state.data);
    }
  }, [location]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password.value !== confirmPassword.value) {
      alert("Passwords do not match");
      return;
    }

    await register({
      username: username.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
    });
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
          <TextInput label="Username" {...username} />
          <TextInput label="Email" type="email" {...email} />
          <TextInput label="Phone" type="tel" {...phone} />
          <PasswordInput label="Password" {...password} />
          <PasswordInput label="Confirm Password" {...confirmPassword} />
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
