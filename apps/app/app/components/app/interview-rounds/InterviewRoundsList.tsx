import { Link } from "@tanstack/react-router";
import { Avatar, Badge, Button, Card, Dialog, Separator } from "@tau/ui";
import type { mockInterviewRounds } from "~/routes/app/interview-rounds";
import CalendarIcon from "~icons/radix-icons/calendar";
import ClockIcon from "~icons/radix-icons/clock";
import Pencil1Icon from "~icons/radix-icons/pencil-1";
import TrashIcon from "~icons/radix-icons/trash";
import { CardDescriptionInterviewRound } from "./CardDescriptionInterviewRount";
import type { schema } from "@tau/db";
import { useNavigate } from "@tanstack/react-router";
import { api } from "~/lib/api";
import { Brand } from "valibot";

interface InterviewRoundsListProps {
  interviewRounds: schema.interview_round[];
  organizer: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null | undefined | undefined | undefined;
  };
}

export function InterviewRoundsList({
  interviewRounds,
  organizer,
}: InterviewRoundsListProps) {
  const navigate = useNavigate({ from: "/app/interview-rounds" });
  const deleteRound = api.interviewRounds.useDelete();

  const statusToVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "open": // Handles "open" status
        return "default";
      case "schedule": // Handles "schedule" status
        return "secondary";
      case "draft":
        return "outline";
      case "closed": // Handles "closed" status
        return "secondary"; // Using "secondary" for these non-active states
      default:
        return "default"; // Fallback for any other status
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Not set";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };
  const handleDelete = async (roundId: string) => {
    try {
      // Logic to delete the interview round
      deleteRound.mutate({ id: roundId as string & Brand<"ivro_id"> });
      // Optionally, you can show a success message or refresh the list
      navigate({ to: "/app/interview-rounds" });
    } catch (error) {
      console.error("Error deleting interview round:", error);
      // Optionally, you can show an error message to the user
      alert("Failed to delete the interview round. Please try again.");
    }
  };

  if (interviewRounds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
        <svg
          width="64"
          height="64"
          fill="none"
          viewBox="0 0 64 64"
          className="mb-4 opacity-60"
        >
          <title>Not Found</title>
          <circle cx="32" cy="32" r="30" stroke="#d1d5db" strokeWidth="4" />
          <path
            d="M20 32h24M32 20v24"
            stroke="#a1a1aa"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <h2 className="text-xl font-semibold mb-2">
          No interview rounds found
        </h2>
        <p className="mb-4">
          Try adjusting your search or create a new interview round to get
          started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {interviewRounds.map((round) => (
        <Card.Root key={round.id} className="overflow-hidden">
          <Card.Header>
            <div className="flex justify-between">
              <Badge variant={statusToVariant(round.status)}>
                {round.status.charAt(0).toUpperCase() + round.status.slice(1)}
              </Badge>
              <div className="flex space-x-1">
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <Button variant="ghost" size="icon">
                      <Pencil1Icon className="h-4 w-4" />
                    </Button>
                  </Dialog.Trigger>

                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>
                        Are you sure you want to edit this round?
                      </Dialog.Title>
                      <Dialog.Description>
                        This action will redirect you to the edit page where you
                        can modify the details of this interview round.
                      </Dialog.Description>
                    </Dialog.Header>
                    <Dialog.Footer>
                      <Button
                        variant="default"
                        size="default"
                        onClick={() => {
                          // Logic to redirect to edit page
                          navigate({
                            to: "/app/interview-rounds/edit/$roundId",
                            params: { roundId: round.id },
                          });
                        }}
                      >
                        Edit Round
                      </Button>
                    </Dialog.Footer>
                  </Dialog.Content>
                </Dialog.Root>

                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <Button variant="ghost" size="icon">
                      <TrashIcon className="h-4 w-4 text-destructive" />
                    </Button>
                  </Dialog.Trigger>

                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>
                        Are you sure you want to delete this round?
                      </Dialog.Title>
                      <Dialog.Description>
                        This action cannot be undone. All data related to this
                        interview round will be permanently deleted.
                      </Dialog.Description>
                    </Dialog.Header>
                    <Dialog.Footer>
                      <Button
                        variant="destructive"
                        size="default"
                        onClick={() => handleDelete(round.id)}
                      >
                        Delete
                      </Button>
                    </Dialog.Footer>
                  </Dialog.Content>
                </Dialog.Root>
              </div>
            </div>
            <Card.Title>{round.title}</Card.Title>
            <CardDescriptionInterviewRound description={round.description} />
          </Card.Header>
          <Separator />
          <Card.Content className="pt-4">
            <div className="flex items-center gap-2 text-sm mb-2">
              <ClockIcon className="h-4 w-4 text-muted-foreground" />
              <span>{round.interview_duration} minutes per interview</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span>
                {formatDate(round.start_date)} - {formatDate(round.end_date)}
              </span>
            </div>
          </Card.Content>
          <Separator />
          <Card.Footer className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar.Root className="h-8 w-8">
                <Avatar.Image
                  src={organizer.image || ""}
                  alt={organizer.name}
                />
                <Avatar.Fallback>
                  {organizer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Avatar.Fallback>
              </Avatar.Root>
              <div className="text-sm">
                <p className="font-medium">{organizer.name}</p>
                <p className="text-muted-foreground">Organizer</p>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link
                to="/app/interview-rounds/$roundId"
                params={{ roundId: round.id }}
              >
                View Details
              </Link>
            </Button>
          </Card.Footer>
        </Card.Root>
      ))}
    </div>
  );
}
