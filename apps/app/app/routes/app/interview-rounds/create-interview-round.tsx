import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, Card, Input, Select, Textarea } from "@tau/ui";
import type React from "react";
import { useState } from "react";
import { api } from "~/lib/api";
import { newIsoDate } from "~/lib/types";

// Status options for the dropdown
const statusOptions = [{ label: "Draft", value: "draft" }];

// Duration options in minutes
const durationOptions = [
  { label: "15 minutes", value: "15" },
  { label: "30 minutes", value: "30" },
  { label: "45 minutes", value: "45" },
  { label: "60 minutes", value: "60" },
  { label: "90 minutes", value: "90" },
];

export const Route = createFileRoute(
  "/app/interview-rounds/create-interview-round"
)({
  component: CreateInterviewRound,
});

function CreateInterviewRound() {
  const navigate = useNavigate({ from: Route.fullPath });
  const createRound = api.interviewRounds.useCreate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    interview_duration: "45",
    status: "draft",
    start_date: "",
    end_date: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is updated
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors["title"] = "Title is required";
    }

    if (!formData.interview_duration) {
      newErrors["interview_duration"] = "Interview duration is required";
    }

    if (!formData.status) {
      newErrors["status"] = "Status is required";
    }

    if (formData.status !== "draft" && !formData.start_date) {
      newErrors["start_date"] = "Start date is required for non-draft rounds";
    }

    if (formData.start_date && formData.end_date) {
      const startDate = new Date(formData.start_date);
      const endDate = new Date(formData.end_date);
      if (startDate >= endDate) {
        newErrors["end_date"] = "End date must be after start date";
      }
    }
    if (formData.start_date === "") {
      newErrors["start_date"] = "Start date is required";
    }

    if (formData.end_date === "") {
      newErrors["end_date"] = "End date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add this function to handle select changes
  const handleSelectChange = (
    value: string,
    fieldName: keyof typeof formData
  ) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    // Clear error when field is updated
    if (errors[fieldName]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // In a real app, you would send this data to an API
    console.log("Form submitted:", formData);
    createRound.mutate({
      title: formData.title,
      description: formData.description,
      duration: Number.parseInt(formData.interview_duration),
      period: {
        start: newIsoDate(formData.start_date),
        end: newIsoDate(formData.end_date),
      },
    });

    // // Navigate back to the interview rounds list
    navigate({ to: "/app/interview-rounds" });
  };

  const handleCancel = () => {
    navigate({ to: "/app/interview-rounds" });
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create New Interview Round</h1>
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
                  min={formData.start_date}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Create Interview Round</Button>
          </div>
        </form>
      </Card.Root>
    </div>
  );
}
