import { useSuspenseQuery } from "@tanstack/react-query";
import type { ids } from "@tau/db/ids";
import { Button, Editable, Table } from "@tau/ui";
import React from "react";
import { api } from "~/lib/api";

import Envelope from "~icons/radix-icons/envelope-closed";

export namespace InterviewersTable {
  export type Props = {
    roundId: ids.interview_round;
  };
}

export function InterviewersTable(props: InterviewersTable.Props) {
  const interviewersQuery = useSuspenseQuery(
    api.interviewRounds.queries.interviewers(props.roundId),
  );

  const [_added, _setAdded] = React.useState<
    Array<{ email: string; interviews_count: number }>
  >([]);
  const [_updated, setUpdated] = React.useState<
    Array<{ email: string; interviews_count: number }>
  >([]);
  const [_revoked, _setRevoked] = React.useState<Array<string>>([]);

  return (
    <Table.Root className="max-w-min">
      <Table.Header>
        <Table.Row>
          <Table.Head>
            <Envelope className="size-3 inline-block mr-1" /> Email
          </Table.Head>

          <Table.Head className="text-right">Interviews count</Table.Head>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {interviewersQuery.data.map((interviewer) => (
          <Table.Row key={interviewer.email}>
            <Table.Cell>{interviewer.email}</Table.Cell>
            <Table.Cell className="text-right">
              <Editable.Root
                defaultValue={interviewer.interviews_count.toString()}
                selectOnFocus={false}
                onValueCommit={(d) => {
                  if (+d.value !== interviewer.interviews_count) {
                    setUpdated((prev) => [
                      ...prev,
                      { email: interviewer.email, interviews_count: +d.value },
                    ]);
                  }
                }}
              >
                <Editable.Area>
                  <Editable.Input type="number" className="outline-none" />
                  <Editable.Preview />
                </Editable.Area>
              </Editable.Root>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.Cell>
            <Button variant="ghost">Add</Button>
          </Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table.Root>
  );
}
