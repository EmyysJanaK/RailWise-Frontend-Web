import React from "react";
import { useBookings } from "../../hooks/useBookings";
import BookingItem from "./BookingItem"; // Import the BookingItem component

const BookingHistory = () => {
  const { bookings, handleDeleteBooking, loading } = useBookings();
  if (loading) return <p>Loading...</p>;
  if (!bookings.length) return <p>No bookings found.</p>;

  return (
    <ul>
      {bookings.map((booking) => (
        <BookingItem
          key={booking._id}
          booking={booking}
          onDelete={() => handleDeleteBooking(booking._id)} // Pass the delete handler as a prop
        />
      ))}
    </ul>
  );
};

export default BookingHistory;
