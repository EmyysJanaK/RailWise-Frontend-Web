import { useContext } from "react";
import { ReservationContext } from "../context/ReservationContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ReservationSummary = () => {
	const navigate = useNavigate();
	const { reservationData } = useContext(ReservationContext);
	useEffect(() => {
		if (
			!reservationData.departureStationId ||
			!reservationData.passengers.length
		) {
			navigate("/");
		}
	}, [
		reservationData.departureStationId,
		reservationData.passengers.length,
		navigate,
	]);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Reservation Summary</h1>
			<div className="bg-white p-6 rounded-lg shadow-md mb-6">
				<h2 className="text-xl font-bold mb-2">Reservation Details</h2>
				<p>
					<strong>Departure Station ID:</strong>{" "}
					{reservationData.departureStationId}
				</p>
				<p>
					<strong>Arrival Station ID:</strong>{" "}
					{reservationData.arrivalStationId}
				</p>
				<p>
					<strong>Departure Date:</strong>{" "}
					{reservationData.departureDate}
				</p>
				<p>
					<strong>Departure Time:</strong>{" "}
					{reservationData.departureTime}
				</p>
				<p>
					<strong>Arrival Time:</strong> {reservationData.arrivalTime}
				</p>
				<p>
					<strong>Selected Class:</strong>{" "}
					{reservationData.selectedClass}
				</p>
				<p>
					<strong>Passengers:</strong>
				</p>
				<ul>
					{reservationData.passengers.map((passenger, index) => (
						<li key={index}>
							{passenger.firstName} {passenger.lastName} - DOB:{" "}
							{passenger.dob}
						</li>
					))}
				</ul>
				<p>
					<strong>Email:</strong> {reservationData.email}
				</p>
				<p>
					<strong>Number of Passengers:</strong> {reservationData.pax}
				</p>
			</div>
		</div>
	);
};

export default ReservationSummary;
