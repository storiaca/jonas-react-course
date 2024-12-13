"use client";

import { useOptimistic } from "react";
import ReservationCard from "@/app/_components/ReservationCard.js";
import { deleteReservation } from "@/app/_lib/actions";

function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    () => {}
  );

  async function handleDelete(bookingId) {
    await deleteReservation(bookingId);
  }

  return (
    <>
      <ul className="space-y-6">
        {bookings.map((booking) => (
          <ReservationCard
            booking={booking}
            onDelete={handleDelete}
            key={booking.id}
          />
        ))}
      </ul>
    </>
  );
}

export default ReservationList;
