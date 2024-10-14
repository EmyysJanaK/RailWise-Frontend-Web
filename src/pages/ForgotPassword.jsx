import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { z } from "zod";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Zod schema for email validation
  const emailSchema = z.string().email({ message: "Invalid email address" });

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Validate email using Zod
    const validationResult = emailSchema.safeParse(email);

    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/forgotPassword`,
        { email }
      );
      setMessage("A password reset link has been sent to your email.");
    } catch (error) {
      setError("Failed to send the reset link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md p-8 mx-auto my-12 bg-white rounded-lg shadow-lg">
      <h1 className="mb-4 text-3xl font-extrabold text-center text-gray-900">
        Forgot Password
      </h1>
      {message && <div className="mb-4 text-green-600">{message}</div>}
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleForgotPassword}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Enter your email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 text-gray-900 bg-gray-100 border rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 text-white transition duration-200 bg-purple-600 rounded shadow-sm ${
            isLoading ? "cursor-not-allowed" : "hover:bg-purple-700"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Sending Email..." : "Send Reset Link"}
        </button>
      </form>
      <div className="mt-4">
        <Link to="/login" className="text-blue-500">
          Back to Login
        </Link>
      </div>
    </div>
  );
}
