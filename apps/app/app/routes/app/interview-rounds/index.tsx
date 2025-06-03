import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { Tabs } from "@tau/ui";
import * as v from "valibot";

import { HeaderInterviewRounds } from "~/components/app/interview-rounds/HeaderInterviewRounds";
import { InterviewRoundsList } from "~/components/app/interview-rounds/InterviewRoundsList";
import { api } from "~/lib/api";

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
  loaderDeps: ({ search: { status, search } }) => ({ status, search }),
  loader: async ({ deps, context }) => {
    let interviewRounds = await context.queryClient.fetchQuery(
      api.interviewRounds.queries.all()
    );
    console.log("Interview Rounds Loader Data:", interviewRounds);

    if (!interviewRounds) {
      // In a real implementation, you would fetch from API/DB
      return { interviewRounds: [] };
    }

    if (deps.search) {
      const search = deps.search;
      interviewRounds = interviewRounds.filter((round) =>
        round.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (!deps.status || deps.status === "all") {
      return {
        interviewRounds,
      };
    }
    // In a real implementation, you would fetch from API/DB
    return {
      interviewRounds: interviewRounds.filter(
        (round) => round.status === deps.status
      ),
    };
  },
  validateSearch: v.object({
    status: v.optional(v.string()),
    search: v.optional(v.string()),
  }),
});

function RouteComponent() {
  const { interviewRounds } = Route.useLoaderData();
  const navigate = useNavigate({ from: Route.fullPath });

  const handleTabChange = (value: string) => {
    // Handle tab change logic here
    console.log("Selected tab:", value);

    // navigate({ params: (prev) => ({ ...prev, status: value }) });
    navigate({ search: (prev) => ({ ...prev, status: value }) });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <HeaderInterviewRounds />

      <Tabs.Root defaultValue="all" onValueChange={handleTabChange}>
        <Tabs.List>
          <Tabs.Trigger value="all">All Rounds</Tabs.Trigger>
          <Tabs.Trigger value="draft">Drafts</Tabs.Trigger>
          <Tabs.Trigger value="open">Open</Tabs.Trigger>
          <Tabs.Trigger value="closed">Closed</Tabs.Trigger>
          <Tabs.Trigger value="schedule">Schedule</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="all" className="pt-4">
          <InterviewRoundsList interviewRounds={interviewRounds} />
        </Tabs.Content>
        <Tabs.Content value="draft">
          <InterviewRoundsList interviewRounds={interviewRounds} />
        </Tabs.Content>
        <Tabs.Content value="open">
          <InterviewRoundsList interviewRounds={interviewRounds} />
        </Tabs.Content>
        <Tabs.Content value="closed">
          <InterviewRoundsList interviewRounds={interviewRounds} />
        </Tabs.Content>
        <Tabs.Content value="schedule">
          <InterviewRoundsList interviewRounds={interviewRounds} />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
