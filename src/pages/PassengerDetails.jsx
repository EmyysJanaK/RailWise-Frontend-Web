import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReservationContext } from '../context/ReservationContext';
import { useEffect } from 'react';

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

  const handleInputChange = (index, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[index][field] = value;
    setPassengers(newPassengers);
  };

  const handleSubmit = () => {
    setReservationData(prevData => ({
      ...prevData,
      passengers,
      email,
    }));
    navigate('/reservationSummary');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Passenger Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Enter Passenger Information</h2>
        {passengers.map((passenger, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Passenger {index + 1}</h3>
            <div className="flex space-x-4">
              <input
                type="text"
                className="form-input w-full"
                placeholder="First Name"
                value={passenger.firstName}
                onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
              />
              <input
                type="text"
                className="form-input w-full"
                placeholder="Last Name"
                value={passenger.lastName}
                onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
              />
              <input
                type="date"
                className="form-input w-full"
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
            className="form-input w-full"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PassengerDetails;
