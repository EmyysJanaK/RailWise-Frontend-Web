import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CardDetails from "../components/CardDetails";
import TripDetails from "../components/TripDetails";

function Payment() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isExpired, setIsExpired] = useState(false);
  const location = useLocation();
  const { expireTime } = location.state;

  useEffect(() => {
    // Calculate the time left from current time to expireTime
    const expireDate = new Date(expireTime);
    const currentTime = new Date();
    const differenceInSeconds = Math.floor((expireDate - currentTime) / 1000);

    if (differenceInSeconds > 0) {
      setTimeLeft(differenceInSeconds);
    } else {
      setIsExpired(true);
      setTimeLeft(0);
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [expireTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <>
      <p className="font-semibold text-red-600">
        Time left: {formatTime(timeLeft)}
      </p>
      <CardDetails isExpired={isExpired} />
      <TripDetails />
    </>
  );
}

export default Payment;
