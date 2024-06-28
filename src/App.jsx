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
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  

  return (

      <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/results" element={<Results />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/stations" element={<Stations />} />
            <Route path="/train status" element={<TrainStatus />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            {/* <Route path="/ForgotPassword" element={<ForgotPassword />} /> */} 

          </Routes>
      </BrowserRouter>

  )
}

export default App
