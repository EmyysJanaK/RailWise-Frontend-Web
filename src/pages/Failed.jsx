import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FcApproval } from "react-icons/fc";
import { MdCancel } from 'react-icons/md';

const Failed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    if (!state || !state.bookingId) {
      navigate('/');
      return;
    }

    const timer = setTimeout(() => {
      navigate(-1);
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, state]);

  return (
    <>
    {state && state.bookingId &&
    (<div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-lg shadow-lg">
        <MdCancel className="text-red-600 text-9xl" />
        <h1 className="mb-4 text-3xl font-bold text-red-600 ">Payment Failed</h1>
        <p className="text-lg text-gray-700">Your payment was failed! You will be redirected to Payment page shortly.</p>
      </div>
    </div>)
}
    </>
  );
};

export default Failed;
