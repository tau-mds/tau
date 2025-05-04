import { createFileRoute } from "@tanstack/react-router";
import { db } from "@tau/db";
import { Avatar, Badge, Button, Card, Dialog, Separator, Tabs } from "@tau/ui";

import CalendarIcon from "~icons/radix-icons/calendar";
import ClockIcon from "~icons/radix-icons/clock";
import PlusCircledIcon from "~icons/radix-icons/plus-circled";
import Pencil1Icon from "~icons/radix-icons/pencil-1";
import TrashIcon from "~icons/radix-icons/trash";

// Mock organizers
export const mockOrganizers = [
  {
    id: "org_01H1VFHFN4ZWP5KBGSYS8MCZPC",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    created_at: new Date("2024-12-05T10:30:00Z"),
    updated_at: new Date("2025-01-15T14:22:10Z"),
  },
  {
    id: "org_02M5VFHGR7ZWY9LPOTRX4DNZEF",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    created_at: new Date("2025-01-10T08:15:30Z"),
    updated_at: new Date("2025-01-10T08:15:30Z"),
  },
];

// Mock interview rounds with references to organizers
export const mockInterviewRounds = [
  {
    id: "ivro_01JT9632V1YKZXE3YFPG0QCV8P",
    organizer_id: mockOrganizers[0]?.id ?? null, // Sarah Johnson
    title: "Frontend Developer - Q2 2025",
    description:
      "Hiring round for senior frontend developers with React and TypeScript experience",
    interview_duration: 45, // minutes
    status: "scheduled",
    start_date: new Date("2025-06-01T09:00:00Z"),
    end_date: new Date("2025-06-14T18:00:00Z"),
    created_at: new Date("2025-05-01T14:32:10Z"),
    updated_at: new Date("2025-05-01T14:32:10Z"),
    // Add organizer object for eager loading
    organizer: mockOrganizers[0],
  },
  {
    id: "ivro_02KY8743M2ZNBWA4HJRT9BDV7Q",
    organizer_id: mockOrganizers[0]?.id ?? null, // Sarah Johnson
    title: "Backend Engineer - Platform Team",
    description:
      "Interviews for backend engineers with Node.js and database experience",
    interview_duration: 60, // minutes
    status: "active",
    start_date: new Date("2025-05-15T08:00:00Z"),
    end_date: new Date("2025-05-30T18:00:00Z"),
    created_at: new Date("2025-04-20T10:15:45Z"),
    updated_at: new Date("2025-05-02T09:12:30Z"),
    // Add organizer object for eager loading
    organizer: mockOrganizers[0],
  },
  {
    id: "ivro_03LZ9854P3QACXB5IKSU0CEW8R",
    organizer_id: mockOrganizers[1]?.id ?? null, // Michael Chen
    title: "Product Manager - Mobile Apps",
    description: null,
    interview_duration: 30, // minutes
    status: "draft",
    start_date: new Date("2025-07-10T09:00:00Z"),
    end_date: null,
    created_at: new Date("2025-05-03T16:48:22Z"),
    updated_at: new Date("2025-05-03T16:48:22Z"),
    // Add organizer object for eager loading
    organizer: mockOrganizers[1],
  },
];

export const Route = createFileRoute("/app/interview-rounds/")({
  component: RouteComponent,
  loader: () => {
    // In a real implementation, you would fetch from API/DB
    return {
      interviewRounds: mockInterviewRounds,
    };
  },
});

function RouteComponent() {
  const { interviewRounds } = Route.useLoaderData();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "green";
      case "scheduled":
        return "blue";
      case "draft":
        return "yellow";
      default:
        return "gray";
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

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Interview Rounds</h1>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button>
              <PlusCircledIcon />
              Create New Round
            </Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Create New Interview Round</Dialog.Title>
              <Dialog.Description>
                Set up a new interview round for your candidates.
              </Dialog.Description>
            </Dialog.Header>
            {/* Form would go here */}
            <Dialog.Footer>
              <Button variant="outline">Cancel</Button>
              <Button>Create Round</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>
      </div>

      <Tabs.Root defaultValue="all">
        <Tabs.List>
          <Tabs.Trigger value="all">All Rounds</Tabs.Trigger>
          <Tabs.Trigger value="active">Active</Tabs.Trigger>
          <Tabs.Trigger value="scheduled">Scheduled</Tabs.Trigger>
          <Tabs.Trigger value="draft">Drafts</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="all" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {interviewRounds.map((round) => (
              <Card.Root key={round.id} className="overflow-hidden">
                <Card.Header>
                  <div className="flex justify-between">
                    <Badge variant={getStatusColor(round.status)}>
                      {round.status.charAt(0).toUpperCase() +
                        round.status.slice(1)}
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
                  <Card.Description>
                    {round.description || "No description provided"}
                  </Card.Description>
                </Card.Header>
                <Separator />
                <Card.Content className="pt-4">
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <ClockIcon className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {round.interview_duration} minutes per interview
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {formatDate(round.start_date)} -{" "}
                      {formatDate(round.end_date)}
                    </span>
                  </div>
                </Card.Content>
                <Separator />
                <Card.Footer className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Avatar.Root className="h-8 w-8">
                      <Avatar.Image
                        src={round.organizer.image}
                        alt={round.organizer.name}
                      />
                      <Avatar.Fallback>
                        {round.organizer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Avatar.Fallback>
                    </Avatar.Root>
                    <div className="text-sm">
                      <p className="font-medium">{round.organizer.name}</p>
                      <p className="text-muted-foreground">Organizer</p>
                    </div>
                  </div>
                  <Button variant="outline">View Details</Button>
                </Card.Footer>
              </Card.Root>
            ))}
          </div>
        </Tabs.Content>
        <Tabs.Content value="active">
          {/* Filtered content for active rounds */}
        </Tabs.Content>
        <Tabs.Content value="scheduled">
          {/* Filtered content for scheduled rounds */}
        </Tabs.Content>
        <Tabs.Content value="draft">
          {/* Filtered content for draft rounds */}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
