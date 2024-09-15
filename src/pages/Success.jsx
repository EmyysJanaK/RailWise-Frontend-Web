import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FcApproval } from "react-icons/fc";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    if (!state || !state.bookingId) {
      navigate('/');
      return;
    }

    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, state]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="flex flex-col text-center items-center justify-center p-8 bg-white rounded-lg shadow-lg">
        <FcApproval className="  text-9xl text-green-600" />
        <h1 className=" text-3xl font-bold text-green-600 mb-4">Payment Successful</h1>
        <p className="text-lg  text-gray-700">Your payment was successful! You will be redirected shortly.</p>
      </div>
    </div>
  );
};

export default Success;
