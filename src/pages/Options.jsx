import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Options = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const departureStationId = queryParams.get('departureStationId');
  const arrivalStationId = queryParams.get('arrivalStationId');
  const departureDate = queryParams.get('departureDate');
  const pax = queryParams.get('pax');


  const [selectedClass, setSelectedClass] = useState('2nd Class');

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    const newUrl = `/passenger-details?departureStationId=${departureStationId}&arrivalStationId=${arrivalStationId}&departureDate=${departureDate}&adults=${pax}`;
    navigate(newUrl);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Train Options</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-2">Selected Train Information</h2>
        <div>
          <p><strong>Departure Station ID:</strong> {departureStationId}</p>
          <p><strong>Arrival Station ID:</strong> {arrivalStationId}</p>
          <p><strong>Departure Date:</strong> {departureDate}</p>
          <p><strong>Passengers:</strong> {pax}</p>

        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-2">Select Class</h2>
        <div className="flex flex-col space-y-4">
          <label className="inline-flex items-center">
            <input type="radio" className="form-radio" name="class" value="2nd Class" checked={selectedClass === '2nd Class'} onChange={handleClassChange} />
            <span className="ml-2">2nd Class</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" className="form-radio" name="class" value="Premium" checked={selectedClass === 'Premium'} onChange={handleClassChange} />
            <span className="ml-2">Premium</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" className="form-radio" name="class" value="1st Class" checked={selectedClass === '1st Class'} onChange={handleClassChange} />
            <span className="ml-2">1st Class</span>
          </label>
          <label className="inline-flex items-center">
            <input type="radio" className="form-radio" name="class" value="VIP" checked={selectedClass === 'VIP'} onChange={handleClassChange} />
            <span className="ml-2">VIP</span>
          </label>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={handleBack} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">Back</button>
        <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Next</button>
      </div>
    </div>
  );

};

export default Options;
