import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import SeatOption from "../components/SeatOption";
import { ReservationContext } from "../context/ReservationContext";

const Options = () => {
	const { reservationData, setReservationData } =
		useContext(ReservationContext);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const location = useLocation();
	const navigate = useNavigate();
	const queryParams = new URLSearchParams(location.search);

	const departureStationId = queryParams.get("departureStationId");
	const arrivalStationId = queryParams.get("arrivalStationId");
	const departureDate = queryParams.get("departureDate");
	const scheduleId = queryParams.get("scheduleId");
	const pax = parseInt(queryParams.get("pax"), 10);

	const [selectedClass, setSelectedClass] = useState(null);
	const [seatAvailability, setSeatAvailability] = useState({});
	const [scheduleInfo, setScheduleInfo] = useState({});

	useEffect(() => {
		if (scheduleId && pax) {
			const getSeats = async () => {
				try {
					//   const response = await axios.get("/api/getClasses", {
					//     params: {
					//       scheduleId,
					//       departureStationId,
					//       arrivalStationId,
					//       departureDate,
					//     },
					//   });
					//   const data = response.data;
					//   setSeatAvailability(data.classes);
					//   setScheduleInfo({ departureTime: data.departureTime, arrivalTime: data.arrivalTime });
					setSeatAvailability({
						"2nd Class": 10,
						Premium: 5,
						"1st Class": 3,
						VIP: 1,
					});
					setScheduleInfo({
						departureTime: "10:00",
						arrivalTime: "12:00",
					});

					setLoading(false);
				} catch (error) {
					console.error(error);
					setError(
						"Failed to load seat options. Please try again later."
					);
					setLoading(false);
				}
			};
			getSeats();
		}
	}, [scheduleId, pax, departureStationId, arrivalStationId, departureDate]);

	const handleBack = () => {
		navigate(-1);
	};

	const handleNext = () => {
		setReservationData({
			scheduleId,
			departureStationId,
			arrivalStationId,
			departureDate,
			pax,
			selectedClass,
			passengers: [],
			email: "",
			departureTime: "", // Set these based on your API response
			arrivalTime: "",
		});
		navigate("/passenger-details");
	};
	
	return (
		<div className="container mx-auto p-4">
			{loading ? (
				<p>Loading...</p>
			) : error ? (
				<p className="text-red-500">{error}</p>
			) : (
				<>
					<h1 className="text-2xl font-bold mb-4">Train Options</h1>
					<div className="bg-white p-6 rounded-lg shadow-md mb-6">
						<h2 className="text-xl font-bold mb-2">
							Selected Train Information
						</h2>
						<div>
							<p>
								<strong>Departure Station ID:</strong>{" "}
								{departureStationId}
							</p>
							<p>
								<strong>Arrival Station ID:</strong>{" "}
								{arrivalStationId}
							</p>
							<p>
								<strong>Departure Date:</strong> {departureDate}
							</p>
							<p>
								<strong>Passengers:</strong> {pax}
							</p>
						</div>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-md mb-6">
						<h2 className="text-xl font-bold mb-2">Select Class</h2>
						<div className="flex space-x-4">
							{Object.keys(seatAvailability).map((className) => {
								const seats = seatAvailability[className] || 0;
								const isDisabled = pax > seats;

								return (
									<SeatOption
										key={className}
										className={className}
										seats={seats}
										isDisabled={isDisabled}
										isSelected={selectedClass === className}
										onSelect={() =>
											!isDisabled &&
											setSelectedClass(className)
										}
									/>
								);
							})}
						</div>
					</div>

					<div className="flex justify-between">
						<button
							onClick={handleBack}
							className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
						>
							Back
						</button>
						<button
							onClick={handleNext}
							className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${
								!selectedClass
									? "opacity-50 cursor-not-allowed"
									: ""
							}`}
							disabled={!selectedClass}
						>
							Next
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default Options;
