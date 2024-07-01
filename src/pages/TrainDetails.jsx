import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import trainImage from "../assets/trainImage.png";

const TrainDetails = () => {
    const location = useLocation();
    const [prevLocation, setPrevLocation] = useState("HomePage");

    useEffect(() => {
        if (location.state && location.state.data) {
            setPrevLocation(location.state.data);
        }
    }, [location]);

    // Sample station data with images
    const trainDetails = [
        { id: 1, name: "1st CLASS", image: trainImage },
        { id: 2, name: "2nd CLASS",  image: "https://via.placeholder.com/150" },
        { id: 3, name: "3rd CLASS",  image: "https://via.placeholder.com/150" },
    ];

    return (
        <div className="max-w-container mx-auto">
            <Breadcrumbs title="Train Details" prevLocation={prevLocation} />
            <div className="pb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
                    {trainDetails.map((ticket) => (
                        <Link to={{ pathname: "/PassengerDetails", state: { ticketId: ticket.id } }} key={ticket.id} className="block">
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                                <img src={ticket.image} className="w-full h-96 sm:h-144 object-cover" alt={ticket.name} />
                                <div className="p-8"> 
                                    <h2 className="text-8xl font-bold text-gray-800">{ticket.name}</h2>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrainDetails;