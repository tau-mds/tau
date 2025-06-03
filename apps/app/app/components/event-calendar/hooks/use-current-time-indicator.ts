import { endOfWeek, isWithinInterval, startOfWeek } from "date-fns";
import React from "react";

import { EndHour, StartHour } from "~/components/event-calendar/constants";

export function useCurrentTimeIndicator(currentDate: Date) {
  const [currentTimePosition, setCurrentTimePosition] = React.useState<number>(0);
  const [currentTimeVisible, setCurrentTimeVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    const calculateTimePosition = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const totalMinutes = (hours - StartHour) * 60 + minutes;
      const dayEndMinutes = (EndHour - StartHour) * 60; // 12am next day

      // Calculate position as percentage of day
      const position = (totalMinutes / dayEndMinutes) * 100;

      const startOfWeekDate = startOfWeek(currentDate, { weekStartsOn: 0 });
      const endOfWeekDate = endOfWeek(currentDate, { weekStartsOn: 0 });
      const isCurrentTimeVisible = isWithinInterval(now, {
        start: startOfWeekDate,
        end: endOfWeekDate,
      });

      setCurrentTimePosition(position);
      setCurrentTimeVisible(isCurrentTimeVisible);
    };

    // Calculate immediately
    calculateTimePosition();

    // Update every minute
    const interval = setInterval(calculateTimePosition, 60000);

    return () => clearInterval(interval);
  }, [currentDate]);

  return { currentTimePosition, currentTimeVisible };
}
