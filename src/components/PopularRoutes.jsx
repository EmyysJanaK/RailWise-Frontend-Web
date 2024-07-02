import React, { useEffect, useState } from 'react';
import axios from 'axios';
import trainImage from "../assets/trainImage.png"

const PopularRoutes = () => {
  const [popularRoutes, setPopularRoutes] = useState([]);

  useEffect(() => {
    if (location.state && location.state.data) {
        setPrevLocation(location.state.data);
    }
}, [location]);




    // Fetch popular routes from the API
//     axios.get('/api/popular-routes')
//       .then(response => setPopularRoutes(response.data))
//       .catch(error => console.error('Error fetching popular routes:', error));
//   }, []);

  const route = [
    { id: 1, name: "Station 1", location: "City 1", image: trainImage },
    { id: 2, name: "Station 2", location: "City 2", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Station 3", location: "City 3", image: "https://via.placeholder.com/150" },

   
];


  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Popular Routes</h2>
            <div className="max-w-container mx-auto px-4">
                <div className="pb-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {popularRoutes.map((route) => (
                            <div key={route.id} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                                <img src={route.image} alt={route.name} className="w-full h-32 sm:h-48 object-cover" />
                                <div className="p-4">
                                    <h2 className="text-2xl font-bold text-gray-800">{route.name}</h2>
                                    <p className="text-gray-600">{route.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularRoutes.map((route, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative">
                <img
                  src={route.imageUrl}
                  alt={route.name}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-50 transition-opacity duration-300 hover:opacity-75"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-semibold">{route.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed">{route.description}</p>
                <button className="mt-4 w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div> */}
        
      </div>
    </section>
  );
};

export default PopularRoutes;