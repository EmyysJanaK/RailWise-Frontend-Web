import { BrowserRouter, Routes, Route } from "react-router-dom";
import Results from "./pages/Results";
import HomePage from "./pages/HomePage";
import LoginCustomer from "./pages/LoginCustomer";
import Stations from "./pages/Stations";
import About from "./pages/About";
import TrainStatus from "./pages/TrainStatus";
import Contact from "./pages/Contact";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Options from "./pages/Options";
import PassengerDetails from "./pages/PassengerDetails";
import { ReservationProvider } from "./context/ReservationContext";
import ReservationSummary from "./pages/ReservationSummary";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/results" element={<Results />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/stations" element={<Stations />} />
				<Route path="/train-status" element={<TrainStatus />} />
			</Routes>
			<ReservationProvider>
				<Routes>
					<Route path="/login-customer" element={<LoginCustomer />} />
					<Route path="/options" element={<Options />} />
					<Route
						path="/passenger-details"
						element={<PassengerDetails />}
					/>
					<Route path="/reservationSummary" element={<ReservationSummary />} />
				</Routes>
			</ReservationProvider>
		</BrowserRouter>
	);
}

export default App;
