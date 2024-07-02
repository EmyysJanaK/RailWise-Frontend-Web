import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchForm = () => {
  const [searchParams, setSearchParams] = useState({
    departure: '',
    arrival: '',
    date: '',
    seat: '',
  });
  const [stations, setStations] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);
  const [trainData, setTrainData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStations = async () => {
      try {
        const response = await axios.get('/api/stations');
        setStations(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getStations();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'departure' || name === 'arrival') {
      setFilteredStations(
        stations.filter((station) =>
          station.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const handleStationClick = (name, station) => {
    setSearchParams((prevState) => ({
      ...prevState,
      [name]: station,
    }));
    setFilteredStations([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for trains:', searchParams);
    fetchTrainData();
  };

  const fetchTrainData = () => {
    setLoading(true);
    setError(null);
    axios
      .get('/api/stations', { params: searchParams })
      .then((response) => {
        setTrainData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching train data');
        setLoading(false);
      });
  };

  return (
    <form className="search-form bg-purple-900 p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="relative">
          <input
            type="text"
            name="departure"
            placeholder="Departure Station"
            value={searchParams.departure}
            onChange={handleInputChange}
            className="w-full p-3 border rounded text-xl"
            style={{ fontSize: '1.4rem', height: '3.5rem' }}
          />
          {filteredStations.length > 0 && (
            <ul className="absolute z-10 bg-white border rounded mt-1 w-full max-h-40 overflow-y-auto">
              {filteredStations.map((station) => (
                <li
                  key={station}
                  onClick={() => handleStationClick('departure', station)}
                  className="p-3 cursor-pointer hover:bg-gray-200"
                >
                  {station}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="relative">
          <input
            type="text"
            name="arrival"
            placeholder="Arrival Station"
            value={searchParams.arrival}
            onChange={handleInputChange}
            className="w-full p-3 border rounded text-xl"
            style={{ fontSize: '1.4rem', height: '3.5rem' }}
          />
          {filteredStations.length > 0 && (
            <ul className="absolute z-10 bg-white border rounded mt-1 w-full max-h-40 overflow-y-auto">
              {filteredStations.map((station) => (
                <li
                  key={station}
                  onClick={() => handleStationClick('arrival', station)}
                  className="p-3 cursor-pointer hover:bg-gray-200"
                >
                  {station}
                </li>
              ))}
            </ul>
          )}
        </div>
        <input
          type="number"
          name="seat"
          placeholder="Number of Seats"
          value={searchParams.seat}
          onChange={handleInputChange}
          className="w-full p-6 border rounded text-xl"
          style={{ fontSize: '1.4rem', height: '3.5rem' }}
        />
        <input
          type="date"
          name="date"
          value={searchParams.date}
          onChange={handleInputChange}
          className="w-full p-3 border rounded text-xl"
          style={{ fontSize: '1.4rem', height: '3.5rem' }}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-3 rounded text-xl">
          Search
        </button>
      </div>
      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center mt-4 text-red-600">{error}</p>}
      {trainData && (
        <div className="mt-6">
          {/* Render train data here */}
          <pre className="bg-gray-200 p-4 rounded">{JSON.stringify(trainData, null, 2)}</pre>
        </div>
      )}
    </form>
  );
};

export default SearchForm;
