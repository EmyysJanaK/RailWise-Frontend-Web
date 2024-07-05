import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReservationContext } from "../context/ReservationContext";
import { z } from "zod";
import ToggleSidePane from "../components/ToggleSidePane";

const emailSchema = z.string().email();

const PassengerDetails = () => {
  const { reservationData, setReservationData } = useContext(ReservationContext);
  const navigate = useNavigate();
  const {
    pax,
    departureStationId,
    arrivalStationId,
    departureDate,
    selectedClass,
  } = reservationData;

  useEffect(() => {
    if (
      !departureStationId ||
      !arrivalStationId ||
      !departureDate ||
      !selectedClass
    ) {
      navigate("/");
    }
  }, [departureStationId, arrivalStationId, departureDate, selectedClass, navigate]);

  const [passengers, setPassengers] = useState(
    Array.from({ length: pax }, () => ({ firstName: "", lastName: "", dob: "", gender: "" }))
  );
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (index, field, value) => {
    const newPassengers = passengers.map((passenger, i) => 
      i === index ? { ...passenger, [field]: value } : passenger
    );
    setPassengers(newPassengers);
  };

  const validateForm = () => {
    for (const passenger of passengers) {
      if (!passenger.firstName || !passenger.lastName || !passenger.dob || !passenger.gender) {
        setError("All fields are required for all passengers");
        return false;
      }
      if (new Date(passenger.dob) >= new Date()) {
        setError("Date of birth cannot be in the future");
        return false;
      }
    }
    setError("");
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setReservationData((prevData) => ({
        ...prevData,
        passengers,
        email,
      }));
      setSuccess("Passenger details submitted successfully!");
      navigate("/reservationSummary");
    }
  };

  const validateEmail = (emailaddr) => {
    setEmail(emailaddr);
    try {
      emailSchema.parse(emailaddr);
      setError("");
    } catch {
      setError("Invalid email address");
    }
  };

  return (
    <div className="relative h-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        Passenger Details
      </h1>
      <ToggleSidePane />
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h2 className="text-3xl font-bold mb-6">Enter Passenger Information</h2>
        {passengers.map((passenger, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-2xl font-semibold mb-4">Passenger {index + 1}</h3>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <input
                type="text"
                className="form-input mt-1 p-2 w-full border border-gray-300 rounded-md mb-2 md:mb-0"
                placeholder="First Name"
                value={passenger.firstName}
                onChange={(e) => handleInputChange(index, "firstName", e.target.value)}
              />
              <input
                type="text"
                className="form-input mt-1 p-2 w-full border border-gray-300 rounded-md mb-2 md:mb-0"
                placeholder="Last Name"
                value={passenger.lastName}
                onChange={(e) => handleInputChange(index, "lastName", e.target.value)}
              />
              <select
                className="form-select mt-1 p-2 w-full border border-gray-300 rounded-md mb-2 md:mb-0"
                value={passenger.gender}
                onChange={(e) => handleInputChange(index, "gender", e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="date"
                className="form-input mt-1 p-2 w-full border border-gray-300 rounded-md"
                value={passenger.dob}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => handleInputChange(index, "dob", e.target.value)}
              />
            </div>
          </div>
        ))}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4">Email for Ticket</h3>
          <input
            type="email"
            className="form-input mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Email"
            value={email}
            onChange={(e) => validateEmail(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className={`bg-purple-500 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition duration-300 ${
            error ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={error}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PassengerDetails;
