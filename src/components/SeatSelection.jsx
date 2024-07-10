import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ReservationContext } from "../context/ReservationContext";
import Wagon from "./Wagon";

const seats = [
  { id: "1A", x: 20, y: 20 },
  { id: "1B", x: 60, y: 20 },
  { id: "1C", x: 100, y: 20 },
  { id: "1D", x: 180, y: 20 },
  { id: "1E", x: 220, y: 20 },
  { id: "2A", x: 20, y: 60 },
  { id: "2B", x: 60, y: 60 },
  { id: "2C", x: 100, y: 60 },
  { id: "2D", x: 180, y: 60 },
  { id: "2E", x: 220, y: 60 },
  { id: "3A", x: 20, y: 120 },
  { id: "3B", x: 60, y: 120 },
  { id: "3C", x: 100, y: 120 },
  { id: "3D", x: 180, y: 120 },
  { id: "3E", x: 220, y: 120 },
  { id: "4A", x: 20, y: 160 },
  { id: "4B", x: 60, y: 160 },
  { id: "4C", x: 100, y: 160 },
  { id: "4D", x: 180, y: 160 },
  { id: "4E", x: 220, y: 160 },
];

const SeatSelectionPage = () => {
  const { reservationData, setReservationData } =
    useContext(ReservationContext);
  const navigate = useNavigate();
  const {
    scheduleId,
    trainId,
    fromHaltId,
    toHaltId,
    departureDate,
    selectedClassId,
  } = reservationData;
  const [wagonsData, setWagonsData] = useState([]);

  console.log("reservationData", reservationData);
  console.log("selecte")

  useEffect(() => {
    const getSeats = async () => {
      try {
        const response = await axios.get("/api/schedules/wagonsOfClass", {
          params: {
            scheduleId,
            trainId,
            fromHaltId,
            toHaltId,
            date: departureDate,
            requestedClassId: selectedClassId,
          },
        });
        console.log("response", response.data);
        setWagonsData(response.data.requestedClassWagons);
      } catch (error) {
        console.error(error);
      }
    };

    getSeats();
  }, [fromHaltId, toHaltId, scheduleId, departureDate, setReservationData]);
  console.log("Wagons Data", wagonsData)
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {wagonsData.map((wagonData) =>{
        return <Wagon key={wagonData._id} wagonNumber={wagonData.wagonNumber} seats={wagonData.seats} bookedSeats={wagonData.alreadyBookedSeats} />
      }) }
    </div>

  );
};

export default SeatSelectionPage;
