import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Results from "./pages/Results"
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Stations from './pages/Stations';
import About from './pages/About'; // Import the About page component
import TrainStatus from './pages/TrainStatus'; // Import the TrainStatus page component
import Contact from './pages/Contact'; // Import the Contact page component
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import TrainDetails from './pages/TrainDetails';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import PassengerDetails from './pages/PassengerDetails';
import { ReservationProvider } from './context/ReservationContext';
import ReservationSummary from './pages/ReservationSummary';
import Layout from './components/Layout';
import PopularRoutes from './components/PopularRoutes';

function App() {
  

  return (


    <div className="relative min-h-screen flex flex-col bg-gray-100 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-200">
        
      <div className="relative z-10 flex-1 overflow-y-auto">
          
      
      
      


        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/results" element={<Results />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/stations" element={<Stations />} />
              <Route path="/train-status" element={<TrainStatus />} />
              <Route path="/login" element={<Login />} />
              <Route path="/SignUp" element={<SignUp />} />
              {/* <Route path="/ForgotPassword" element={<ForgotPassword />} /> */} 
              <Route path="/TrainDetails" element={<TrainDetails />} />
              <Route path="/PassengerDetails" element={<PassengerDetails />} />
              <Route path="/Results" element={<Results />} />
              
            </Routes>
            {/* <ReservationProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/options" element={<Options />} />
                <Route path="/passenger-details" element={<PassengerDetails />}/>
                <Route path="/reservationSummary" element={<ReservationSummary />} />
              </Routes>
            </ReservationProvider> */}
          </Layout>



        </BrowserRouter>
      </div>
    </div>

      

  )
}

export default App
