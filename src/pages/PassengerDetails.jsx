import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReservationContext } from "../context/ReservationContext";
import { z } from "zod";
import ToggleSidePane from "../components/ToggleSidePane";

const emailSchema = z.string().email();

const PassengerDetails = () => {
	const { reservationData, setReservationData } =
		useContext(ReservationContext);
	const navigate = useNavigate();
	const {
		pax,
		departureStationId,
		arrivalStationId,
		departureDate,
		selectedClass,
	} = reservationData;

	useEffect(() => {
		if (
			!departureStationId ||
			!arrivalStationId ||
			!departureDate ||
			!selectedClass
		) {
			navigate("/");
		}
	}, [
		departureStationId,
		arrivalStationId,
		departureDate,
		selectedClass,
		navigate,
	]);

	const [passengers, setPassengers] = useState(
		Array(pax).fill({ firstName: "", lastName: "", dob: "" })
	);
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [isFormValid, setIsFormValid] = useState(false);

	const handleInputChange = (index, field, value) => {
		const newPassengers = [...passengers];
		newPassengers[index][field] = value;
		setPassengers(newPassengers);
	};

	const validateEmail = (emailaddr) => {
		try {
			emailSchema.parse(emailaddr);
			setError("");
			return true;
		} catch {
			setError("Invalid email address");
			return false;
		}
	};

	const validateForm = () => {
		for (const passenger of passengers) {
			if (!passenger.firstName || !passenger.lastName || !passenger.dob) {
				setError("All fields are required for all passengers");
				return false;
			}
			if (new Date(passenger.dob) >= new Date()) {
				setError("Date of birth cannot be in the future");
				return false;
			}
		}
		if (!validateEmail(email)) {
			return false;
		}
		setError("");
		return true;
	};

	useEffect(() => {
		setIsFormValid(validateForm());
	}, [passengers, email]);

	const handleBack = () => {
		navigate(-1);
	};

	const handleSubmit = () => {
		if (isFormValid) {
			setReservationData((prevData) => ({
				...prevData,
				passengers,
				email,
			}));
			setSuccess("Passenger details submitted successfully!");
			navigate("/reservationSummary");
		}
	};

	return (
		<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
			<h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
				Passenger Details
			</h1>
			<ToggleSidePane />
			<div className="bg-white shadow-md rounded-lg p-6 mb-6">
				<h2 className="text-2xl font-bold mb-4">
					Enter Passenger Information
				</h2>
				{passengers.map((passenger, index) => (
					<div key={index} className="mb-4">
						<h3 className="text-xl font-semibold mb-2">
							Passenger {index + 1}
						</h3>
						<div className="flex flex-col md:flex-row md:space-x-4">
							<input
								type="text"
								className="form-input mt-1 p-2 w-full border border-gray-300 rounded-md mb-2 md:mb-0"
								placeholder="First Name"
								value={passenger.firstName}
								onChange={(e) =>
									handleInputChange(
										index,
										"firstName",
										e.target.value
									)
								}
							/>
							<input
								type="text"
								className="form-input mt-1 p-2 w-full border border-gray-300 rounded-md mb-2 md:mb-0"
								placeholder="Last Name"
								value={passenger.lastName}
								onChange={(e) =>
									handleInputChange(
										index,
										"lastName",
										e.target.value
									)
								}
							/>
							<input
								type="date"
								className="form-input mt-1 p-2 w-full border border-gray-300 rounded-md"
								value={passenger.dob}
								max={new Date().toISOString().split("T")[0]}
								onChange={(e) =>
									handleInputChange(
										index,
										"dob",
										e.target.value
									)
								}
							/>
						</div>
					</div>
				))}
				<div className="mb-4">
					<h3 className="text-xl font-semibold mb-2">
						Email for Ticket
					</h3>
					<input
						type="email"
						className="form-input mt-1 p-2 w-full border border-gray-300 rounded-md"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						onBlur={(e) => validateEmail(e.target.value)}
					/>
				</div>
				{error && <p className="text-red-500">{error}</p>}
				{success && <p className="text-green-500">{success}</p>}
			</div>
			<div className="flex justify-between">
				<button
					onClick={handleBack}
					className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400 transition duration-300"
				>
					Back
				</button>
				<button
					onClick={handleSubmit}
					className={`bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300 ${
						!isFormValid ? "opacity-50 cursor-not-allowed" : ""
					}`}
					disabled={!isFormValid}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default PassengerDetails;
