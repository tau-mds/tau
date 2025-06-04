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
    api.interviewRounds.queries.interviewers(props.roundId)
  );

  const [_added, _setAdded] = React.useState<
    Array<{ email: string; interviews_count: number }>
  >([]);
  const [_updated, setUpdated] = React.useState<
    Array<{ email: string; interviews_count: number }>
  >([]);
  const [_revoked, _setRevoked] = React.useState<Array<string>>([]);

  const [adding, setAdding] = React.useState(false);
  const [addEmail, setAddEmail] = React.useState("");
  const [addCount, setAddCount] = React.useState(1);

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
          <Table.Cell colSpan={2}>
            {adding ? (
              <form
                className="flex items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!addEmail.trim()) return;
                  _setAdded((prev) => [
                    ...prev,
                    { email: addEmail.trim(), interviews_count: addCount },
                  ]);
                  setAddEmail("");
                  setAddCount(1);
                  setAdding(false);
                }}
              >
                <label htmlFor="add-interviewer-email" className="sr-only">
                  Interviewer Email
                </label>
                <input
                  id="add-interviewer-email"
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  className="border rounded px-2 py-1 w-64"
                  value={addEmail}
                  onChange={(e) => setAddEmail(e.target.value)}
                  required
                  autoFocus
                />
                <input
                  type="number"
                  name="interviews_count"
                  min={1}
                  className="border rounded px-2 py-1 w-24"
                  value={addCount}
                  onChange={(e) => setAddCount(Number(e.target.value))}
                  required
                />
                <Button type="submit" size="sm" variant="primary">
                  Add
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setAdding(false);
                    setAddEmail("");
                    setAddCount(1);
                  }}
                >
                  Cancel
                </Button>
              </form>
            ) : (
              <Button variant="ghost" onClick={() => setAdding(true)}>
                Add
              </Button>
            )}
          </Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table.Root>
  );
}
