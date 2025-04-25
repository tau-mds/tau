import { useState } from "react";

// Define types based on the provided data structure
export type AppointmentSlotStatus = "available" | "booked";

export interface SimplifiedAppointmentSlot {
  start: string;
  status: AppointmentSlotStatus;
}

export interface AppointmentDataFixedInterval {
  title: string;
  description?: string;
  intervalDurationMinutes: number;
  slots: SimplifiedAppointmentSlot[];
}

// Internal type for our component's usage
export type ProcessedTimeSlot = {
  id: string;
  day: string;
  time: string;
  dateTime: Date;
  originalSlot: SimplifiedAppointmentSlot;
  status: AppointmentSlotStatus;
};

type AppointmentSelectorProps = {
  appointmentData: AppointmentDataFixedInterval;
  initialSelections?: string[];
  onSelectionChange?: (selectedSlots: ProcessedTimeSlot[]) => void;
  className?: string;
};

export default function AppointmentSelector({
  appointmentData,
  initialSelections = [],
  onSelectionChange,
  className = "",
}: AppointmentSelectorProps) {
  // State to track selected slots
  const [selectedSlots, setSelectedSlots] =
    useState<string[]>(initialSelections);

  // Process the appointment data into our internal format
  const processedSlots = processAppointmentData(appointmentData);

  // Group slots by day
  const slotsByDay = processedSlots.reduce<Record<string, ProcessedTimeSlot[]>>(
    (acc, slot) => {
      if (!acc[slot.day]) {
        acc[slot.day] = [];
      }
      acc[slot.day].push(slot);
      return acc;
    },
    {}
  );

  // Get all unique times across all days
  const allTimes = Array.from(
    new Set(processedSlots.map((slot) => slot.time))
  ).sort((a, b) => {
    const timeA = new Date(`1970/01/01 ${a.split(" - ")[0]}`).getTime();
    const timeB = new Date(`1970/01/01 ${b.split(" - ")[0]}`).getTime();
    return timeA - timeB;
  });

  // Days of the week in order
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Get days that have slots
  const daysWithSlots = Array.from(
    new Set(processedSlots.map((slot) => slot.day))
  );

  // Sort days to match our daysOfWeek order
  const sortedDaysWithSlots = daysOfWeek.filter((day) =>
    daysWithSlots.includes(day)
  );

  // Handle slot selection
  const toggleSlot = (slot: ProcessedTimeSlot) => {
    // Only allow toggling available slots
    if (slot.status !== "available") return;

    setSelectedSlots((prev) => {
      const newSelected = prev.includes(slot.id)
        ? prev.filter((id) => id !== slot.id)
        : [...prev, slot.id];

      // Call the callback with the full slot objects
      if (onSelectionChange) {
        const selectedSlotObjects = processedSlots.filter((s) =>
          newSelected.includes(s.id)
        );
        onSelectionChange(selectedSlotObjects);
      }

      return newSelected;
    });
  };

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <div className="min-w-[768px]">
        {/* Title and description */}
        {appointmentData.title && (
          <h2 className="text-lg font-medium mb-2">{appointmentData.title}</h2>
        )}
        {appointmentData.description && (
          <p className="text-sm text-gray-500 mb-4">
            {appointmentData.description}
          </p>
        )}

        {/* Header with days of the week */}
        <div className="grid grid-cols-8 gap-2 mb-4">
          <div className="font-medium text-sm text-gray-500"></div>
          {sortedDaysWithSlots.map((day) => (
            <div key={day} className="font-medium text-sm text-center py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Time slots grid */}
        <div className="space-y-2">
          {allTimes.map((time) => (
            <div key={time} className="grid grid-cols-8 gap-2">
              {/* Time label */}
              <div className="text-sm text-gray-500 flex items-center">
                {time}
              </div>

              {/* Slots for each day */}
              {sortedDaysWithSlots.map((day) => {
                const slot = slotsByDay[day]?.find((s) => s.time === time);

                if (!slot) {
                  return (
                    <div
                      key={`${day}-${time}`}
                      className="h-10 rounded-md bg-gray-100"
                    />
                  );
                }

                const isSelected = selectedSlots.includes(slot.id);
                const isAvailable = slot.status === "available";

                return (
                  <button
                    key={slot.id}
                    onClick={() => toggleSlot(slot)}
                    disabled={!isAvailable}
                    className={`h-10 rounded-md transition-colors text-sm flex items-center justify-center
                        ${
                          isSelected
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : isAvailable
                            ? "bg-white border border-gray-200 hover:bg-gray-50"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                  >
                    {isAvailable ? "Available" : "Booked"}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper function to process the appointment data
function processAppointmentData(
  data: AppointmentDataFixedInterval
): ProcessedTimeSlot[] {
  const { slots, intervalDurationMinutes } = data;

  return slots.map((slot) => {
    const startDate = new Date(slot.start);

    // Calculate end time
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + intervalDurationMinutes);

    // Format the time range
    const timeFormat = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const startTime = timeFormat.format(startDate);
    const endTime = timeFormat.format(endDate);
    const timeRange = `${startTime} - ${endTime}`;

    // Get day of week
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = days[startDate.getDay()];

    // Create a unique ID
    const id = `${dayOfWeek.toLowerCase()}-${startDate.toISOString()}`;

    return {
      id,
      day: dayOfWeek,
      time: timeRange,
      dateTime: startDate,
      originalSlot: slot,
      status: slot.status,
    };
  });
}
