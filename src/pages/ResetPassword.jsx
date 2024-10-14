import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import PasswordInput from "../components/PasswordInput";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // Ensure passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/resetPassword`,
        {
          resetToken: token,
          newPassword: password,
        }
      );
      setMessage("Password has been successfully reset.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="relative z-10 w-full max-w-md p-8 mx-auto my-12 bg-white rounded-lg shadow-lg">
      <h1 className="mb-4 text-3xl font-extrabold text-center text-gray-900">
        Reset Password
      </h1>
      {message && <div className="mb-4 text-green-600">{message}</div>}
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleResetPassword}>
        <PasswordInput
          label="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <PasswordInput
          label="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full py-2 text-white transition duration-200 bg-purple-600 rounded shadow-sm hover:bg-purple-700"
        >
          Reset Password
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
