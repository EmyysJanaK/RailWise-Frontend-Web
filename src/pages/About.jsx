import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

const About = () => {
    const location = useLocation();
    const [prevLocation, setPrevLocation] = useState("");
    useEffect(() => {
        setPrevLocation(location.state.data);
    }, [location]);
    return (
        <div className="max-w-container mx-auto px-4">
            <Breadcrumbs title="About" prevLocation={prevLocation} />
            <div className="pb-10">
                <h1 className="max-w-[600px] text-base text-lightText mb-2">
                    RailWise is a state-of-the-art train system that connects cities and regions with speed and efficiency. With a focus on safety and comfort, RailWise offers a seamless travel experience for passengers.
                </h1>
                <Link to="/shop">
                    <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                        ahHDBFHdbjhDBVHbdf
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default About;
