import { useSuspenseQuery } from "@tanstack/react-query";
import type { ids } from "@tau/db/ids";
import { Button, CommandBar, Table } from "@tau/ui";
import React from "react";
import { api } from "~/lib/api";

import { cx } from "@tau/utils";
import Cross from "~icons/radix-icons/cross-2";
import Envelope from "~icons/radix-icons/envelope-closed";

export namespace IntervieweesTable {
  export type Props = {
    roundId: ids.interview_round;
  };
}

export function IntervieweesTable(props: IntervieweesTable.Props) {
  const interviewersQuery = useSuspenseQuery(
    api.interviewRounds.queries.interviewees(props.roundId)
  );

  const updateInterviewees = api.interviewRounds.useUpdateInterviewees();

  const [added, setAdded] = React.useState<Set<string>>(new Set());
  const [revoked, setRevoked] = React.useState<Set<string>>(new Set());
  const [adding, setAdding] = React.useState<boolean>(false);

  const addingRef = React.useRef<HTMLInputElement>(null);

  const inviteInterviewees = () => {
    const addedArray = Array.from(added);
    const revokedArray = Array.from(revoked);
    console.log("Inviting interviewees:", addedArray);
    console.log("Revoking interviewees:", revokedArray);
    // Here you would typically call an API to invite the interviewees
    // and revoke the ones in the revoked set.
    // For example:
    // api.interviewRounds.mutations.inviteInterviewees({
    //   roundId: props.roundId,
    //   added: addedArray,
    //   revoked: revokedArray,
    // });
  };

  return (
    <>
      <CommandBar.Root open={added.size + revoked.size > 0} disableAutoFocus>
        <CommandBar.Bar>
          <CommandBar.Value>
            {added.size} invites, {revoked.size} revoked
          </CommandBar.Value>

          <CommandBar.Separator />

          <CommandBar.Command
            label="Save"
            action={inviteInterviewees}
            shortcut="S"
          />
        </CommandBar.Bar>
      </CommandBar.Root>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>
              <Envelope className="size-3 inline-block mr-1" /> Email
            </Table.Head>
            <Table.Head>
              <span className="sr-only">Actions</span>
            </Table.Head>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {interviewersQuery.data.map((interviewer) => (
            <Table.Row
              key={interviewer.email}
              className={cx(
                revoked.has(interviewer.email) &&
                  "bg-destructive-surface hover:bg-destructive-surface/80"
              )}
            >
              <Table.Cell>{interviewer.email}</Table.Cell>
              <Table.Cell>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-6"
                  onClick={() =>
                    setRevoked((prev) => {
                      const next = new Set(prev);
                      next.has(interviewer.email)
                        ? next.delete(interviewer.email)
                        : next.add(interviewer.email);
                      return next;
                    })
                  }
                >
                  <Cross className="size-4" />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}

          {[...added].map((added) => (
            <Table.Row
              key={added}
              className="bg-accent-surface text-accent-11 border-accent-11/10 hover:bg-accent-surface/80"
            >
              <Table.Cell>{added}</Table.Cell>

              <Table.Cell>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-6 hover:bg-accent-6/40 hover:text-accent-11"
                  onClick={() =>
                    setAdded((prev) => {
                      const next = new Set(prev);
                      next.delete(added);
                      return next;
                    })
                  }
                >
                  <Cross />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}

          {adding && (
            <Table.Row>
              <Table.Cell colSpan={2}>
                <form
                  className="flex items-center gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const interviewee =
                      new FormData(e.currentTarget)
                        .get("interviewee")
                        ?.toString()
                        ?.trim() ?? "";

                    if (!interviewee) {
                      setAdding(false);
                      return;
                    }

                    setAdded((prev) => new Set(prev).add(interviewee));
                    setAdding(false);
                  }}
                >
                  <label htmlFor="interviewee-input" className="sr-only">
                    Interviewee Email
                  </label>
                  <input
                    id="interviewee-input"
                    ref={addingRef}
                    name="interviewee"
                    type="email"
                    placeholder="Enter email address"
                    className="border rounded px-2 py-1 w-64"
                    autoFocus
                    required
                  />
                  <Button type="submit" size="sm" variant="primary">
                    Add
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => setAdding(false)}
                  >
                    Cancel
                  </Button>
                </form>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.Cell>
              <Button
                variant="ghost"
                onClick={() => {
                  setAdding(true);
                }}
              >
                Add
              </Button>
            </Table.Cell>
            <Table.Cell className="text-right">
              <Button
                onClick={inviteInterviewees}
                disabled={added.size + revoked.size === 0}
              >
                Send Invites
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table.Root>
    </>
  );
}
