import { useSuspenseQuery } from "@tanstack/react-query";
import { format, isSameDay } from "date-fns";
import React from "react";

import type { ids } from "@tau/db/ids";
import { Button, Calendar, Popover, Text } from "@tau/ui";

import { api } from "~/lib/api";
import { interviewRound } from "~/lib/core/interview-round";
import { newIsoDate } from "~/lib/types";

export namespace IntervalField {
  export type Props = {
    roundId: ids.interview_round;
  };
}

export function IntervalField(props: IntervalField.Props) {
  const roundQuery = useSuspenseQuery(api.interviewRounds.queries.id(props.roundId));
  const update = api.interviewRounds.useUpdate();

  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState({
    start: roundQuery.data.start_date,
    end: roundQuery.data.end_date,
  });

  return (
    <Popover.Root
      open={interviewRound.editable(roundQuery.data) && open}
      onOpenChange={(opened) => {
        setOpen(opened);
        if (
          opened ||
          (isSameDay(selected.start, roundQuery.data.start_date) &&
            isSameDay(selected.end, roundQuery.data.end_date))
        ) {
          return;
        }

        update.mutate({
          id: props.roundId,
          period: { start: newIsoDate(selected.start), end: newIsoDate(selected.end) },
        });
      }}
    >
      <Popover.Trigger asChild className="self-end">
        <Button variant="ghost" className="px-0 max-w-min">
          <Text size="small">
            {format(selected.start, "dd MMM. yyyy")} -{" "}
            {format(selected.end, "dd MMM. yyyy")}
          </Text>
        </Button>
      </Popover.Trigger>

      <Popover.Content className="w-auto p-0" align="end">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={selected.start}
          selected={{ from: selected.start, to: selected.end ?? undefined }}
          numberOfMonths={1}
          onSelect={(selected) => {
            setSelected((prev) =>
              !selected
                ? prev
                : {
                    start: selected.from ?? prev.start,
                    end: selected.to ?? prev.end,
                  },
            );
          }}
        />
      </Popover.Content>
    </Popover.Root>
  );
}
