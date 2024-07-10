import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const [reservationData, setReservationData] = useState(() => {
    const savedData = localStorage.getItem("reservationData");
    return savedData
      ? JSON.parse(savedData)
      : {
          scheduleId: "",
          trainId: "",
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
          email: "",
        };
  });

  useEffect(() => {
    localStorage.setItem("reservationData", JSON.stringify(reservationData));
  }, [reservationData]);

  return (
    <ReservationContext.Provider
      value={{ reservationData, setReservationData }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

ReservationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};