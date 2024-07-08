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

  const handleCheckout = () => {
    navigate("/payment-gateway");
  };

  return (
    <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Reservation Summary</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">Reservation Details</h2>
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p><strong>Departure Station ID:</strong> {reservationData.departureStationId}</p>
          <p><strong>Arrival Station ID:</strong> {reservationData.arrivalStationId}</p>
          <p><strong>Departure Date:</strong> {reservationData.departureDate}</p>
          <p><strong>Departure Time:</strong> {reservationData.departureTime}</p>
          <p><strong>Arrival Time:</strong> {reservationData.arrivalTime}</p>
          <p><strong>Selected Class:</strong> {reservationData.selectedClass}</p>
          <p><strong>Email:</strong> {reservationData.email}</p>
          <p><strong>Number of Passengers:</strong> {reservationData.pax}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Passengers</h3>
          <ul className="list-disc list-inside">
            {reservationData.passengers.map((passenger, index) => (
              <li key={index} className="mb-1">
                <span className="font-medium">{passenger.firstName} {passenger.lastName}</span> - DOB: {passenger.dob}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-end">
        <button 
          onClick={handleCheckout}
          className="bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-green-700 transition duration-200"
        >
          Confirm and Pay
        </button>
      </div>
    </div>
  );
};

export default ReservationSummary;
