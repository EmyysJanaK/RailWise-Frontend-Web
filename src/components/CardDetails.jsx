import { useNavigate, useLocation } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

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

function CardDetails({ isExpired, setIsLoading }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingId, email } = location.state;
  const stripe = useStripe();
  const elements = useElements();

  console.log("Stripe instance:", stripe);
  console.log("Elements instance:", elements);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (isExpired) {
      navigate("/failed", { state: { bookingId } });
      return;
    }

    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }
    console.log("Before creating payment method");

    // console.log("Before creating payment method");
    // const cardElement = elements.getElement(CardElement);
    // console.log("Card Element:", cardElement);

    // if (!cardElement) {
    //   console.error("Card Element not found or not mounted.");
    //   setIsLoading(false);
    //   return;
    // }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        console.log("Payment method ID:", id);
        await axios.post("/api/bookings/confirmBooking", {
          id,
          bookingId,
          email,
        });
        navigate("/success", { state: { bookingId } });
      } catch (error) {
        console.error(error);
        navigate("/failed", { state: { bookingId } });
      }
    } else {
      console.error(error.message);
    }

    setIsLoading(false);
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
        disabled={!stripe || !elements}
        className={`w-full py-2 text-lg text-center text-white transition-colors duration-300 rounded-md ${
          isExpired
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        Pay Now
      </button>
    </form>
  );
}

export default CardDetails;
