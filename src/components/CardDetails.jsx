import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Custom style for the CardElement
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

function CardDetails({ isExpired }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { bookingId, email } = location.state;
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/bookings/confirmBooking`,
          {
            id,
            bookingId,
            email,
          }
        );
        navigate("/success", { state: { bookingId } });
      } catch (error) {
        console.error(error);
        navigate("/failed", { state: { bookingId } });
      }
    } else {
      console.error(error.message);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg p-6 mx-auto bg-gray-100 rounded-lg shadow-lg max-h-48"
    >
      <label className="block mb-2 text-lg font-medium text-gray-800">
        Card Details
      </label>
      <div className="p-3 mb-5 bg-white border border-gray-300 rounded-md">
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full text-center text-white text-lg py-2 rounded-md transition-colors duration-300 ${
          loading || isExpired
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}

export default CardDetails;
