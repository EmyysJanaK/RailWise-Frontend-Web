import { useState, useEffect } from "react";
import axios from "axios";
import { calculateDuration } from "../utils/duration";

const useTrainOptions = ({
  departureStationId,
  arrivalStationId,
  departureDate,
}) => {
  const [trainOptions, setTrainOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStations = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/schedules`,
          {
            params: {
              fromStationId: departureStationId,
              toStationId: arrivalStationId,
              date: departureDate,
            },
          }
        );
        const data = response.data;

        const formattedTrainOptions = data.map((item) => ({
          id: item.schedule._id,
          departureDate,
          scheduleType: item.schedule.scheduleType,
          toHalt: {
            id: item.toHalt._id,
            name: item.toHalt.stationRef.name,
            arrivalTime: item.toHalt.arrivalTime,
            platform: item.toHalt.platform,
          },
          fromHalt: {
            id: item.fromHalt._id,
            name: item.fromHalt.stationRef.name,
            departureTime: item.fromHalt.departureTime,
            platform: item.fromHalt.platform,
          },
          duration: calculateDuration(
            item.fromHalt.departureTime,
            item.toHalt.arrivalTime
          ),

          price: item.toHalt.price - item.fromHalt.price,
          seatAvailability: {
            first: item.firstClassSeats,
            second: item.secondClassSeats,
            third: item.thirdClassSeats,
          },
          train: {
            id: item.schedule.trainRef._id,
            name: item.schedule.trainRef.name,
          },
        }));

        setTrainOptions(formattedTrainOptions);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to load train options. Please try again later.");
        setLoading(false);
      }
    };
    getStations();
  }, [departureStationId, arrivalStationId, departureDate]);

  return { trainOptions, loading, error };
};

export default useTrainOptions;
