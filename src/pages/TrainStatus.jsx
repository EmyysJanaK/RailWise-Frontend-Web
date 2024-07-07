import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import trainImage from "../assets/trainImage.png"; // Replace with your actual image path


const TrainStatus = () => {
    const location = useLocation();
    const [prevLocation, setPrevLocation] = useState("HomePage");

    useEffect(() => {
        if (location.state && location.state.data) {
            setPrevLocation(location.state.data);
        }
    }, [location]);

    return (
        <div className="relative max-w-container mx-auto px-4 py-8">
            {/* Background Image */}
            <img
                src={trainImage}
                alt="Train Background"
                className="absolute inset-0 w-full h-full object-cover opacity-10 z-0"
            />
            <div className="relative z-10">
                {/* Breadcrumbs */}
                <Breadcrumbs title="Train Status" prevLocation={prevLocation} />

                {/* Main Content */}
                <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold text-blue-800 mb-4">Train Status</h1>
                    {/* Enhanced Content */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Real-Time Updates</h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Check the current status of your train with RailWise. Get real-time updates on delays, cancellations, and platform changes to plan your journey effectively.
                        </p>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Track Your Train</h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Our advanced tracking system allows you to monitor the location of your train in real-time. Know exactly where your train is and its estimated arrival time.
                        </p>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Reliability and Transparency</h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            RailWise is dedicated to providing reliable and transparent train status updates. We understand the importance of timely information for our passengers.
                        </p>
                    </div>

                    {/* Call to Action */}
                    <Link to="/Tickets">
                        <button className="w-52 h-12 bg-blue-600 text-white hover:bg-blue-700 duration-300 rounded-full shadow-lg transform hover:scale-105 transition-transform">
                            Explore Our Services
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TrainStatus;
