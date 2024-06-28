import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PassengerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // const departureStationId = queryParams.get('departureStationId');
  // const arrivalStationId = queryParams.get('arrivalStationId');
  // const departureDate = queryParams.get('departureDate');
  // const selectedClass = queryParams.get('selectedClass');
  const pax = parseInt(queryParams.get('pax'), 10);

  const [passengers, setPassengers] = useState(Array(pax).fill({ firstName: '', lastName: '', dob: '' }));
  const [email, setEmail] = useState('');

  const handleInputChange = (index, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[index][field] = value;
    setPassengers(newPassengers);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    // Handle the submission of passenger details
    console.log('Passengers:', passengers);
    console.log('Email:', email);
    // Navigate to a confirmation or success page if needed
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
        <button onClick={handleBack} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">Back</button>
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Submit</button>
      </div>
    </div>
  );
};

export default PassengerDetails;
