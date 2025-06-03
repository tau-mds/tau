import { format } from "date-fns";
import React from "react";

import {
  CalendarDndProvider,
  type CalendarEvent,
  EventGap,
  EventHeight,
  WeekCellsHeight,
} from "~/components/event-calendar";

import { Button, Select, toast } from "@tau/ui";
import { cx } from "@tau/utils";

import Calendar from "~icons/radix-icons/calendar";
import Plus from "~icons/radix-icons/plus";
import { WeekView } from "./week-view";

export namespace EventCalendar {
  export type Props = {
    events?: CalendarEvent[];
    onEventUpdate?: (event: CalendarEvent) => void;
    onEventCreate?: (startTime: CalendarEvent) => void;
    className?: string;
  };
}

export function EventCalendar({
  events = [],
  onEventUpdate,
  onEventCreate,
  className,
}: EventCalendar.Props) {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [visibleDays, setVisibleDays] = React.useState("7");

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleEventSelect = (event: CalendarEvent) => {
    console.log("Event selected:", event); // Debug log
  };

  const handleEventCreate = (startTime: Date) => {
    console.log("Creating new event at:", startTime); // Debug log

    // Snap to 15-minute intervals
    const minutes = startTime.getMinutes();
    const remainder = minutes % 15;
    if (remainder !== 0) {
      if (remainder < 7.5) {
        // Round down to nearest 15 min
        startTime.setMinutes(minutes - remainder);
      } else {
        // Round up to nearest 15 min
        startTime.setMinutes(minutes + (15 - remainder));
      }
      startTime.setSeconds(0);
      startTime.setMilliseconds(0);
    }

    onEventCreate?.(startTime);
  };

  return (
    <div
      className="flex flex-col rounded-lg border has-data-[slot=month-view]:flex-1"
      style={
        {
          "--event-height": `${EventHeight}px`,
          "--event-gap": `${EventGap}px`,
          "--week-cells-height": `${WeekCellsHeight}px`,
        } as React.CSSProperties
      }
    >
      <CalendarDndProvider onEventUpdate={(evt) => onEventUpdate?.(evt)}>
        <div className={cx("flex items-center justify-between p-2 sm:p-4", className)}>
          <div className="flex items-center gap-1 sm:gap-4">
            <Button
              variant="outline"
              className="aspect-square max-[479px]:p-0!"
              onClick={handleToday}
            >
              <Calendar className="min-[480px]:hidden" aria-hidden="true" />
              <span className="max-[479px]:sr-only">Today</span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button className="aspect-square max-[479px]:p-0!">
              <Plus className="opacity-60 sm:-ms-1" aria-hidden="true" />
              <span className="max-sm:sr-only">New event</span>
            </Button>

            <Select.Root value={visibleDays} onValueChange={setVisibleDays}>
              <Select.Trigger>
                <Select.Value />
              </Select.Trigger>

              <Select.Content>
                {[1, 2, 3, 7].map((days) => (
                  <Select.Item key={days} value={`${days}`}>
                    {days} days
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <WeekView
            currentDate={currentDate}
            events={events}
            onEventSelect={handleEventSelect}
            onEventCreate={handleEventCreate}
            visibleDays={visibleDays}
          />
        </div>
      </CalendarDndProvider>
    </div>
  );
}
