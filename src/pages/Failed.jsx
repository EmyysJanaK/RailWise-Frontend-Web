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
      <div className="flex flex-col text-center items-center justify-center p-8 bg-white rounded-lg shadow-lg">
        <MdCancel className="  text-9xl text-red-600" />
        <h1 className=" text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>
        <p className="text-lg  text-gray-700">Your payment was failed! You will be redirected shortly.</p>
      </div>
    </div>)
}
    </>
  );
};

export default Failed;
