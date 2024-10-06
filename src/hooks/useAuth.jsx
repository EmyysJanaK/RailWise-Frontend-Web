import { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const register = async ({ username, email, phone, password }) => {
    try {
      const response = await axios.post("/api/user/register", {
        username,
        email,
        phone,
        password,
      }, { withCredentials: true });

      if (response.status === 200) {
        login(response.data);
        return true;
      }
    } catch (error) {
      setError(error.response.data.message || "Registration failed");
    }
  };

  const loginUser = async ({ emailOrUsername, password }) => {
    try {
      const response = await axios.post("/api/user/login", {
        emailOrUsername,
        password,
      }, { withCredentials: true });

      if (response.status === 200) {
        login(response.data);
        return true;
      }
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return {
    register,
    loginUser,
    error,
  };
};

export default useAuth;
