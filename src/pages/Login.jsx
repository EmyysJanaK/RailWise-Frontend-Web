import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import trainImage from "../assets/trainImage.png";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import useFormInput from "../hooks/useFormInput";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const location = useLocation();
  const { loginUser, error } = useAuth();
  const [prevLocation, setPrevLocation] = useState("HomePage");
  const username = useFormInput("");
  const password = useFormInput("");

  useEffect(() => {
    if (location.state && location.state.data) {
      setPrevLocation(location.state.data);
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginUser({
      emailOrUsername: username.value,
      password: password.value,
    });
  };

  return (
<<<<<<< HEAD
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
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#75113a] to-[#9490e2] opacity-60"
        />
      </div>
      <div className="relative z-10 w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            RAILWISE LOGIN
          </h2>
        <div className="flex justify-center mb-8">
          <img
            src={trainImage}
            alt="Railwise Logo"
            className="w-40 h-40"
          />
        </div>
        
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <form onSubmit={handleLogin}>
          
          <TextInput label="Username" {...username} />
          <PasswordInput label="Password" {...password} />
=======
    <div className="relative z-10 w-full max-w-md p-8 mx-auto my-12 bg-white rounded-lg shadow-lg">
      {/* <Breadcrumbs title="Login" prevLocation={prevLocation} /> */}
      <div className="flex justify-center mb-6">
        <img src={trainImage} alt="Railwise Logo" className="w-40 h-40" />
      </div>
      <h1 className="mb-4 text-3xl font-extrabold text-center text-gray-900">
        Railwise Login
      </h1>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleLogin}>
        <TextInput label="Username or Email" {...username} />
        <PasswordInput label="Password" {...password} />
>>>>>>> a8740e7dfa53d714ab18e78e2073d39512b2b675

        <div className="mb-4">
          <Link to="/ForgotPassword" className="text-blue-500">
            Forgot Password?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full py-2 text-white transition duration-200 bg-purple-600 rounded shadow-sm hover:bg-purple-700"
        >
          Login
        </button>
      </form>
      <div className="mt-4">
        <span className="text-gray-600">Don't have an account?</span>
        <Link to="/register" className="ml-2 text-blue-500">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;

