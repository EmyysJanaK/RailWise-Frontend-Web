import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Results from "./pages/Results";
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Stations from './pages/Stations';
import About from './pages/About';
// import TrainStatus from './pages/TrainStatus';
import Contact from './pages/Contact';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import TrainDetails from './pages/TrainDetails';
import './index.css';
import PassengerDetails from './pages/PassengerDetails';
import { ReservationProvider } from './context/ReservationContext';
import ReservationSummary from './pages/ReservationSummary';
import Layout from './components/Layout';
import PopularRoutes from './components/PopularRoutes';
import Options from './pages/Options';
import { UserProvider } from './context/UserContext';
import PaymentGateway from './pages/PaymentGateway';

function App() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gray-100 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-200">
      <div className="relative z-10 flex-1 overflow-y-auto">
        <BrowserRouter>
          <UserProvider>
            <ReservationProvider>
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/results" element={<Results />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/stations" element={<Stations />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/forgotpassword" element={<ForgotPassword />} />
                  <Route path="/traindetails" element={<TrainDetails />} />
                  <Route path="/passengerdetails" element={<PassengerDetails />} />
                  <Route path="/options" element={<Options />} />
                  <Route path="/reservationsummary" element={<ReservationSummary />} />
                  <Route path="/payment-gateway" element={<PaymentGateway />} />
                </Routes>
              </Layout>
            </ReservationProvider>
          </UserProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
