import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentGateway = ({ amount }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    if (timeLeft === 0) {
      alert("Time expired. Redirecting to the previous page.");
      navigate(-1); // Redirect to the previous page
    }

    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  const handlePayment = (e) => {
    e.preventDefault();

    if (!cardNumber || !expiryDate || !cvv || !cardHolderName) {
      setError("All fields are required.");
      return;
    }

    // Here you would integrate with a payment gateway API
    console.log("Payment submitted", { cardNumber, expiryDate, cvv, cardHolderName });

    // Reset form after successful submission (simulate for this example)
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    setCardHolderName("");
    setError("");
    alert("Payment Successful!");
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

return (
    <div className="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Payment Gateway</h1>
      <div className="text-center mb-4">
        <p className="text-2xl font-semibold">Amount to be paid: ${amount}</p>
        <p className="text-red-600 font-semibold">Time left: {formatTime(timeLeft)}</p> {/* reset when page is refreshed since have to make not to reset when page is refreshed */}
      </div>
      <form onSubmit={handlePayment} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cardHolderName">
            Card Holder Name
          </label>
          <input
            type="text"
            id="cardHolderName"
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={cardHolderName}
            onChange={(e) => setCardHolderName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cardNumber">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </div>
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="expiryDate">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              placeholder="MM/YY"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cvv">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-purple-900 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-indigo-900 transition duration-200"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentGateway;
