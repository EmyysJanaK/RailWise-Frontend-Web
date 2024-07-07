import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import trainImage from "../assets/trainImage.png";

const PopularRoutes = () => {
  const [popularRoutes, setPopularRoutes] = useState([]);
  const [prevLocation, setPrevLocation] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Check if location.state exists and set prevLocation
    if (location.state && location.state.data) {
      setPrevLocation(location.state.data);
    }

    // Fetch popular routes from the API
    axios.get('/api/popularRoutes')
      .then(response => {
        setPopularRoutes(response.data); // Assuming response.data is an array of routes
      })
      .catch(error => console.error('Error fetching popular routes:', error));
  }, [location]);

  const fallbackRoutes = [
    { id: 1, name: "Station 1", location: "City 1", image: trainImage },
    { id: 2, name: "Station 2", location: "City 2", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Station 3", location: "City 3", image: "https://via.placeholder.com/150" },
  ];

  const routesToDisplay = popularRoutes.length > 0 ? popularRoutes : fallbackRoutes;

  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Popular Routes</h2>
        <div className="max-w-container mx-auto px-4">
          <div className="pb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {routesToDisplay.map((route) => (
                <div key={route.id} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  <img src={route.image || trainImage} alt={route.name} className="w-full h-32 sm:h-48 object-cover" />
                  <div className="p-4">
                    <h2 className="text-2xl font-bold text-gray-800">{route.name}</h2>
                    <p className="text-gray-600">{route.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;
