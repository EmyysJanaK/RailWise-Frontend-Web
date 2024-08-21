import React from "react";
import { useContext, useEffect, useState } from "react";
import { ReservationContext } from "../context/ReservationContext";
import { useLocation } from "react-router-dom";
import { calculateDuration } from "../utils/duration";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrain, faClock, faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { MdChair } from "react-icons/md";
import axios from "axios";

function TripDetails({ timeLeft }) {
  const { reservationData } = useContext(ReservationContext);
  const { selectedSeats, departureDate, pax } = reservationData;
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tripDetails, setTripDetails] = useState({});

  const { bookingId } = location.state;
  console.log("bookingId: ", bookingId);

  useEffect(() => {
    const getSeats = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/bookings/${bookingId}`);
        setTripDetails({
          bookingDetails: response.data.booking,
          selectedSeats,
          departureDate,
          pax,
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to load seat options. Please try again later.");
        setLoading(false);
      }
    };
    getSeats();
  }, [bookingId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const bookingDetails = tripDetails.bookingDetails || {};

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900">
        Trip Details
      </h1>
      {bookingDetails.startHalt && (
        <>
        <div className="flex items-center mb-2 text-gray-700 text-md">
            <FontAwesomeIcon icon={faStopwatch} className="mr-2 text-red-500" />
            <span className="flex items-center font-medium text-red-500">
              Held for:{" "} {timeLeft}
            </span>
        </div>
          <div className="flex justify-between mb-6">
            <div className="w-1/3 p-4 text-center bg-blue-100 rounded-lg">
              <p className="font-medium ">
                {bookingDetails.startHalt.stationRef.name}
              </p>
              <p>{bookingDetails.startHalt.departureTime}</p>
              <p className="text-sm ">
                platform: {bookingDetails.startHalt.platform}
              </p>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faClock} className="mr-2 text-gray-500" />
              <p className="text-sm text-gray-700">
                {calculateDuration(
                  bookingDetails.startHalt.departureTime,
                  bookingDetails.endHalt.arrivalTime
                )}
              </p>
            </div>
            <div className="w-1/3 p-4 text-center bg-blue-100 rounded-lg">
              <p className="font-medium ">
                {bookingDetails.endHalt.stationRef.name}
              </p>
              <p>{bookingDetails.endHalt.arrivalTime}</p>
              <p className="text-sm ">
                platform: {bookingDetails.endHalt.platform}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <ul className="space-y-1 list-disc">
              <li className="flex text-gray-700 text-md">
                <span className="mr-2 font-medium">Departure Date:</span>
                <p>{departureDate}</p>
              </li>
              <li className="flex text-gray-700 text-md">
                <span className="mr-2 font-medium">Passengers:</span>
                <p>{pax}</p>
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <h2 className="mb-3 text-lg">Seating · My selection</h2>
            <ul className="ml-2 space-y-3 list-disc">
              {selectedSeats.map((seat) => (
                <li
                  key={seat._id}
                  className="flex items-center text-gray-700 text-md"
                >
                  <div className="flex items-center mr-6">
                    <MdChair className="mr-2 text-indigo-900 size-6" />
                    <span className="mr-2 font-medium">Seat:</span>
                    <p>{seat.name}</p>
                  </div>
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faTrain}
                      className="mr-2 text-indigo-900 size-5"
                    />
                    <span className="mr-2 font-medium">Wagon:</span>
                    <p>{seat.wagonNumber}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between pt-4 mt-4 border-t border-gray-300">
            <p className="text-xl font-semibold text-gray-700">Price</p>
            <p className="text-xl font-semibold text-gray-700">
              ${bookingDetails.totalFare}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default TripDetails;
