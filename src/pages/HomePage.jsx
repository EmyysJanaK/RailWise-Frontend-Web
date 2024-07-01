import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import Footer from '../components/Footer';
import trainImage from '../assets/trainImage.png';
import Filter from '../components/Filter';
import axios from 'axios';

const HomePage = () => {
  // const [stations, setStations] = useState([]);
  // console.log(stations);
  // useEffect(() => {
  //   const getStations = async () => {
  //     try {
  //       const response = await axios.get('/api/stations');
  //       setStations(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   getStations();
  // }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0 bg-purple-900 opacity-75"></div>

      <div className="relative z-10 flex-1">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex flex-col items-center justify-center flex-1 p-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900">Welcome to TrailWise</h1>
            <p className="text-lg text-gray-700 mt-2">Book your train tickets easily and quickly with our platform.</p>
          </div>
          <SearchForm />
          {/* <div>
            {stations.map((station) => (
              <div key={station.id}>
                <h1>{station.name}</h1>
              </div>
            ))}
          </div> */}



        </main>
        
      </div>


      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
