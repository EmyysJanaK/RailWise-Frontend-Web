import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CardDetails from "../components/CardDetails";
import TripDetails from "../components/TripDetails";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PUBLIC_KEY}`);

function Payment() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isExpired, setIsExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <Elements stripe={stripePromise}>
      <div className="container px-4 mx-auto my-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex justify-center order-1 lg:order-2 lg:justify-start">
            <TripDetails timeLeft={formatTime(timeLeft)} />
          </div>
          <div className="flex justify-center order-2 lg:order-1 lg:justify-end">
            <CardDetails isExpired={isExpired} />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Payment;
