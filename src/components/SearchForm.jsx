import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ReservationContext } from "../context/ReservationContext";

const SearchForm = () => {
  const [searchParams, setSearchParams] = useState({
    departure: "",
    arrival: "",
    date: "",
    seat: "",
  });

  const { setReservationData } = useContext(ReservationContext);

  const [stations, setStations] = useState([]);
  const [filteredDepartureStations, setFilteredDepartureStations] = useState(
    []
  );
  const [filteredArrivalStations, setFilteredArrivalStations] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getStations = async () => {
      try {
        const response = await axios.get("/api/stations");
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

    if (name === "departure") {
      setFilteredDepartureStations(
        stations.filter((station) =>
          station.name.toLowerCase().startsWith(value.toLowerCase())
        )
      );
    } else if (name === "arrival") {
      setFilteredArrivalStations(
        stations.filter((station) =>
          station.name.toLowerCase().startsWith(value.toLowerCase())
        )
      );
    }
  };

  const handleStationClick = (name, station) => {
    setSearchParams((prevState) => ({
      ...prevState,
      [name]: station.name,
    }));
    if (name === "departure") {
      setFilteredDepartureStations([]);
    } else if (name === "arrival") {
      setFilteredArrivalStations([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !searchParams.departure ||
      !searchParams.arrival ||
      !searchParams.date ||
      !searchParams.seat
    ) {
      setError("Please fill in all the fields.");
      return;
    }

    const departureStation = stations.find(
      (station) => station.name === searchParams.departure
    );
    const arrivalStation = stations.find(
      (station) => station.name === searchParams.arrival
    );

    if (!departureStation || !arrivalStation) {
      setError("Invalid station selected.");
      return;
    }
    setReservationData({
      departureStationId: departureStation._id,
      arrivalStationId: arrivalStation._id,
      departureDate: searchParams.date,
      pax: parseInt(searchParams.seat),
    });

    navigate("/results");	
  };

  return (
    <form
      className="search-form bg-purple-900 p-6 rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="relative">
          <input
            type="text"
            name="departure"
            placeholder="Departure Station"
            value={searchParams.departure}
            onChange={handleInputChange}
            className="w-full p-3 border rounded text-xl"
            style={{ fontSize: "1.4rem", height: "3.5rem" }}
          />
          {filteredDepartureStations.length > 0 && (
            <ul className="absolute z-10 bg-white border rounded mt-1 w-full max-h-40 overflow-y-auto">
              {filteredDepartureStations.map((station) => (
                <li
                  key={station._id}
                  onClick={() => handleStationClick("departure", station)}
                  className="p-3 cursor-pointer hover:bg-gray-200"
                >
                  {station.name}
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
            style={{ fontSize: "1.4rem", height: "3.5rem" }}
          />
          {filteredArrivalStations.length > 0 && (
            <ul className="absolute z-10 bg-white border rounded mt-1 w-full max-h-40 overflow-y-auto">
              {filteredArrivalStations.map((station) => (
                <li
                  key={station._id}
                  onClick={() => handleStationClick("arrival", station)}
                  className="p-3 cursor-pointer hover:bg-gray-200"
                >
                  {station.name}
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
          style={{ fontSize: "1.4rem", height: "3.5rem" }}
        />
        <input
          type="date"
          name="date"
          value={searchParams.date}
          onChange={handleInputChange}
          className="w-full p-3 border rounded text-xl"
          style={{ fontSize: "1.4rem", height: "3.5rem" }}
        />
        <div className="col-span-1 sm:col-span-2 flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded text-2xl"
          >
            Search
          </button>
        </div>
      </div>
      {error && <p className="text-center mt-4 text-red-600">{error}</p>}
    </form>
  );
};

export default SearchForm;
