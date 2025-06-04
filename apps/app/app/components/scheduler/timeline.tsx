import type { schema } from "@tau/db";
import { Text } from "@tau/ui";
import { cx } from "@tau/utils";
import {
  addHours,
  compareAsc,
  eachDayOfInterval,
  format,
  formatISO,
  getHours,
  getMinutes,
  isSameDay,
  isToday,
} from "date-fns";
import React from "react";
import { interviewRound, slot } from "~/lib/core";
import { constants } from "./constants";
import { InterviewSlot } from "./interview-slot";
import { Slot } from "./slot";

export namespace Timeline {
  export type Props = {
    interviewRound: interviewRound;
    slots: ReadonlyArray<schema.interview_slot>;
    cols: number;
    onSlotCreate: (start: Date) => void;
    onSlotClick?: (slotId: string) => void;
  };
}

export function Timeline(props: Timeline.Props) {
  const days = React.useMemo(
    () => eachDayOfInterval(props.interviewRound.period),
    [props.interviewRound.period]
  );

  const todayRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!todayRef.current) {
      return;
    }

    todayRef.current.scrollIntoView({ inline: "center" });
  }, []);

  const groupedSlots = Object.groupBy(props.slots, (s) =>
    formatISO(s.start_at, { representation: "date" })
  );

  return (
    <div
      data-slot="timeline"
      className="flex overflow-auto w-full [---coef:0.875] md:[---coef:0.9375]"
      style={{ "---cols": props.cols }}
    >
      <aside className="w-1/8 md:w-1/16">
        <div className="py-2 bg-background/80 text-center border-border/70 sticky top-0 z-30 border-y backdrop-blur-md">
          <Text as="span" size="xsmall" leading="compact">
            {constants.TIME_ZONE}
          </Text>
        </div>

        <div className="border-border/70 grid auto-cols-fr">
          <div className="h-8" />

          {[
            ...constants.DAY_HOURS,
            addHours(constants.DAY_HOURS.at(-1), 1),
          ].map((hour) => (
            <time
              key={hour.toString()}
              className="border-border/70 relative min-h-(--week-cells-height) border-b last:border-b-0"
            >
              <Text
                size="xsmall"
                leading="compact"
                className="bg-card absolute text-muted-foreground/70 -top-3 left-0 flex h-6 w-16 max-w-full items-center justify-end pe-2"
              >
                {format(hour, "HH:mm")}
              </Text>
            </time>
          ))}
        </div>
      </aside>

      <main className="w-7/8 md:w-15/16 h-full overflow-auto">
        <div className="flex">
          {days.map((day) => (
            <div
              key={day.toString()}
              className="border-r flex-[0_0_calc(100%/var(---cols))]"
              ref={(ref) => {
                if (isSameDay(day, new Date())) {
                  todayRef.current = ref;
                }
              }}
            >
              <div
                className="data-today:text-foreground data-today:font-medium text-muted-foreground/70 py-2 text-center bg-background/80 border-border/70 sticky top-0 z-30 border-y backdrop-blur-md"
                data-today={isToday(day) || undefined}
              >
                <Text as="span" size="small">
                  <span className="sm:hidden" aria-hidden="true">
                    {format(day, "E")[0]} {format(day, "d")}
                  </span>
                  <span className="max-sm:hidden">{format(day, "EEE dd")}</span>
                </Text>
              </div>

              <div
                className="border-border/70 relative grid auto-cols-fr border-r last:border-r-0"
                data-today={isToday(day) || undefined}
              >
                <div className="h-8 border-b foo" />

                {groupedSlots[formatISO(day, { representation: "date" })]
                  ?.toSorted((sa, sb) => compareAsc(sa.start_at, sb.start_at))
                  .map((s) => {
                    const startHour =
                      getHours(s.start_at) + getMinutes(s.start_at) / 60;
                    const end = slot.end(
                      s.start_at,
                      props.interviewRound.duration
                    );
                    const endHour = getHours(end) + getMinutes(end) / 60;
                    const top = 32 + (startHour - constants.DAY_START) * 64;
                    const height = (endHour - startHour) * 64;

                    return {
                      ...s,
                      position: { top, height, left: 0, width: 1, zIndex: 10 },
                    };
                  })
                  .map((slot) => (
                    // biome-ignore lint/a11y/useKeyWithClickEvents:
                    <div
                      key={slot.id}
                      className="absolute z-10 px-0.5"
                      style={{
                        top: `${slot.position.top}px`,
                        height: `${slot.position.height}px`,
                        left: `${slot.position.left * 100}%`,
                        width: `${slot.position.width * 100}%`,
                        zIndex: slot.position.zIndex,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="size-full">
                        <InterviewSlot
                          slot={slot}
                          interviewRound={props.interviewRound}
                          onClick={
                            props.onSlotClick
                              ? () => {
                                  props.onSlotClick?.(slot.id);
                                }
                              : undefined
                          }
                        />
                      </div>
                    </div>
                  ))}

                {constants.DAY_HOURS.map((hour) => (
                  <div
                    key={hour.toString()}
                    className="border-border/70 relative min-h-[var(--week-cells-height)] border-b last:border-b-0"
                  >
                    {[0, 1, 2, 3].map((quarter) => (
                      <Slot
                        key={`${hour.toString()}-${quarter}`}
                        date={day}
                        hour={getHours(hour) + quarter * 0.25}
                        className={cx(
                          quarter === 0 && "top-0",
                          quarter === 1 &&
                            "top-[calc(var(--week-cells-height)/4)]",
                          quarter === 2 &&
                            "top-[calc(var(--week-cells-height)/4*2)]",
                          quarter === 3 &&
                            "top-[calc(var(--week-cells-height)/4*3)]"
                        )}
                        onClick={
                          interviewRound.editable(props.interviewRound)
                            ? props.onSlotCreate
                            : undefined
                        }
                      />
                    ))}
                  </div>
                ))}

                <div className="h-8 border-b foo" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
