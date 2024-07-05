import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReservationContext } from "../context/ReservationContext";

const ReservationSummary = () => {
  const navigate = useNavigate();
  const { reservationData } = useContext(ReservationContext);

  useEffect(() => {
    if (!reservationData.departureStationId || !reservationData.passengers.length) {
      navigate("/");
    }
  }, [reservationData.departureStationId, reservationData.passengers.length, navigate]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Reservation Summary</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Reservation Details</h2>
        <div className="mb-6">
          <p className="text-lg mb-2"><strong>Departure Station ID:</strong> {reservationData.departureStationId}</p>
          <p className="text-lg mb-2"><strong>Arrival Station ID:</strong> {reservationData.arrivalStationId}</p>
          <p className="text-lg mb-2"><strong>Departure Date:</strong> {reservationData.departureDate}</p>
          <p className="text-lg mb-2"><strong>Departure Time:</strong> {reservationData.departureTime}</p>
          <p className="text-lg mb-2"><strong>Arrival Time:</strong> {reservationData.arrivalTime}</p>
          <p className="text-lg mb-2"><strong>Selected Class:</strong> {reservationData.selectedClass}</p>
          <p className="text-lg mb-2"><strong>Email:</strong> {reservationData.email}</p>
          <p className="text-lg mb-2"><strong>Number of Passengers:</strong> {reservationData.pax}</p>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Passengers</h3>
          <ul className="list-disc list-inside pl-4 space-y-2">
            {reservationData.passengers.map((passenger, index) => (
              <li key={index} className="text-lg">
                <span className="font-bold">{passenger.firstName} {passenger.lastName}</span> - DOB: {passenger.dob}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReservationSummary;
