//src/pages/HomePage.jsx
import React from 'react';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import Footer from '../components/Footer';
import trainImage from '../assets/trainImage.png';
import axios from 'axios';
import { useState, useEffect } from 'react';

const HomePage = () => {
  const [stations, setStations] = useState([]);
  console.log(stations);
  useEffect(() => {
    const getStations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/stations');
        setStations(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getStations();
  }, []);
  
  return (
    <div className="relative px-4 py-8 mx-auto max-w-container">
        <img src={trainImage} alt="Train Background" className="absolute inset-0 z-0 object-cover w-full h-full opacity-10" />

      <div className="home-page">
        <Header />
        <main className="container p-4 mx-auto">
          <SearchForm />
          
          <div>
            {stations.map((station) => (
              <div key={station.id}>
                <h2>{station.name}</h2>
              </div>
            ))}
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
