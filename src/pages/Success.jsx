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
    <>
    {state && state.bookingId &&(
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-lg shadow-lg">
        <FcApproval className="text-green-600  text-9xl" />
        <h1 className="mb-4 text-3xl font-bold text-green-600 ">Payment Successful</h1>
        <p className="text-lg text-gray-700">Your payment was successful! You will be redirected to Home shortly.</p>
      </div>
    </div>
    )}
    </>
  );
};

export default Success;
