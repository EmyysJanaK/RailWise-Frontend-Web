import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReservationContext } from "../context/ReservationContext";
import { z } from "zod";
import SeatSelection from "./SeatSelection";

const emailSchema = z.string().email();

const PassengerDetails = () => {
  const { reservationData, setReservationData } = useContext(ReservationContext);
  const navigate = useNavigate();
  const { departureStationId, arrivalStationId, departureDate, selectedClassId } = reservationData;

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const validateEmail = (emailaddr) => {
    try {
      emailSchema.parse(emailaddr);
      setError("");
      return true;
    } catch {
      setError("Invalid email address");
      return false;
    }
  };

  const validateForm = () => {
    if (!email) {
      setError("Email is required");
      return false;
    }
    if (!validateEmail(email)) {
      return false;
    }
    setError("");
    return true;
  };

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [email]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    if (isFormValid) {
      setReservationData((prevData) => ({
        ...prevData,
        email,
      }));
      setSuccess("Details submitted successfully!");
      navigate("/reservationSummary");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Seat Selection and Email
      </h1>
      <SeatSelection />
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Enter Email for Ticket</h2>
        <div className="mb-4">
          <input
            type="email"
            className="form-input mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => validateEmail(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400 transition duration-300"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className={`bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300 ${
            !isFormValid ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isFormValid}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PassengerDetails;
