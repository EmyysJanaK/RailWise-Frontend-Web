import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Results from "./pages/Results";
import Home from './pages/Home';
import Login from './pages/Login';
import History from './pages/History';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import { ReservationProvider } from './context/ReservationContext';
import ReservationSummary from './pages/ReservationSummary';
import Layout from './components/Layout';
import Options from './pages/Options';
import { UserProvider } from './context/UserContext';
import SeatSelection from './pages/SeatSelection';
import ProfilePage from './pages/Profile';
import './index.css';
import Payment from './pages/Payment';
import Success from './pages/Success';
import Failed from './pages/Failed';

function App() {
  return (
    <div className="relative flex flex-col min-h-screen bg-gray-100 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-200">
      <div className="relative z-10 flex-1 overflow-y-auto">
        <BrowserRouter>
          <UserProvider>
            <ReservationProvider>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/results" element={<Results />} />
                  <Route path="/options" element={<Options />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/stations" element={<History />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/forgotpassword" element={<ForgotPassword />} />
                  {/* <Route path="/traindetails" element={<TrainDetails />} /> */}
                  <Route path="/seat-selection" element={<SeatSelection />} />
                  <Route path="/reservationsummary" element={<ReservationSummary />} />
                  <Route path="/payment-gateway" element={<Payment />} />
                  <Route path="/success" element={<Success />} />
                  <Route path="/failed" element={<Failed />} />
                  {/* <Route path="/seatselection" element={<SeatSelection />} /> */}
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
