import { useSuspenseQuery } from "@tanstack/react-query";
import type { ids } from "@tau/db/ids";
import { Editable, Text } from "@tau/ui";

import { api } from "~/lib/api";
import { interviewRound } from "~/lib/core/interview-round";

export namespace TitleField {
  export type Props = { roundId: ids.interview_round };
}

export function TitleField(props: TitleField.Props) {
  const roundQuery = useSuspenseQuery(api.interviewRounds.queries.id(props.roundId));
  const update = api.interviewRounds.useUpdate();

  if (roundQuery.data.status !== interviewRound.draft) {
    return (
      <Text size="small" as="span">
        {roundQuery.data.title}
      </Text>
    );
  }

  return (
    <Text size="small" as="span">
      <Editable.Root
        defaultValue={roundQuery.data.title}
        onValueCommit={(d) => update.mutate({ id: props.roundId, title: d.value })}
        autoResize
        selectOnFocus={false}
        disabled={!interviewRound.editable(roundQuery.data)}
      >
        <Editable.Area>
          <Editable.Input className="outline-none" />
          <Editable.Preview />
        </Editable.Area>
      </Editable.Root>
    </Text>
  );
}
