import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Filter from "../components/Filter";
import TrainOption from "../components/TrainOption";
import axios from "axios";

const Results = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [trainOptions, setTrainOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const departureStationId = queryParams.get("departureStationId");
  const arrivalStationId = queryParams.get("arrivalStationId");
  const departureDate = queryParams.get("departureDate");
  const pax = queryParams.get("pax");

  useEffect(() => {
    const getStations = async () => {
      try {
        const response = await axios.get("/api/schedules", {
          params: {
            fromName: departureStationId,
            toName: arrivalStationId,
            date: departureDate,
            pax: pax,
          },
        });
        const data = response.data;
		console.log(departureStationId, arrivalStationId, departureDate, pax);

        const formattedTrainOptions = data.map((item) => ({
          id: item.schedule._id,
          departure: item.fromHalt.departureTime,
          arrival: item.toHalt.arrivalTime,
          duration: calculateDuration(
            item.fromHalt.departureTime,
            item.toHalt.arrivalTime
          ),
          changes: 0,
          price: item.toHalt.price - item.fromHalt.price,
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
  }, [departureStationId, arrivalStationId, departureDate, pax]);

  const calculateDuration = (start, end) => {
    const parseTime = (timeString) => {
      const [time, modifier] = timeString.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      if (modifier === "pm" && hours !== 12) {
        hours += 12;
      } else if (modifier === "am" && hours === 12) {
        hours = 0;
      }

      return { hours, minutes };
    };

    const startTime = parseTime(start);
    const endTime = parseTime(end);

    const startDate = new Date();
    startDate.setHours(startTime.hours, startTime.minutes);

    const endDate = new Date();
    endDate.setHours(endTime.hours, endTime.minutes);

    const diff = endDate - startDate;
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    return `${hours}h ${minutes}m`;
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsFilterVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isFilterVisible]);

  const handleTrainOptionClick = (option) => {
    const newUrl = `/options?scheduleId=${option.id}&departureStationId=${departureStationId}&arrivalStationId=${arrivalStationId}&departureDate=${departureDate}&pax=${pax}`;
    navigate(newUrl);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row lg:px-20">
        <div className={`flex-1 w-full p-4 ${isFilterVisible ? "block" : "hidden"} md:block`}>
          <Filter />
          <button
            onClick={() => setIsFilterVisible(false)}
            className="md:hidden w-fit px-4 py-2 mt-2 border-black border-2 rounded-md"
          >
            Close
          </button>
        </div>
        <button
          onClick={() => setIsFilterVisible(true)}
          className="md:hidden w-fit px-4 py-2 mb-2 border-black border-2 rounded-md"
        >
          Filters
        </button>
        <div className="flex flex-col flex-[3] ml-0">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            trainOptions.map((option) => (
              <TrainOption
                key={option.id}
                option={option}
                onClick={() => handleTrainOptionClick(option)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
