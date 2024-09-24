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

        <div className="mb-4">
          <Link to="/forgot-password" className="text-blue-500">
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

