import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../utils/validation";
import useAuth from "../hooks/useAuth";
import Breadcrumbs from "../components/Breadcrumbs";
import trainImage from "../assets/trainImage.png";
import { UserContext } from "../context/UserContext";
import { validateEmail } from "../utils/emailValidation";

function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const { register: registerUser, error } = useAuth();
  const [prevLocation, setPrevLocation] = useState("/");
  const { userData } = useContext(UserContext);
  const [emailError, setEmailError] = useState(""); // State to store email validation error

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  if (userData) {
    navigate("/");
  }

  useEffect(() => {
    if (location.state && location.state.from) {
      setPrevLocation(location.state.from.pathname);
    }
  }, [location]);

  const onSubmit = async (data) => {
    const isEmailValid = await validateEmail(data.email, setEmailError);

    if (!isEmailValid) {
      return; // Stop form submission if email is invalid
    }

    const success = await registerUser(data);

    if (success) {
      navigate(prevLocation, { replace: true });
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md p-8 mx-auto my-12 bg-white rounded-lg shadow-lg">
      <div className="flex justify-center mb-6">
        <img src={trainImage} alt="Railwise Logo" className="w-40 h-40" />
      </div>
      <h1 className="mb-4 text-3xl font-extrabold text-center text-gray-900">
        Railwise Register
      </h1>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      {emailError && <div className="mb-4 text-red-600">{emailError}</div>}{" "}
      {/* Display email validation error */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Username Input */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Username</label>
          <input
            type="text"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
              errors.username ? "border-red-500" : ""
            }`}
            {...register("username")}
            required
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-500">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Email</label>
          <input
            type="email"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
              errors.email ? "border-red-500" : ""
            }`}
            {...register("email")}
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Input */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Phone</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-gray-700 bg-gray-200 border border-r-0 rounded-l-lg">
              +94
            </span>
            <input
              type="tel"
              className={`w-full px-4 py-2 border rounded-r-lg focus:outline-none focus:border-blue-500 ${
                errors.phone ? "border-red-500" : ""
              }`}
              {...register("phone")}
              required
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            type="password"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
              errors.password ? "border-red-500" : ""
            }`}
            {...register("password")}
            required
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 mt-2 text-white transition duration-200 bg-purple-600 rounded shadow-sm hover:bg-purple-700"
        >
          Register
        </button>
      </form>
      <div className="mt-4">
        <span className="text-gray-600">Already have an account?</span>
        <Link to="/login" className="ml-2 text-blue-500">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
