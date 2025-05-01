import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "@tau/auth-client";
import { Button, Dialog } from "@tau/ui";
import React, { useEffect } from "react";
import { env } from "~/lib/env";

// Import the queries for interview rounds from your server file
// !! REPLACE THIS PATH WITH THE ACTUAL PATH TO YOUR FILE !!
import { queries as interviewRoundQueries } from "~/lib/api/organizer"; // Assuming your file is named organizer-actions.ts

// Redefine the interface for the data structure expected from the server query
// Ensure this matches the ClientSideInterviewRound interface in your server file
interface InterviewRoundData {
  id: string;
  organizer_id: string;
  title: string;
  description: string | null;
  interview_duration: number | null;
  status: string;
  start_date: string; // ISO 8601 string
  end_date: string | null; // ISO 8601 string or null
  created_at: string; // ISO 8601 string
  updated_at: string; // ISO 8601 string
}

export const Route = createFileRoute("/_landing/")({
  component: Component,
  // Remove echo query preloading if you don't need it
  // loader: async (opts) => {
  //     opts.context.queryClient.ensureQueryData(
  //         echo.queries.plm({ salute: "Hi", message: "there" }),
  //     );
  // },
});

function Component() {
  const [count, setCount] = React.useState(0);
  // Remove echo query hook if you don't need it
  // const echoQuery = useSuspenseQuery(
  //     echo.queries.plm({ salute: "Hi", message: "there" }),
  // );

  const { data: sessionData } = authClient.useSession();

  // --- Fetch user's interview rounds using useQuery ---
  const {
    data: interviewRounds,
    isLoading: isLoadingRounds,
    isError: isFetchingError,
    error: fetchError,
  } = useQuery<InterviewRoundData[]>(
    interviewRoundQueries.userInterviewRounds()
  );
  // ---------------------------------------------------

  useEffect(() => {
    console.log("Auth session data:", sessionData);
    if (!sessionData?.user) {
      console.log("User not found in session data:", sessionData);
    }
  }, [sessionData]);

  return (
    <main>
      <h1>Proj. Tau</h1>

      <div className="inline-flex items-center justify-between gap-3">
        <Button size="icon" onClick={() => setCount((prev) => prev - 1)}>
          <span className="size-5 grid place-content-center">-</span>
        </Button>
        <p>{count}</p>
        <Button size="icon" onClick={() => setCount((prev) => prev + 1)}>
          <span className="size-5 grid place-content-center">+</span>
        </Button>

        <pre>{env.VITE_API_URL}</pre>
        {/* Remove echo query display */}
        {/* <pre>{JSON.stringify(echoQuery.data, null, 2)}</pre> */}
      </div>

      <hr style={{ margin: "20px 0" }} />

      {/* --- Display Hosted Rounds Section --- */}
      <h2>My Hosted Interview Rounds</h2>
      {isLoadingRounds && <div>Loading interview rounds...</div>}
      {isFetchingError && (
        <p style={{ color: "red" }}>
          Error loading rounds: {fetchError?.message}
        </p>
      )}
      {!isLoadingRounds &&
        !isFetchingError &&
        (!interviewRounds || interviewRounds.length === 0) && (
          <div>No interview rounds found.</div>
        )}
      {!isLoadingRounds &&
        !isFetchingError &&
        interviewRounds &&
        interviewRounds.length > 0 && (
          <ul>
            {interviewRounds.map((round) => (
              <li key={round.id}>
                <strong>{round.title}</strong> ({round.status})
                <p>Description: {round.description || "N/A"}</p>
                <p>Starts: {new Date(round.start_date).toLocaleString()}</p>
                {round.end_date && (
                  <p>Ends: {new Date(round.end_date).toLocaleString()}</p>
                )}
                <p>Duration: {round.interview_duration || "N/A"} mins</p>
              </li>
            ))}
          </ul>
        )}
      {/* ------------------------------------ */}

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button>Open Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>Dialog Description</Dialog.Description>
          <Dialog.Close>Close</Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    </main>
  );
}
