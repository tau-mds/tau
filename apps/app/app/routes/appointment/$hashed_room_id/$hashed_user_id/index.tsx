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
      description:
        "Select a 90-minute time slot for your appointment in Room 1 (3 weeks)",
      intervalDurationMinutes: 90,
      slots: [
        /*
         * Week 1: Apr 30 (Wed) - May 06 (Tue)
         * Random logic simulation for roomId=1:
         * - Apr 30 (Wed, Day 0): Not skipped. All slots booked.
         * - May 01 (Thu, Day 1): Not skipped. Some available, some booked, 14:00 skipped.
         * - May 02 (Fri, Day 2): Not skipped. Some available, some booked.
         * - May 03 (Sat, Day 3): Not skipped. Some available, some booked.
         * - May 04 (Sun, Day 4): Not skipped. Some available, some booked.
         * - May 05 (Mon, Day 5): Not skipped. Some available, some booked.
         * - May 06 (Tue, Day 6): Not skipped. All slots available.
         */
        {
          start: "2025-04-30T09:00:00.000Z",
          status: "booked",
        },
        {
          start: "2025-04-30T10:00:00.000Z",
          status: "booked",
        },
        {
          start: "2025-04-30T11:00:00.000Z",
          status: "booked",
        },
        {
          start: "2025-04-30T13:00:00.000Z",
          status: "booked",
        },
        {
          start: "2025-04-30T14:00:00.000Z",
          status: "booked",
        },
        {
          start: "2025-04-30T15:00:00.000Z",
          status: "booked",
        },
        {
          start: "2025-04-30T16:00:00.000Z",
          status: "booked",
        },
        {
          start: "2025-05-01T09:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-01T10:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-01T11:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-01T13:00:00.000Z",
          status: "available",
        },
        /* 2025-05-01T14:00:00.000Z slot skipped by random logic */
        {
          start: "2025-05-01T15:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-01T16:00:00.000Z",
          status: "booked",
        },
        {
          start: "2025-05-02T09:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-02T10:00:00.000Z",
          status: "booked",
        },
        {
          start: "2025-05-02T11:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-02T13:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-02T14:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-02T15:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-02T16:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-03T09:00:00.000Z",
          status: "booked",
        },
        {
          start: "2025-05-03T10:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-03T11:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-03T13:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-03T14:00:00.000Z",
          status: "booked",
        },
        {
          start: "2025-05-03T15:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-03T16:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-04T09:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-04T10:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-04T11:00:00.000Z",
          status: "booked",
        },
        {
          start: "2025-05-04T13:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-04T14:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-04T15:00:00.000Z",
          status: "booked",
        },
        {
          start: "2025-05-04T16:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-05T09:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-05T10:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-05T11:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-05T13:00:00.000Z",
          status: "booked",
        },
        {
          start: "2025-05-05T14:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-05T15:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-05T16:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-06T09:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-06T10:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-06T11:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-06T13:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-06T14:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-06T15:00:00.000Z",
          status: "available",
        },
        {
          start: "2025-05-06T16:00:00.000Z",
          status: "available",
        },

        /*
         * Week 2: May 07 (Wed) - May 13 (Tue)
         * Random logic simulation for roomId=1:
         * - May 07 (Wed, Day 7): Not skipped. All slots available.
         * - May 08 (Thu, Day 8): Not skipped. All slots available.
         * - May 09 (Fri, Day 9): Not skipped. All slots available.
         * - May 10 (Sat, Day 10): Not skipped. All slots available.
         * - May 11 (Sun, Day 11): Not skipped. All slots available.
         * - May 12 (Mon, Day 12): Not skipped. All slots available.
         * - May 13 (Tue, Day 13): SKIPPED by random logic (dayRandomSeed = 13)! NO SLOTS FOR THIS DAY.
         */
        {
          start: "2025-05-07T09:00:00.000Z",
          status: "available",
        },
        { start: "2025-05-07T10:00:00.000Z", status: "available" },
        { start: "2025-05-07T11:00:00.000Z", status: "available" },
        { start: "2025-05-07T13:00:00.000Z", status: "available" },
        { start: "2025-05-07T14:00:00.000Z", status: "available" },
        { start: "2025-05-07T15:00:00.000Z", status: "available" },
        { start: "2025-05-07T16:00:00.000Z", status: "available" },
        { start: "2025-05-08T09:00:00.000Z", status: "available" },
        { start: "2025-05-08T10:00:00.000Z", status: "available" },
        { start: "2025-05-08T11:00:00.000Z", status: "available" },
        { start: "2025-05-08T13:00:00.000Z", status: "available" },
        { start: "2025-05-08T14:00:00.000Z", status: "available" },
        { start: "2025-05-08T15:00:00.000Z", status: "available" },
        { start: "2025-05-08T16:00:00.000Z", status: "available" },
        { start: "2025-05-09T09:00:00.000Z", status: "available" },
        { start: "2025-05-09T10:00:00.000Z", status: "available" },
        { start: "2025-05-09T11:00:00.000Z", status: "available" },
        { start: "2025-05-09T13:00:00.000Z", status: "available" },
        { start: "2025-05-09T14:00:00.000Z", status: "available" },
        { start: "2025-05-09T15:00:00.000Z", status: "available" },
        { start: "2025-05-09T16:00:00.000Z", status: "available" },
        { start: "2025-05-10T09:00:00.000Z", status: "available" },
        { start: "2025-05-10T10:00:00.000Z", status: "available" },
        { start: "2025-05-10T11:00:00.000Z", status: "available" },
        { start: "2025-05-10T13:00:00.000Z", status: "available" },
        { start: "2025-05-10T14:00:00.000Z", status: "available" },
        { start: "2025-05-10T15:00:00.000Z", status: "available" },
        { start: "2025-05-10T16:00:00.000Z", status: "available" },
        { start: "2025-05-11T09:00:00.000Z", status: "available" },
        { start: "2025-05-11T10:00:00.000Z", status: "available" },
        { start: "2025-05-11T11:00:00.000Z", status: "available" },
        { start: "2025-05-11T13:00:00.000Z", status: "available" },
        { start: "2025-05-11T14:00:00.000Z", status: "available" },
        { start: "2025-05-11T15:00:00.000Z", status: "available" },
        { start: "2025-05-11T16:00:00.000Z", status: "available" },
        { start: "2025-05-12T09:00:00.000Z", status: "available" },
        { start: "2025-05-12T10:00:00.000Z", status: "available" },
        { start: "2025-05-12T11:00:00.000Z", status: "available" },
        { start: "2025-05-12T13:00:00.000Z", status: "available" },
        { start: "2025-05-12T14:00:00.000Z", status: "available" },
        { start: "2025-05-12T15:00:00.000Z", status: "available" },
        { start: "2025-05-12T16:00:00.000Z", status: "available" },
        /* No slots for 2025-05-13 (Tuesday) due to random skip */

        /*
         * Week 3: May 14 (Wed) - May 20 (Tue)
         * Random logic simulation for roomId=1:
         * - May 14 (Wed, Day 14): SKIPPED by random logic (dayRandomSeed = 14)! NO SLOTS FOR THIS DAY.
         * - May 15 (Thu, Day 15): SKIPPED by random logic (dayRandomSeed = 15)! NO SLOTS FOR THIS DAY.
         * - May 16 (Fri, Day 16): SKIPPED by random logic (dayRandomSeed = 16)! NO SLOTS FOR THIS DAY.
         * - May 17 (Sat, Day 17): SKIPPED by random logic (dayRandomSeed = 17)! NO SLOTS FOR THIS DAY.
         * - May 18 (Sun, Day 18): SKIPPED by random logic (dayRandomSeed = 18)! NO SLOTS FOR THIS DAY.
         * - May 19 (Mon, Day 19): SKIPPED by random logic (dayRandomSeed = 19)! NO SLOTS FOR THIS DAY.
         * - May 20 (Tue, Day 20): Not skipped (dayRandomSeed = 5). All slots booked.
         */
        /* No slots for 2025-05-14 to 2025-05-19 due to random skips */
        {
          start: "2025-05-20T09:00:00.000Z",
          status: "booked",
        },
        {
          start: "2025-05-20T10:00:00.000Z",
          status: "booked",
        },
        {
          start: "2025-05-20T11:00:00.000Z",
          status: "booked",
        },
        {
          start: "2025-05-20T13:00:00.000Z",
          status: "booked",
        },
        {
          start: "2025-05-20T14:00:00.000Z",
          status: "booked",
        },
        {
          start: "2025-05-20T15:00:00.000Z",
          status: "booked",
        },
        {
          start: "2025-05-20T16:00:00.000Z",
          status: "booked",
        },
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

      <div className="flex  items-center justify-center flex-col">
        <div className="mb-8">
          <AppointmentSelector
            appointmentData={appointmentData as AppointmentDataFixedInterval}
            onSelectionChange={setSelectedSlots}
          />
        </div>

        {selectedSlots.length > 0 && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50 min-w-[1000px]">
            <h3 className="font-medium mb-2">Your Selected Slots:</h3>
            <ul className="space-y-1 mb-4">
              {selectedSlots.map((slot) => (
                <li key={slot.id} className="text-sm">
                  {slot.day}, {slot.date}, {slot.time}
                </li>
              ))}
            </ul>

            <button onClick={handleBookAppointment}>Book Appointment</button>
          </div>
        )}
      </div>
    </div>
  );
}
