import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import trainImage from "../assets/trainImage.png";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import useFormInput from "../hooks/useFormInput";
import useAuth from "../hooks/useAuth";

function Register() {
  const location = useLocation();
  const { register, error } = useAuth();
  const [prevLocation, setPrevLocation] = useState("HomePage");
  const navigate = useNavigate();
  const username = useFormInput("");
  const email = useFormInput("");
  const phone = useFormInput("");
  const password = useFormInput("");

  useEffect(() => {
    if (location.state && location.state.data) {
      setPrevLocation(location.state.data);
    }
  }, [location]);

  const handleRegister = async (e) => {
    e.preventDefault();

    await register({
      username: username.value,
      email: email.value,
      phone: phone.value,
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
        Railwise Register
      </h1>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleRegister}>
        <TextInput label="Username" {...username} />
        <TextInput label="Email" type="email" {...email} />
        <TextInput label="Phone" type="tel" {...phone} />
        <PasswordInput label="Password" {...password} />
        <button
          type="submit"
          className="w-full py-2 mt-2 text-white transition duration-200 bg-purple-600 rounded shadow-sm hover:bg-purple-700"
        >
          Register
        </button>
      </form>
      <div className="mt-4">
        <span className="text-gray-600">Already have an account?</span>
        <Link to="/Login" className="ml-2 text-blue-500">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
