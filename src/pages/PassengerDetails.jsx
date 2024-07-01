import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReservationContext } from '../context/ReservationContext';

const PassengerDetails = () => {
  const { reservationData, setReservationData } = useContext(ReservationContext);
  const navigate = useNavigate();
  const { pax, departureStationId, arrivalStationId, departureDate, selectedClass } = reservationData;

  useEffect(() => {
    if (!departureStationId || !arrivalStationId || !departureDate || !selectedClass) {
      navigate('/');
    }
  }, [departureStationId, arrivalStationId, departureDate, selectedClass, navigate]);

  const [passengers, setPassengers] = useState(
    Array(pax).fill({ firstName: '', lastName: '', dob: '' })
  );
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (index, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[index][field] = value;
    setPassengers(newPassengers);
  };

  const validateForm = () => {
    for (const passenger of passengers) {
      if (!passenger.firstName || !passenger.lastName || !passenger.dob) {
        setError('All fields are required for all passengers');
        return false;
      }
    }
    if (!email) {
      setError('Email is required');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setReservationData(prevData => ({
        ...prevData,
        passengers,
        email,
      }));
      setSuccess('Passenger details submitted successfully!');
      navigate('/reservationSummary');
    }
  };

  return (
    <div className="container mx-auto p-">
      <h1 className="text-3xl font-bold mb-4 text-white">Passenger Details</h1>
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4">Enter Passenger Information</h2>
        {passengers.map((passenger, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xlg font-semibold mb-2">Passenger {index + 1}</h3>
            <div className="flex space-x-4">
              <input
                type="text"
                className="form-input w-full bg-gray-700 text-white border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500"
                placeholder="First Name"
                value={passenger.firstName}
                onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
              />
              <input
                type="text"
                className="form-input w-full bg-gray-700 text-white border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500"
                placeholder="Last Name"
                value={passenger.lastName}
                onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
              />
              <input
                type="date"
                className="form-input w-full bg-gray-700 text-white border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500"
                placeholder="Date of Birth"
                value={passenger.dob}
                onChange={(e) => handleInputChange(index, 'dob', e.target.value)}
              />
            </div>
          </div>
        ))}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Email for Ticket</h3>
          <input
            type="email"
            className="form-input w-full bg-gray-700 text-white border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleSubmit}
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PassengerDetails;
