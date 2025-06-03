import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { Button, Card, Input, Select, Textarea } from "@tau/ui";
import type React from "react";
import { useEffect, useState } from "react";
import { api } from "~/lib/api";
import { newIsoDate, type isoDate } from "~/lib/types";
import { format } from "date-fns";
import * as v from "valibot";
import { ids } from "@tau/db/ids";
import { useSuspenseQuery } from "@tanstack/react-query";

// Status options for the dropdown
const statusOptions = [
  { label: "Draft", value: "draft" },
  // { label: "Scheduled", value: "scheduled" },
  // { label: "Active", value: "active" },
  // { label: "Completed", value: "completed" },
  // { label: "Archived", value: "archived" },
];

// Duration options in minutes
const durationOptions = [
  { label: "15 minutes", value: "15" },
  { label: "30 minutes", value: "30" },
  { label: "45 minutes", value: "45" },
  { label: "60 minutes", value: "60" },
  { label: "90 minutes", value: "90" },
];

export const Route = createFileRoute("/app/interview-rounds/edit/$roundId")({
  // params: {
  //   parse: (p) => v.parse(v.object({ roundId: ids.interview_round }), p),
  // },
  // This route will likely need an ID, e.g., /app/interview-rounds/$roundId/edit
  // For now, let's assume the ID is passed via a different mechanism or a more specific route is created.
  // If using a route parameter like $roundId, you'd use loader to fetch data.
  // For simplicity in this scaffold, we'll assume an ID is somehow provided.
  // A more robust solution would involve a loader:
  loader: async ({ params, context }) => {
    const roundId = params.roundId as ids.interview_round; // Assuming roundId is in params
    await context.queryClient.ensureQueryData(
      api.interviewRounds.queries.id(roundId)
    );
  },
  component: EditInterviewRound,
});

// Helper to format isoDate to YYYY-MM-DD for input[type="date"]
const formatDateForInput = (
  dateString: isoDate | Date | string | null | undefined
): string => {
  if (!dateString) return "";
  try {
    // If it's already a Date object, format it. Otherwise, parse then format.
    const date =
      typeof dateString === "string" ? new Date(dateString) : dateString;
    return format(date, "yyyy-MM-dd");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

function EditInterviewRound() {
  const navigate = useNavigate({ from: Route.fullPath });
  // This is a placeholder. In a real scenario, you'd get the roundId from route params.
  const { roundId } = useParams({ from: Route.fullPath }); // Assuming roundId is part of this route's params if structured like /edit/$roundId

  // Fetch existing round data - this would typically use the loader data
  // For now, let's use a query.
  const { data: existingRound } = useSuspenseQuery(
    api.interviewRounds.queries.id(roundId as ids.interview_round)
  );

  const updateRound = api.interviewRounds.useUpdate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    interview_duration: "45",
    status: "draft",
    start_date: "",
    end_date: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (existingRound) {
      setFormData({
        title: existingRound.title || "",
        description: existingRound.description || "",
        interview_duration:
          existingRound.interview_duration?.toString() || "45",
        status: existingRound.status || "draft",
        start_date: formatDateForInput(existingRound.start_date),
        end_date: formatDateForInput(existingRound.end_date),
      });
    }
  }, [existingRound]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (
    value: string,
    fieldName: keyof typeof formData
  ) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    if (errors[fieldName]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors["title"] = "Title is required";
    if (!formData.interview_duration)
      newErrors["interview_duration"] = "Interview duration is required";
    if (!formData.status) newErrors["status"] = "Status is required";
    if (formData.status !== "draft" && !formData.start_date)
      newErrors["start_date"] = "Start date is required for non-draft rounds";
    if (formData.start_date && formData.end_date) {
      const startDate = new Date(formData.start_date);
      const endDate = new Date(formData.end_date);
      if (startDate >= endDate)
        newErrors["end_date"] = "End date must be after start date";
    }
    if (formData.start_date === "" && formData.status !== "draft") {
      newErrors["start_date"] = "Start date is required";
    }

    if (formData.end_date === "" && formData.start_date !== "") {
      // Only require end_date if start_date is present
      newErrors["end_date"] = "End date is required if start date is specified";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !existingRound?.id) return;

    console.log("Submitting form with data:", formData);

    updateRound.mutate({
      id: existingRound.id,
      title: formData.title,
      description: formData.description,
      duration: Number.parseInt(formData.interview_duration),
      period: {
        start: newIsoDate(formData.start_date),
        end: newIsoDate(formData.end_date),
      },
    });
    navigate({ to: "/app/interview-rounds" });
  };

  const handleCancel = () => {
    navigate({ to: "/app/interview-rounds" });
  };

  if (!existingRound) {
    return (
      <div className="container mx-auto py-6">Interview round not found.</div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Interview Round</h1>
      </div>
      <Card.Root className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title <span className="text-red-600">*</span>
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Frontend Developer - Q2 2025"
                className="w-full"
              />
              {errors["title"] && (
                <p className="text-sm text-red-600 mt-1">{errors["title"]}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-1"
              >
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Briefly describe this interview round"
                className="w-full h-24"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="interview_duration"
                  className="block text-sm font-medium mb-1"
                >
                  Interview Duration <span className="text-red-600">*</span>
                </label>
                <Select.Root
                  value={formData.interview_duration}
                  onValueChange={(value) =>
                    handleSelectChange(value, "interview_duration")
                  }
                >
                  <Select.Trigger className="w-full" id="interview_duration">
                    <Select.Value placeholder="Select interview duration" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Group>
                      <Select.Label>Interview Duration</Select.Label>
                      {durationOptions.map((option) => (
                        <Select.Item key={option.value} value={option.value}>
                          {option.label}
                        </Select.Item>
                      ))}
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
                {errors["interview_duration"] && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors["interview_duration"]}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium mb-1"
                >
                  Status <span className="text-red-600">*</span>
                </label>
                <Select.Root
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange(value, "status")}
                >
                  <Select.Trigger className="w-full" id="status">
                    <Select.Value placeholder="Select status" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Group>
                      <Select.Label>Interview Status</Select.Label>
                      {statusOptions.map((option) => (
                        <Select.Item key={option.value} value={option.value}>
                          {option.label}
                        </Select.Item>
                      ))}
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
                {errors["status"] && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors["status"]}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="start_date"
                  className="block text-sm font-medium mb-1"
                >
                  Start Date{" "}
                  {formData.status !== "draft" && (
                    <span className="text-red-600">*</span>
                  )}
                </label>
                <Input
                  type="date"
                  id="start_date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  className="w-full"
                />
                {errors["start_date"] && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors["start_date"]}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="end_date"
                  className="block text-sm font-medium mb-1"
                >
                  End Date
                </label>
                <Input
                  type="date"
                  id="end_date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                  className="w-full"
                  min={formData.start_date || undefined} // Ensure min is only set if start_date exists
                />
                {errors["end_date"] && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors["end_date"]}
                  </p>
                )}
              </div>
            </div>
          </div>
          {errors["form"] && (
            <p className="text-sm text-red-600 mt-1">{errors["form"]}</p>
          )}
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={updateRound.isPending}>
              {updateRound.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card.Root>
    </div>
  );
}
