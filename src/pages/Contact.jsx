import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import trainImage from "../assets/trainImage.png"; // Adjust the path as needed

const Contact = () => {
    const location = useLocation();
    const [prevLocation, setPrevLocation] = useState("HomePage");

    useEffect(() => {
        if (location.state && location.state.data) {
            setPrevLocation(location.state.data);
        }
    }, [location]);

    return (
        <div className="relative max-w-container mx-auto px-2 py-8">
            <img src={trainImage} alt="Train Background" className="absolute inset-0 w-full h-full object-cover opacity-10 z-0" />
            <div className="relative z-10">
                <Breadcrumbs title="Contact" prevLocation={prevLocation} />
                <h1 className="text-3xl sm:text-4xl text-blue-600 font-bold mb-8 text-center shadow-lg">Contact Us</h1>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-xl text-purple-700">Name:</label>
                        <input type="text" id="name" name="name" className="w-full text-lg bg-gray-100 rounded-md p-2 mt-1 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-xl text-purple-700">Email:</label>
                        <input type="email" id="email" name="email" className="w-full text-lg bg-gray-100 rounded-md p-2 mt-1 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-xl text-purple-700">Message:</label>
                        <textarea id="message" name="message" rows="4" className="w-full text-lg bg-gray-100 rounded-md p-2 mt-1 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
                    </div>
                    <button type="submit" className="w-full text-xl bg-green-500 text-white rounded-md py-3 mt-4 shadow-lg hover:bg-green-600 transition duration-300">Submit</button>
                </form>
                
                <h2 className="text-2xl sm:text-3xl text-purple-700 font-bold mt-12 mb-4 text-center shadow-lg">FAQ</h2>
                <ul className="space-y-4">
                    <li className="text-lg sm:text-xl text-orange-700 bg-yellow-100 rounded-md p-4 shadow-lg">Question 1: What is the purpose of this website?</li>
                    <li className="text-lg sm:text-xl text-orange-700 bg-yellow-100 rounded-md p-4 shadow-lg">Question 2: How can I contact customer support?</li>
                    <li className="text-lg sm:text-xl text-orange-700 bg-yellow-100 rounded-md p-4 shadow-lg">Question 3: Can I request a refund?</li>
                </ul>

                <h2 className="text-2xl sm:text-3xl text-orange-700 font-bold mt-12 mb-4 text-center shadow-lg">Opinion Box</h2>
                <textarea id="opinion" name="opinion" rows="4" className="w-full text-lg bg-gray-100 rounded-md p-2 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                <button type="submit" className="w-full text-xl bg-blue-500 text-white rounded-md py-3 mt-4 shadow-lg hover:bg-blue-600 transition duration-300">Submit Opinion</button>
            </div>
        </div>
    );
};

export default Contact;
