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

	const departureStationId =
		reservationData.departureStationId ||
		queryParams.get("departureStationId");
	const arrivalStationId =
		reservationData.arrivalStationId || queryParams.get("arrivalStationId");
	const departureDate =
		reservationData.departureDate || queryParams.get("departureDate");
	const scheduleId =
		reservationData.scheduleId || queryParams.get("scheduleId");
	const pax = reservationData.pax || parseInt(queryParams.get("pax"), 10);

	const [selectedClass, setSelectedClass] = useState(null);
	const [seatAvailability, setSeatAvailability] = useState({
		reservationData,
	});
	const [scheduleInfo, setScheduleInfo] = useState({});

	useEffect(() => {
		console.log(
			reservationData.departureStationId,
			reservationData.arrivalStationId,
			reservationData.departureDate,
			reservationData.pax,
			reservationData.seatAvailability,
			reservationData.selectedClass,
			reservationData.departureTime,
			reservationData.arrivalTime,
			reservationData.passengers,
			reservationData.email
		);
	}, [reservationData]);

	useEffect(() => {
		const isEmpty = (obj) => Object.keys(obj).length === 0;

		if (
			isEmpty(reservationData.seatAvailability) ||
			isEmpty(reservationData.departureTime) ||
			isEmpty(reservationData.arrivalTime)
		) {
			const getSeats = async () => {
				try {
					// Uncomment and use the actual API call when available
					console.log(departureStationId, arrivalStationId, scheduleId, departureDate);
					const response = await axios.get("/api/scheduleDetails", {
						params: {
							fromHaltId:departureStationId,
							toHaltId:arrivalStationId,
							scheduleId:scheduleId,
							date:departureDate,
						},
					});

					const data = response.data;
					setSeatAvailability({
						"1st Class": data.firstClassSeats,
						"2nd Class": data.secondClassSeats,
						"3rd Class": data.thirdClassSeats,
					
					});
					setScheduleInfo({
						departureTime: data.fromHalt.departureTime,
						arrivalTime: data.toHalt.arrivalTime,
					});
					console.log(data);
					// Mock data for demonstration purposes
					// setSeatAvailability({
					// 	"1st Class": 3,
					// 	"2nd Class": 10,
					// 	"3rd Class": 20,
					// });
					// setScheduleInfo({
					// 	departureTime: "10:00",
					// 	arrivalTime: "12:00",
					// });

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
		} else {
			setSeatAvailability(reservationData.seatAvailability);
			setScheduleInfo({
				departureTime: reservationData.departureTime,
				arrivalTime: reservationData.arrivalTime,
			});
			setLoading(false);
		}
	}, []);

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
			departureTime: scheduleInfo.departureTime,
			arrivalTime: scheduleInfo.arrivalTime,
		});
		navigate("/passengerdetails");
	};

	return (
		<div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
			{loading ? (
				<p>Loading...</p>
			) : error ? (
				<p className="text-red-500">{error}</p>
			) : (
				<>
					<h1 className="mb-8 text-3xl font-extrabold text-center text-gray-900">
						Train Options
					</h1>
					<div className="p-6 mb-6 bg-white rounded-lg shadow-md">
						<h2 className="mb-2 text-2xl font-bold">
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

					<div className="p-6 mb-6 bg-white rounded-lg shadow-md">
						<div className="flex justify-center">
							<h2 className="mb-2 text-3xl font-bold text-center">
								Select Class
							</h2> </div>
						<div className="flex flex-col justify-center md:flex-row md:space-x-14">
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
							className="px-4 py-2 text-gray-700 transition duration-300 bg-gray-300 rounded-full hover:bg-gray-400"
						>
							Back
						</button>
						<button
							onClick={handleNext}
							className={`bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300 ${
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
