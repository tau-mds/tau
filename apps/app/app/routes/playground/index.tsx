import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ids } from "@tau/db/ids";
import { Button, Card, Text } from "@tau/ui";
import { format } from "date-fns";
import * as v from "valibot";
import { api } from "~/lib/api";
import { isoDate } from "~/lib/types";
import { useState } from "react";

export const Route = createFileRoute("/playground/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    // Ensure initial data is loaded
    await context.queryClient.ensureQueryData(
      api.interviewRounds.queries.all()
    );
  },
});

function RouteComponent() {
  // State to hold the ID of the currently selected/testable interview round
  // r.id from schema.interview_round is typically a string.
  const [currentTestRoundId, setCurrentTestRoundId] = useState<string | null>(
    null
  );

  // TanStack Query hooks for mutations
  const createRound = api.interviewRounds.useCreate();
  const updateRound = api.interviewRounds.useUpdate();
  const updateInterviewees = api.interviewRounds.useUpdateInterviewees();
  const updateInterviewers = api.interviewRounds.useUpdateInterviewers();
  const schedule = api.interviewRounds.useSchedule();
  const open = api.interviewRounds.useOpen();
  const close = api.interviewRounds.useClose();

  // Fetch all interview rounds
  const roundsQuery = useSuspenseQuery(api.interviewRounds.queries.all());

  const handleCreateRound = () => {
    const newRoundTitle = `Test Round ${new Date().toISOString()}`;
    createRound.mutate(
      {
        title: newRoundTitle,
        description: "Created from test playground",
        duration: 60, // Example duration
        period: {
          // Ensure dates are valid and parsed correctly by Valibot
          // v.parse(isoDate, ...) will typically return a Date object if isoDate schema handles parsing
          // Or it might return a validated string; ensure backend handles it.
          // Assuming isoDate parses to a string format that backend's new Date() can consume.
          start: v.parse(
            isoDate,
            new Date(Date.now() + 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0]
          ), // Tomorrow
          end: v.parse(
            isoDate,
            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0]
          ), // Approx a month from now
        },
      },
      {
        onSuccess: () => {
          // Invalidation in useCreate's onSettled will refetch roundsQuery.
          // User will then need to select the new round from the list.
          // Optionally, you could try to find and auto-select the newest round here,
          // but manual selection is often clearer in a playground.
          console.log(
            "Interview round created. Please select it from the list below to proceed."
          );
        },
        onError: (error) => {
          console.error("Failed to create round:", error);
          alert(`Failed to create round: ${error.message}`);
        },
      }
    );
  };

  // Helper to ensure an ID is selected before mutation
  const ensureRoundSelected = (): ids.interview_round | null => {
    if (!currentTestRoundId) {
      alert("Please create and select an interview round first.");
      return null;
    }
    // Parse/validate the string ID using the Valibot schema
    // This ensures it's the correct format/brand expected by the backend.
    try {
      return v.parse(ids.interview_round, currentTestRoundId);
    } catch (e) {
      alert(`Invalid Round ID format: ${currentTestRoundId}`);
      console.error("ID parsing error:", e);
      return null;
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Interview Workflow Playground</h1>

      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          border: "1px solid #eee",
          borderRadius: "8px",
        }}
      >
        <h2>Workflow Control Panel</h2>
        <Text size="small" style={{ color: "#555", marginBottom: "15px" }}>
          {currentTestRoundId
            ? `Operating on Round ID: ${currentTestRoundId}`
            : "No round selected. Please 'Create' then 'Select' a round below."}
        </Text>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          {/* Step 1: Create Interview Round */}
          <Button onClick={handleCreateRound} disabled={createRound.isPending}>
            {createRound.isPending
              ? "Creating..."
              : "1. Create Interview Round"}
          </Button>

          {/* Step 2: Set Interviewers */}
          <Button
            onClick={() => {
              const roundId = ensureRoundSelected();
              if (!roundId) return;
              updateInterviewers.mutate({
                id: roundId,
                updated: [
                  {
                    email: `iulian.stefan.rizescu@gmail.com`,
                    interviewsCount: 3,
                  },
                ],
                revoked: [], // Example: revoked: ["old.interviewer@example.com"]
              });
            }}
            disabled={!currentTestRoundId || updateInterviewers.isPending}
          >
            {updateInterviewers.isPending
              ? "Setting..."
              : "2. Set Interviewers"}
          </Button>

          {/* Step 3: Set Interviewees */}
          <Button
            onClick={() => {
              const roundId = ensureRoundSelected();
              if (!roundId) return;
              updateInterviewees.mutate({
                id: roundId,
                invited: [`iulian.stefan.rizescu@gmail.com`],
                revoked: [], // Example: revoked: ["old.candidate@example.com"]
              });
            }}
            disabled={!currentTestRoundId || updateInterviewees.isPending}
          >
            {updateInterviewees.isPending
              ? "Setting..."
              : "3. Set Interviewees"}
          </Button>

          {/* Step 4: Schedule Round */}
          <Button
            onClick={() => {
              const roundId = ensureRoundSelected();
              if (!roundId) return;
              schedule.mutate({ id: roundId });
            }}
            disabled={!currentTestRoundId || schedule.isPending}
          >
            {schedule.isPending ? "Scheduling..." : "4. Schedule Round"}
          </Button>

          {/* Step 5: Open Round */}
          <Button
            onClick={() => {
              const roundId = ensureRoundSelected();
              if (!roundId) return;
              open.mutate({ id: roundId });
            }}
            disabled={!currentTestRoundId || open.isPending}
          >
            {open.isPending ? "Opening..." : "5. Open Round"}
          </Button>

          {/* Step 6: Close Round */}
          <Button
            onClick={() => {
              const roundId = ensureRoundSelected();
              if (!roundId) return;
              close.mutate({ id: roundId });
            }}
            disabled={!currentTestRoundId || close.isPending}
          >
            {close.isPending ? "Closing..." : "6. Close Round"}
          </Button>
        </div>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          {/* Optional: Update general round details (not a primary workflow step but useful) */}
          <Button
            onClick={() => {
              const roundId = ensureRoundSelected();
              if (!roundId) return;
              updateRound.mutate({
                id: roundId,
                title: `Updated Title @ ${new Date().toLocaleTimeString()}`,
                description:
                  "This description was updated from the playground.",
                // duration: 45,
                // period can also be updated if needed
              });
            }}
            disabled={!currentTestRoundId || updateRound.isPending}
          >
            {updateRound.isPending
              ? "Updating Title..."
              : "Update Selected Round Details"}
          </Button>
        </div>
      </div>

      <hr style={{ margin: "30px 0" }} />

      <h2>Available Interview Rounds</h2>
      <Text size="small" style={{ color: "#555", marginBottom: "15px" }}>
        Click on a round to select it for actions above.
      </Text>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "15px",
        }}
      >
        {roundsQuery.data && roundsQuery.data.length > 0 ? (
          roundsQuery.data.map((r) => (
            <Card.Root
              key={r.id}
              onClick={() => setCurrentTestRoundId(r.id)}
              style={{
                cursor: "pointer",
                border:
                  currentTestRoundId === r.id
                    ? "3px solid dodgerblue"
                    : "1px solid #ddd",
                padding: "15px",
                borderRadius: "8px",
                boxShadow:
                  currentTestRoundId === r.id
                    ? "0 4px 8px rgba(0,0,0,0.1)"
                    : "none",
                transition: "all 0.2s ease-in-out",
              }}
            >
              <Card.Title style={{ marginBottom: "8px" }}>
                {r.title} -{" "}
                <Text
                  color={
                    r.status === "DRAFT"
                      ? "grey"
                      : r.status === "SCHEDULE"
                      ? "orange"
                      : r.status === "OPEN"
                      ? "green"
                      : r.status === "CLOSED"
                      ? "red"
                      : "black"
                  }
                  weight="bold"
                  size="small"
                  style={{ textTransform: "uppercase" }}
                >
                  {r.status}
                </Text>
              </Card.Title>
              <Card.Description
                style={{
                  fontSize: "0.9em",
                  color: "#444",
                  marginBottom: "10px",
                }}
              >
                <Text
                  block
                  size="xsmall"
                  style={{ color: "#777", marginBottom: "5px" }}
                >
                  ID: {r.id}
                </Text>
                {r.description && (
                  <Text block size="small" style={{ marginBottom: "5px" }}>
                    {r.description}
                  </Text>
                )}
              </Card.Description>
              <Card.Content style={{ fontSize: "0.85em", color: "#555" }}>
                Period:{" "}
                {r.start_date
                  ? format(new Date(r.start_date), "dd MMM yyyy")
                  : "N/A"}{" "}
                -{" "}
                {r.end_date
                  ? format(new Date(r.end_date), "dd MMM yyyy")
                  : "N/A"}{" "}
                <br />
                Duration: {r.interview_duration} mins <br />
                Organizer: <Text size="xsmall">{r.organizer_id}</Text>
              </Card.Content>
            </Card.Root>
          ))
        ) : (
          <Text>
            No interview rounds found. Click "Create Interview Round" to begin.
          </Text>
        )}
      </div>

      <details style={{ marginTop: "30px" }}>
        <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
          Show Raw Rounds Data
        </summary>
        <pre
          style={{
            backgroundColor: "#f0f0f0",
            padding: "15px",
            borderRadius: "4px",
            overflowX: "auto",
            maxHeight: "400px",
          }}
        >
          {JSON.stringify(roundsQuery.data, null, 2)}
        </pre>
      </details>
    </div>
  );
}
