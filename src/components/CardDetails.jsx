import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { Circles } from "react-loader-spinner"; // Import the spinner

const validationSchema = yup.object().shape({
  cardHolderName: yup.string().required("Card Holder Name is required"),
  cardNumber: yup
    .string()
    .required("Card Number is required")
    .matches(/^\d{16}$/, "Card Number must be exactly 16 digits"),
  expiryDate: yup
    .string()
    .required("Expiry Date is required")
    .matches(
      /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      "Expiry Date must be in MM/YY format"
    ),
  cvv: yup
    .string()
    .required("CVV is required")
    .matches(/^\d{3}$/, "CVV must be exactly 3 digits"),
});

function CardDetails() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isExpired, setIsExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add a loading state
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingId, expireTime, email } = location.state;

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

  const formik = useFormik({
    initialValues: {
      cardHolderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (isExpired) {
        return;
      }

      setIsLoading(true); // Set loading state to true

      try {
        await axios.post("/api/bookings/confirmBooking", {
          bookingId,
          email,
        });
        navigate("/success", { state: { bookingId } });
      } catch (error) {
        console.error(error);
        formik.setErrors({ cardHolderName: "Failed to confirm booking" });
      } finally {
        setIsLoading(false); // Set loading state to false
      }
    },
  });

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="max-w-md px-4 py-12 sm:px-6 lg:px-8">
      {/* <h1 className="mb-8 text-4xl font-extrabold text-center text-gray-900">Payment Gateway</h1>
      <div className="mb-4 text-center">
        <p className="text-2xl font-semibold">Amount to be paid: ${amount}</p>
        <p className="font-semibold text-red-600">Time left: {formatTime(timeLeft)}</p>
      </div> */}

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          {" "}
          {/* Center the spinner */}
          <Circles color="#4A90E2" height={80} width={80} />
        </div>
      ) : (
        <form
          onSubmit={formik.handleSubmit}
          className="p-6 bg-white rounded-lg shadow-md"
        >
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900">
            Enter Card Details
          </h1>
          <div className="mb-4">
            <label
              className="block mb-1 text-sm font-medium text-gray-700"
              htmlFor="cardHolderName"
            >
              Card Holder Name
            </label>
            <input
              type="text"
              id="cardHolderName"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              {...formik.getFieldProps("cardHolderName")}
              disabled={isExpired}
            />
            {formik.touched.cardHolderName && formik.errors.cardHolderName ? (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.cardHolderName}
              </p>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              className="block mb-1 text-sm font-medium text-gray-700"
              htmlFor="cardNumber"
            >
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              {...formik.getFieldProps("cardNumber")}
              disabled={isExpired}
            />
            {formik.touched.cardNumber && formik.errors.cardNumber ? (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.cardNumber}
              </p>
            ) : null}
          </div>
          <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label
                className="block mb-1 text-sm font-medium text-gray-700"
                htmlFor="expiryDate"
              >
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                placeholder="MM/YY"
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                {...formik.getFieldProps("expiryDate")}
                disabled={isExpired}
              />
              {formik.touched.expiryDate && formik.errors.expiryDate ? (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.expiryDate}
                </p>
              ) : null}
            </div>
            <div>
              <label
                className="block mb-1 text-sm font-medium text-gray-700"
                htmlFor="cvv"
              >
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                {...formik.getFieldProps("cvv")}
                disabled={isExpired}
              />
              {formik.touched.cvv && formik.errors.cvv ? (
                <p className="mt-1 text-sm text-red-500">{formik.errors.cvv}</p>
              ) : null}
            </div>
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 font-bold text-white transition duration-200 rounded shadow-lg mt-2 ${
              isExpired
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-900 hover:bg-indigo-900"
            }`}
            disabled={isExpired}
          >
            Pay Now
          </button>
        </form>
      )}
    </div>
  );
}

export default CardDetails;