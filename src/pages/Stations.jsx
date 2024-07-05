import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import trainImage from "../assets/trainImage.png";

const Stations = () => {
    const location = useLocation();
    const [prevLocation, setPrevLocation] = useState("HomePage");

    useEffect(() => {
        if (location.state && location.state.data) {
            setPrevLocation(location.state.data);
        }
    }, [location]);

    // Sample station data with images
    const stations = [
        { id: 1, name: "Station 1", location: "City 1", image: trainImage },
        { id: 2, name: "Station 2", location: "City 2", image: "https://via.placeholder.com/150" },
        { id: 3, name: "Station 3", location: "City 3", image: "https://via.placeholder.com/150" },
       
    ];

    return (
        <div className="relative max-w-container mx-auto px-4 py-8">
        
        
            <div className="max-w-container mx-auto px-4">
                
                <div className="pb-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {stations.map((station) => (
                            <div key={station.id} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                                <img src={station.image} alt={station.name} className="w-full h-32 sm:h-48 object-cover" />
                                <div className="p-4"> 
                                    <h2 className="text-2xl font-bold text-gray-800">{station.name}</h2>
                                    <p className="text-gray-600">{station.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stations;
