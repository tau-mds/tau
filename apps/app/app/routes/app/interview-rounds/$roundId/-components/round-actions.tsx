import React from "react";
import { Button, toast, Card } from "@tau/ui";
import { api } from "~/lib/api";
import { ids } from "@tau/db/ids";
import { useSuspenseQuery } from "@tanstack/react-query";

export type RoundActionsProps = {
  roundId: ids.interview_round;
};

export function RoundActions({ roundId }: RoundActionsProps) {
  const roundQuery = useSuspenseQuery(api.interviewRounds.queries.id(roundId));
  const schedule = api.interviewRounds.useSchedule();
  const open = api.interviewRounds.useOpen();
  const close = api.interviewRounds.useClose();

  const status = roundQuery.data?.status;

  const getButtonVariant = (action: string, currentStatus: string) => {
    if (
      (action === "schedule" && currentStatus === "draft") ||
      (action === "open" && currentStatus === "schedule") ||
      (action === "close" && currentStatus === "open")
    ) {
      return "default";
    }
    return "secondary";
  };

  return (
    <Card.Root>
      <Card.Content className="p-6">
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            onClick={() => schedule.mutate({ id: roundId })}
            disabled={status !== "draft" || schedule.isPending}
            variant={getButtonVariant("schedule", status || "")}
            className="min-w-[140px]"
          >
            {schedule.isPending ? "Scheduling..." : "Schedule Round"}
          </Button>

          <Button
            onClick={() => open.mutate({ id: roundId })}
            disabled={status !== "schedule" || open.isPending}
            variant={getButtonVariant("open", status || "")}
            className="min-w-[140px]"
          >
            {open.isPending ? "Opening..." : "Open Round"}
          </Button>

          <Button
            onClick={() => close.mutate({ id: roundId })}
            disabled={status !== "open" || close.isPending}
            variant={getButtonVariant("close", status || "")}
            className="min-w-[140px]"
          >
            {close.isPending ? "Closing..." : "Close Round"}
          </Button>
        </div>
      </Card.Content>
    </Card.Root>
  );
}
