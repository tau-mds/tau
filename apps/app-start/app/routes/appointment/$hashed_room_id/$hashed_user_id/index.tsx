import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { useEffect, useState } from "react";

import AppointmentSelector, {
  AppointmentDataFixedInterval,
  ProcessedTimeSlot,
} from "../../../../components/appointment-selector";

export const Route = createFileRoute(
  "/appointment/$hashed_room_id/$hashed_user_id/"
)({
  // loader: async ({ params }) => {
  //   const { hashed_id_room, hashed_id_user } = params;
  //   const response = await fetch(
  //     `/api/appoirnmentData/${hashed_id_room}/${hashed_id_user}`
  //   );
  //   if (!response.ok) {
  //     throw new Error("Failed to fetch reservation data");
  //   }
  //   const data = await response.json();
  //   return data;
  // },
  component: AppointmentPage,
});

function AppointmentPage() {
  const { hashed_room_id, hashed_user_id } = Route.useParams();
  const roomId = hashed_room_id as string;

  const [appointmentData, setAppointmentData] =
    useState<AppointmentDataFixedInterval | null>({
      title: "Room 1 Availability",
      description: "Select a time slot for your appointment in Room 1",
      intervalDurationMinutes: 60,
      slots: [
        {
          start: "2025-04-21T09:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-04-21T10:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-04-21T11:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-04-21T13:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-04-21T14:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-04-21T15:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-04-21T16:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-04-22T10:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-04-22T11:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-04-22T13:00:00.000Z",
          status: "booked",
        },
        {
          start: "2025-04-22T14:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-04-22T15:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-04-22T16:00:00.000Z",
          status: "booked",
        },
        {
          start: "2025-04-23T09:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-04-23T10:00:00.000Z",
          status: "booked",
        },
        // ... (lots more slot entries for the rest of the week,
        // generated based on the mock logic and date range)
      ],
    });
  const [selectedSlots, setSelectedSlots] = useState<ProcessedTimeSlot[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Replace with your actual API endpoint
  //       const response = await fetch(
  //         `/api/appointment/${hashed_id_room}/${hashed_id_user}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch reservation data");
  //       }
  //       const data = await response.json();
  //       setReservationData(data);
  //     } catch (err: any) {
  //       setError(err.message || "An error occurred");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [hashed_id_room, hashed_id_user]);

  const handleBookAppointment = () => {
    if (selectedSlots.length === 0) {
      alert("Please select at least one time slot");
      return;
    }

    console.log("Booking appointment with slots:", selectedSlots);
    // Here you would typically make an API call to book the appointment
    // For example:
    // fetch('/api/book', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ roomId, slots: selectedSlots.map(slot => slot.originalSlot) })
    // })
  };

  return (
    <div>
      <h1>Reservation Details</h1>
      <p>Room ID: {hashed_room_id}</p>
      <p>User ID: {hashed_user_id}</p>

      <>
        <div className="mb-8">
          <AppointmentSelector
            appointmentData={appointmentData as AppointmentDataFixedInterval}
            onSelectionChange={setSelectedSlots}
          />
        </div>

        {selectedSlots.length > 0 && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <h3 className="font-medium mb-2">Your Selected Slots:</h3>
            <ul className="space-y-1 mb-4">
              {selectedSlots.map((slot) => (
                <li key={slot.id} className="text-sm">
                  {slot.day}, {slot.time} (
                  {new Date(slot.dateTime).toLocaleDateString()})
                </li>
              ))}
            </ul>

            <button onClick={handleBookAppointment}>Book Appointment</button>
          </div>
        )}
      </>
    </div>
  );
}
