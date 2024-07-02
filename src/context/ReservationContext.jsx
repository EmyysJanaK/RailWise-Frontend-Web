import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
	const [reservationData, setReservationData] = useState({
		departureStationId: "",
		arrivalStationId: "",
		departureDate: "",
		pax: 0,
		seatAvailability: {},
		selectedClass: "",
		departureTime: "",
		arrivalTime: "",
		passengers: [],
		email: "",
	});

	return (
		<ReservationContext.Provider
			value={{ reservationData, setReservationData }}
		>
			{children}
		</ReservationContext.Provider>
	);
};

// ReservationProvider.propTypes = {
// 	children: PropTypes.node.isRequired,
// };
