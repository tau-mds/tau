import { Avatar, Badge, Button, Card, Separator } from "@tau/ui";
import CalendarIcon from "~icons/radix-icons/calendar";
import ClockIcon from "~icons/radix-icons/clock";
import Pencil1Icon from "~icons/radix-icons/pencil-1";
import TrashIcon from "~icons/radix-icons/trash";
import { CardDescriptionInterviewRound } from "./CardDescriptionInterviewRount";
import type { schema } from "@tau/db";

interface InterviewRoundsListProps {
  interviewRounds: schema.interview_round[];
}

export function InterviewRoundsList({
  interviewRounds,
}: InterviewRoundsListProps) {
  const statusToVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "scheduled":
        return "secondary";
      case "draft":
        return "outline";
      default:
        return "default";
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
                <Button variant="ghost" size="icon">
                  <Pencil1Icon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <TrashIcon className="h-4 w-4 text-destructive" />
                </Button>
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
                  src={round.organizer?.image}
                  alt={round.organizer?.name}
                />
                <Avatar.Fallback>
                  {round.organizer?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Avatar.Fallback>
              </Avatar.Root>
              <div className="text-sm">
                <p className="font-medium">{round.organizer?.name}</p>
                <p className="text-muted-foreground">Organizer</p>
              </div>
            </div>
            <Button variant="outline">View Details</Button>
          </Card.Footer>
        </Card.Root>
      ))}
    </div>
  );
}
