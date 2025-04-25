import { useState, useMemo } from "react";
// Define types based on the API response
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
  date: string;
  time: string;
  dateTime: Date;
  originalSlot: SimplifiedAppointmentSlot;
  status: AppointmentSlotStatus;
  weekIndex: number;
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

  // State to track current week
  const [currentWeekIndex, setCurrentWeekIndex] = useState<number>(0);

  // Process the appointment data into internal format
  const { processedSlots, weekCount, weekDates } = useMemo(() => {
    return processAppointmentData(appointmentData);
  }, [appointmentData]);

  // Filter slots for the current week
  const currentWeekSlots = useMemo(() => {
    return processedSlots.filter((slot) => slot.weekIndex === currentWeekIndex);
  }, [processedSlots, currentWeekIndex]);

  // Group slots by day
  const slotsByDay = useMemo(() => {
    return currentWeekSlots.reduce<Record<string, ProcessedTimeSlot[]>>(
      (acc, slot) => {
        const key = `${slot.day}-${slot.date}`;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(slot);
        return acc;
      },
      {}
    );
  }, [currentWeekSlots]);

  // Get all unique times across all days in the current week
  const allTimes = useMemo(() => {
    return Array.from(new Set(currentWeekSlots.map((slot) => slot.time))).sort(
      (a, b) => {
        const timeA = new Date(`1970/01/01 ${a.split(" - ")[0]}`).getTime();
        const timeB = new Date(`1970/01/01 ${b.split(" - ")[0]}`).getTime();
        return timeA - timeB;
      }
    );
  }, [currentWeekSlots]);

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

  // Get unique day-date combinations for the current week

  const daysInCurrentWeek = useMemo(() => {
    // Get the date range for the current week
    const weekRange = weekDates[currentWeekIndex];
    if (!weekRange) return [];

    // Parse the start date of the week
    const startDateParts = weekRange.start.split(" ");
    const startMonth = startDateParts[0];
    const startDay = Number.parseInt(startDateParts[1].replace(",", ""));
    const startYear = Number.parseInt(startDateParts[2]);

    // Create a Date object for the Monday of this week
    const weekStart = new Date(startYear, getMonthIndex(startMonth), startDay);

    // Create an array of all 7 days in the week
    const allDaysInWeek = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(weekStart);
      currentDate.setDate(weekStart.getDate() + i);

      const day = daysOfWeek[i];
      const date = currentDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      allDaysInWeek.push({ day, date });
    }

    return allDaysInWeek;
  }, [currentWeekIndex, weekDates]);

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

  // Navigation functions
  const goToPreviousWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1);
    }
  };

  const goToNextWeek = () => {
    if (currentWeekIndex < weekCount - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1);
    }
  };

  // Format date range for display
  const currentWeekRange = weekDates[currentWeekIndex]
    ? `${weekDates[currentWeekIndex].start} - ${weekDates[currentWeekIndex].end}`
    : "";
  return (
    <div className={`w-full ${className}`}>
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

        {/* Week navigation */}
        <div className="flex justify-between items-center mb-4">
          <button
            variant="outline"
            size="sm"
            onClick={goToPreviousWeek}
            disabled={currentWeekIndex === 0}
          >
            Previous Week
          </button>

          <div className="text-sm font-medium">{currentWeekRange}</div>

          <button
            variant="outline"
            size="sm"
            onClick={goToNextWeek}
            disabled={currentWeekIndex === weekCount - 1}
          >
            Next Week
          </button>
        </div>

        <div className="overflow-x-auto">
          {/* Header with days of the week */}
          <div className="grid grid-cols-8 gap-2 mb-4">
            <div className="font-medium text-sm text-gray-500"></div>
            {daysInCurrentWeek.map(({ day, date }) => (
              <div
                key={`${day}-${date}`}
                className="font-medium text-sm text-center py-2"
              >
                <div>{day}</div>
                <div className="text-xs text-gray-500">{date}</div>
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
                {daysInCurrentWeek.map(({ day, date }) => {
                  const dayKey = `${day}-${date}`;
                  const slot = slotsByDay[dayKey]?.find((s) => s.time === time);

                  if (!slot) {
                    return (
                      <div
                        key={`${dayKey}-${time}`}
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
    </div>
  );
}

// Add this helper function to convert month name to month index
function getMonthIndex(monthName: string): number {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months.indexOf(monthName);
}

// Helper function to process the appointment data
function processAppointmentData(data: AppointmentDataFixedInterval) {
  const { slots, intervalDurationMinutes } = data;
  const processedSlots: ProcessedTimeSlot[] = [];

  // Sort slots by date
  const sortedSlots = [...slots].sort((a, b) => {
    return new Date(a.start).getTime() - new Date(b.start).getTime();
  });

  if (sortedSlots.length === 0) {
    return { processedSlots: [], weekCount: 0, weekDates: [] };
  }

  // Find the first and last dates
  const firstDate = new Date(sortedSlots[0].start);
  const lastDate = new Date(sortedSlots[sortedSlots.length - 1].start);

  // Find the Monday of the first week
  const firstDateDay = firstDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const daysToMonday = firstDateDay === 0 ? 6 : firstDateDay - 1;
  const firstMonday = new Date(firstDate);
  firstMonday.setDate(firstDate.getDate() - daysToMonday);

  // Calculate the number of weeks
  const dayDiff = Math.ceil(
    (lastDate.getTime() - firstMonday.getTime()) / (1000 * 60 * 60 * 24)
  );
  const weekCount = Math.ceil((dayDiff + 1) / 7);

  // Store week date ranges for display
  const weekDates: { start: string; end: string }[] = [];

  // Format for displaying dates
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Calculate week ranges
  for (let i = 0; i < weekCount; i++) {
    const weekStart = new Date(firstMonday);
    weekStart.setDate(firstMonday.getDate() + i * 7);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    weekDates.push({
      start: dateFormatter.format(weekStart),
      end: dateFormatter.format(weekEnd),
    });
  }

  // Process each slot
  sortedSlots.forEach((slot) => {
    const startDate = new Date(slot.start);

    // Calculate which week this slot belongs to
    const dayDiff = Math.floor(
      (startDate.getTime() - firstMonday.getTime()) / (1000 * 60 * 60 * 24)
    );
    const weekIndex = Math.floor(dayDiff / 7);

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

    // Format date for display
    const dateStr = startDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    // Create a unique ID
    const id = `${dayOfWeek.toLowerCase()}-${startDate.toISOString()}`;

    processedSlots.push({
      id,
      day: dayOfWeek,
      date: dateStr,
      time: timeRange,
      dateTime: startDate,
      originalSlot: slot,
      status: slot.status,
      weekIndex,
    });
  });

  return { processedSlots, weekCount, weekDates };
}
