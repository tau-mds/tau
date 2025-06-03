import {
  addHours,
  addMinutes,
  areIntervalsOverlapping,
  differenceInMinutes,
  eachDayOfInterval,
  eachHourOfInterval,
  format,
  getHours,
  getMinutes,
  isSameDay,
  isToday,
  set,
  startOfDay,
} from "date-fns";
import React from "react";

import { cx } from "@tau/utils";
import {
  type CalendarEvent,
  DraggableEvent,
  DroppableCell,
  WeekCellsHeight,
  useCurrentTimeIndicator,
} from "~/components/event-calendar";
import { EndHour, StartHour } from "~/components/event-calendar/constants";

interface PositionedEvent {
  event: CalendarEvent;
  top: number;
  height: number;
  left: number;
  width: number;
  zIndex: number;
}

export namespace WeekView {
  export type Props = {
    currentDate: Date;
    events: CalendarEvent[];
    onEventSelect: (event: CalendarEvent) => void;
    onEventCreate: (startTime: Date) => void;
    visibleDays: `${number}`;
  };
}

const round = {
  begin: new Date("2025-04-01"),
  end: new Date("2025-06-14"),
};

export function WeekView({
  currentDate,
  events,
  onEventSelect,
  onEventCreate,
  visibleDays,
}: WeekView.Props) {
  const days = React.useMemo(
    () =>
      eachDayOfInterval({
        start: round.begin,
        end: round.end,
      }),
    [],
  );

  const hours = React.useMemo(() => {
    const dayStart = startOfDay(currentDate);
    return eachHourOfInterval({
      start: addHours(dayStart, StartHour),
      end: addHours(dayStart, EndHour - 1),
    });
  }, [currentDate]);

  const processedDayEvents = React.useMemo(
    () =>
      days.map((day) => {
        // Sort events by start time and duration
        const sortedEvents = events
          .filter((event) => {
            const eventStart = new Date(event.start);
            const eventEnd = addMinutes(eventStart, event.duration);

            return (
              isSameDay(day, eventStart) ||
              isSameDay(day, eventEnd) ||
              (eventStart < day && eventEnd > day)
            );
          })
          .sort((a, b) => {
            const aStart = new Date(a.start);
            const bStart = new Date(b.start);
            const aEnd = new Date(addMinutes(a.start, a.duration));
            const bEnd = new Date(addMinutes(b.start, b.duration));

            // First sort by start time
            if (aStart < bStart) return -1;
            if (aStart > bStart) return 1;

            // If start times are equal, sort by duration (longer events first)
            const aDuration = differenceInMinutes(aEnd, aStart);
            const bDuration = differenceInMinutes(bEnd, bStart);
            return bDuration - aDuration;
          });

        // Calculate positions for each event
        const positionedEvents: PositionedEvent[] = [];
        const dayStart = startOfDay(day);

        // Track columns for overlapping events
        const columns: { event: CalendarEvent; end: Date }[][] = [];

        for (const event of sortedEvents) {
          const eventStart = new Date(event.start);
          const eventEnd = addMinutes(eventStart, event.duration);

          // Adjust start and end times if they're outside this day
          const adjustedStart = isSameDay(day, eventStart) ? eventStart : dayStart;
          const adjustedEnd = isSameDay(day, eventEnd)
            ? eventEnd
            : addHours(dayStart, 24);
          // const adjustedStart = eventStart;
          // const adjustedEnd = eventEnd;

          // Calculate top position and height
          const startHour = getHours(adjustedStart) + getMinutes(adjustedStart) / 60;
          const endHour = getHours(adjustedEnd) + getMinutes(adjustedEnd) / 60;
          console.debug({ startHour, endHour, duration: endHour - startHour });

          // Adjust the top calculation to account for the new start time
          const top = (startHour - StartHour) * WeekCellsHeight;
          const height = (endHour - startHour) * WeekCellsHeight;

          // Find a column for this event
          let columnIndex = 0;
          let placed = false;

          while (!placed) {
            console.debug({ columnIndex });
            const col = columns[columnIndex] || [];
            if (col.length === 0) {
              columns[columnIndex] = col;
              placed = true;
            } else {
              const overlaps = col.some((c) =>
                areIntervalsOverlapping(
                  { start: adjustedStart, end: adjustedEnd },
                  {
                    start: new Date(c.event.start),
                    end: new Date(addMinutes(new Date(c.event.start), event.duration)),
                  },
                ),
              );
              if (!overlaps) {
                placed = true;
              } else {
                columnIndex++;
              }
            }
          }

          // Ensure column is initialized before pushing
          const currentColumn = columns[columnIndex] || [];
          columns[columnIndex] = currentColumn;
          currentColumn.push({ event, end: adjustedEnd });

          // Calculate width and left position based on number of columns
          const width = columnIndex === 0 ? 1 : 0.9;
          const left = columnIndex === 0 ? 0 : columnIndex * 0.1;

          console.debug({ event, top });

          positionedEvents.push({
            event,
            top,
            height,
            left,
            width,
            zIndex: 10 + columnIndex, // Higher columns get higher z-index
          });
        }

        return positionedEvents;
      }),
    [days, events],
  );

  const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    onEventSelect(event);
  };

  const { currentTimePosition, currentTimeVisible } =
    useCurrentTimeIndicator(currentDate);

  const todayRef = React.useRef<HTMLDivElement>(null);
  // biome-ignore lint/correctness/useExhaustiveDependencies:
  React.useEffect(() => {
    if (todayRef.current) {
      todayRef.current.scrollIntoView({ inline: "center" });
    }
  }, [todayRef.current]);

  return (
    <div
      data-slot="week-view"
      className="flex h-full overflow-auto w-full [---coef:0.875] md:[---coef:0.9375]"
      style={{ "---cols": +visibleDays }}
    >
      <aside className="w-1/8 md:w-1/16">
        <div className="text-muted-foreground/70 py-2 text-center text-sm bg-background/80 border-border/70 sticky top-0 z-30 border-y backdrop-blur-md">
          <span className="text-xs">{format(new Date(), "O")}</span>
        </div>

        <div className="border-border/70 grid auto-cols-fr">
          {hours.map((hour, index) => (
            <div
              key={hour.toString()}
              className="border-border/70 relative min-h-[var(--week-cells-height)] border-b last:border-b-0"
            >
              {index > 0 && (
                <span className="bg-card text-muted-foreground/70 absolute -top-3 left-0 flex h-6 w-16 max-w-full items-center justify-end pe-2 text-[10px] sm:pe-4 sm:text-xs">
                  {format(hour, "HH:mm")}
                </span>
              )}
            </div>
          ))}
        </div>
      </aside>

      <main className="w-7/8 md:w-15/16 h-full overflow-auto">
        <div className="flex">
          {days.map((day, idx) => (
            <div
              key={day.toString()}
              className="border-r flex-[0_0_calc(100%/var(---cols))]"
            >
              <div
                className="data-today:text-foreground data-today:font-medium text-muted-foreground/70 py-2 text-center text-sm bg-background/80 border-border/70 sticky top-0 z-30 border-y backdrop-blur-md"
                data-today={isToday(day) || undefined}
                ref={(d) => {
                  if (isSameDay(day, currentDate)) {
                    todayRef.current = d;
                  }
                }}
              >
                <span className="sm:hidden" aria-hidden="true">
                  {format(day, "E")[0]} {format(day, "d")}
                </span>
                <span className="max-sm:hidden">{format(day, "EEE dd")}</span>
              </div>
              <div
                className="border-border/70 relative grid auto-cols-fr border-r last:border-r-0"
                data-today={isToday(day) || undefined}
              >
                {(processedDayEvents[idx] ?? []).map((positionedEvent) => (
                  // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                  <div
                    key={positionedEvent.event.id}
                    className="absolute z-10 px-0.5"
                    style={{
                      top: `${positionedEvent.top}px`,
                      height: `${positionedEvent.height}px`,
                      left: `${positionedEvent.left * 100}%`,
                      width: `${positionedEvent.width * 100}%`,
                      zIndex: positionedEvent.zIndex,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="size-full">
                      <DraggableEvent
                        event={positionedEvent.event}
                        onClick={(e) => handleEventClick(positionedEvent.event, e)}
                        height={positionedEvent.height}
                      />
                    </div>
                  </div>
                ))}

                {currentTimeVisible && isToday(day) && (
                  <div
                    className="pointer-events-none absolute right-0 left-0 z-20"
                    style={{ top: `${currentTimePosition}%` }}
                  >
                    <div className="relative flex items-center">
                      <div className="bg-primary absolute -left-1 h-2 w-2 rounded-full" />
                      <div className="bg-primary h-[2px] w-full" />
                    </div>
                  </div>
                )}

                {hours.map((hour) => {
                  const hourValue = getHours(hour);
                  return (
                    <div
                      key={hour.toString()}
                      className="border-border/70 relative min-h-[var(--week-cells-height)] border-b last:border-b-0"
                    >
                      {[0, 1, 2, 3].map((quarter) => {
                        const quarterHourTime = hourValue + quarter * 0.25;
                        return (
                          <DroppableCell
                            key={`${hour.toString()}-${quarter}`}
                            id={`week-cell-${day.toISOString()}-${quarterHourTime}`}
                            date={day}
                            time={quarterHourTime}
                            className={cx(
                              "absolute h-[calc(var(--week-cells-height)/4)] w-full",
                              quarter === 0 && "top-0",
                              quarter === 1 && "top-[calc(var(--week-cells-height)/4)]",
                              quarter === 2 && "top-[calc(var(--week-cells-height)/4*2)]",
                              quarter === 3 && "top-[calc(var(--week-cells-height)/4*3)]",
                            )}
                            onClick={() =>
                              onEventCreate(
                                set(day, {
                                  hours: hour.getHours(),
                                  minutes: hour.getMinutes(),
                                  seconds: 0,
                                  milliseconds: 0,
                                }),
                              )
                            }
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
