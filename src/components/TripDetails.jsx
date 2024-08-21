import React from "react";
import { useContext, useEffect, useState } from "react";
import { ReservationContext } from "../context/ReservationContext";
import { useLocation } from "react-router-dom";
import { calculateDuration } from "../utils/duration";
import axios from "axios";

function TripDetails() {
  const { reservationData, setReservationData } =
    useContext(ReservationContext);
  const { selectedSeats, departureDate, pax } = reservationData;
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tripDetails, setTripDetails] = useState({});

  const { bookingId } = location.state;
  console.log("bookingId: ", bookingId);   

  useEffect(() => {
    const getSeats = async () => {
      console.log("bookingId inside useEffect: ", bookingId);
      setLoading(true);
      try {
        const response = await axios.get(`/api/bookings/${bookingId}`);
        console.log("response Data: ", response.data);
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
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900">
        Trip Details
      </h1>
      <div className="p-4 mb-4 text-gray-500 bg-blue-100 rounded-lg">
        <p>{tripDetails.bookingDetails.startHalt.stationRef.name}</p>
        <p>{tripDetails.bookingDetails.startHalt.departureTime}</p>
        <p>platform: {tripDetails.bookingDetails.startHalt.platform}</p>
      </div>

      <div className="mb-4">
        <div className="font-medium text-gray-800">
          {tripDetails.bookingDetails.startHalt.stationRef.name} →{" "}
          {tripDetails.bookingDetails.endHalt.stationRef.name}
        </div>
        <div className="text-sm text-gray-500">
          {tripDetails.bookingDetails.startHalt.departureTime} -{" "}
          {tripDetails.bookingDetails.endHalt.arrivalTime}
        </div>
        <div className="text-sm text-gray-500">
          Duration:{" "}
          {calculateDuration(
            tripDetails.bookingDetails.startHalt.departureTime,
            tripDetails.bookingDetails.endHalt.arrivalTime
          )}
        </div>
        <div className="text-sm text-gray-500">{pax} passengers</div>
        <div className="mt-4 font-medium text-right text-gray-800">$124.00</div>
      </div>
      <div className="my-4 border-t border-gray-300"></div>
      <div className="mb-4">
        <div className="flex items-center">
          <span className="mr-2 text-gray-600 material-icons">train</span>
          <span className="font-semibold text-gray-800">
            Frecciarossa · 9400
          </span>
        </div>
        <div className="mt-2 ml-8">
          <div className="text-sm text-gray-800">
            05:35 <span className="text-gray-500">Roma Termini</span>
          </div>
          <div className="ml-4 text-sm text-gray-500">3h 59m</div>
          <div className="mt-2 text-sm text-gray-800">
            09:34 <span className="text-gray-500">Venezia San Lucia</span>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <div className="font-medium text-gray-800">Seating · My selection</div>
        <div className="mt-2 ml-4">
          <div className="flex items-center">
            <span className="text-gray-800">Adult 1 · Pasan Madhuranga</span>
            <span className="ml-auto text-gray-800">$3.00</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-2 material-icons">event_seat</span>
            <span>2 · 12B</span>
          </div>
        </div>
        <div className="mt-2 ml-4">
          <div className="flex items-center">
            <span className="text-gray-800">
              Adult 2 · Pasanrr Madhurangarr
            </span>
            <span className="ml-auto text-gray-800">$3.00</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-2 material-icons">event_seat</span>
            <span>2 · 13B</span>
          </div>
        </div>
      </div>
      <div className="my-4 border-t border-gray-300"></div>
      <div className="flex justify-end font-semibold text-gray-800">
        $130.00
      </div>
    </div>
  );
}

export default TripDetails;
