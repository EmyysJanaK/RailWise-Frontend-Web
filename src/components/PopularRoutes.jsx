import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import trainImage from "../assets/trainImage.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PopularRoutes = ({setDeparture,setArrival,searchFormRef }) => {
  const [popularRoutes, setPopularRoutes] = useState([]);
  const [prevLocation, setPrevLocation] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Check if location.state exists and set prevLocation
    if (location.state && location.state.data) {
      setPrevLocation(location.state.data);
    }

    // Fetch popular routes from the API
    axios.get('/api/schedules/popularRoutes')
      .then(response => {
        setPopularRoutes(response.data.popularRoutes); // Assuming response.data is an array of routes
      })
      .catch(error => console.error('Error fetching popular routes:', error));
  }, [location]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const handleClick = (departure, arrival) => {
    setDeparture(departure);
    setArrival(arrival);

    if (searchFormRef && searchFormRef.current) {
      searchFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-white-950">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 ">
        <h2 className="mb-8 text-4xl font-bold text-center text-white text-black-900">Popular Routes</h2>
        <Slider {...settings}>
          {popularRoutes.map((route) => (
            <div 
            key={route.startHaltStation._id + route.endHaltStation._id}
            className="p-2"
            onClick={() => {handleClick(route.startHaltStation.name, route.endHaltStation.name)}}
          >
            <div 
              className="relative overflow-hidden transition-transform duration-300 transform bg-center bg-cover rounded-lg hover:scale-105" 
              style={{ backgroundImage: `url(${route.image || trainImage})`, height: '200px' }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-70"></div>
          
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full p-4">
                <h2 className="text-2xl font-bold text-white">{route.startHaltStation.name} → {route.endHaltStation.name}</h2>
                <h3 className="text-xl text-gray-200">{route.train.name}</h3>
                <p className="text-lg text-center text-gray-300">{route.count} Bookings in last month</p>
              </div>
            </div>
          </div>
          
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default PopularRoutes;