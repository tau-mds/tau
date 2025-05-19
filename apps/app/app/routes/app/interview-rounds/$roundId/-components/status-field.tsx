import { useSuspenseQuery } from "@tanstack/react-query";
import type { ids } from "@tau/db/ids";
import { Text } from "@tau/ui";

import { api } from "~/lib/api";
import type { interviewRound } from "~/lib/core/interview-round";

import { cx } from "@tau/utils";
import Calendar from "~icons/radix-icons/calendar";
import Pencil from "~icons/radix-icons/pencil-2";
import Rocket from "~icons/radix-icons/rocket";
import Timer from "~icons/radix-icons/timer";

export namespace StatusField {
  export type Props = { roundId: ids.interview_round };
}

export function StatusField(props: StatusField.Props) {
  const roundQuery = useSuspenseQuery(api.interviewRounds.queries.id(props.roundId));
  const option = options[roundQuery.data.status as interviewRound.status];

  return (
    <Text size="small">
      <option.icon className={cx("inline-block", option.color)} />

      <span className="ml-1">{option.label}</span>
    </Text>
  );
}

const options = {
  draft: { label: "Draft", color: "text-yellow-500", icon: Pencil },
  schedule: { label: "Schedule", color: "text-blue-500", icon: Calendar },
  open: { label: "Open", color: "text-green-500", icon: Rocket },
  closed: { label: "Closed", color: "text-red-500", icon: Timer },
} satisfies Record<
  interviewRound.status,
  { label: string; color: string; icon: unknown }
>;
