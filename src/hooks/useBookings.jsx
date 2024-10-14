import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/bookingHistory`,
          {
            headers: { "Cache-Control": "no-cache" },
            withCredentials: true,
          }
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching booking history", error);
      }
      setLoading(false);
    };

    fetchBookings();
  }, []);

  const handleDeleteBooking = async (bookingId) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings/${bookingId}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Booking cancelled successfully");
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: "cancelled" }
              : booking
          )
        );
      }
    } catch (error) {
      toast.error("Error cancelling booking");
    }
    setLoading(false);
  };

  return { bookings, handleDeleteBooking, loading };
};
