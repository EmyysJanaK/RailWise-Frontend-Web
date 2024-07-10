import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
	const [reservationData, setReservationData] = useState({
		scheduleId: "",
		departureStationId: "",
		fromHaltId: "",
		toHaltId: "",
		arrivalStationId: "",
		departureDate: "",
		pax: 0,
		selectedSeats: [],
		selectedClassId: "",
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
