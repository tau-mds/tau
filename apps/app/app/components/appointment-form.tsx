import { useState } from "react";

// Define the type for the form data that the component manages
interface AppointmentFormData {
  title: string;
  description: string;
  intervalDurationMinutes: number;
  startDate: string; // Stored as YYYY-MM-DD string from input[type="date"]
  endDate: string; // Stored as YYYY-MM-DD string from input[type="date"]
  emails: string[]; // Changed to an array of strings for the list of emails
}

export default function AppointmentForm() {
  // State to hold the current values of the form inputs
  const [formData, setFormData] = useState<AppointmentFormData>({
    title: "",
    description: "",
    intervalDurationMinutes: 60, // Default interval duration
    startDate: "",
    endDate: "",
    emails: [], // Initialize emails as an empty array
  });

  // State to hold the value of the individual email input field
  const [currentEmailInput, setCurrentEmailInput] = useState("");

  // State to track the loading state during form submission
  const [isLoading, setIsLoading] = useState(false);

  // State to hold messages shown to the user (success or error)
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Handle changes in text and textarea inputs
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes specifically in number inputs
  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numberValue = parseInt(value, 10) || 0; // Parse as integer, default to 0
    setFormData((prev) => ({ ...prev, [name]: numberValue }));
  };

  // Handle changes in the individual email input field
  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentEmailInput(e.target.value);
  };

  // Function to add the current email input to the emails list
  const handleAddEmail = () => {
    const emailToAdd = currentEmailInput.trim(); // Get and trim the current input value

    // Basic email validation
    if (!emailToAdd || !emailToAdd.includes("@") || emailToAdd.length < 3) {
      setMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return; // Stop if validation fails
    }

    // Check if the email is already in the list
    if (formData.emails.includes(emailToAdd)) {
      setMessage({ type: "error", text: "Email is already in the list." });
      return; // Stop if duplicate
    }

    // Add the valid email to the formData.emails array
    setFormData((prev) => ({
      ...prev,
      emails: [...prev.emails, emailToAdd], // Add the new email to the array
    }));

    setCurrentEmailInput(""); // Clear the individual email input field
    setMessage(null); // Clear any previous messages
  };

  // Function to remove an email from the list
  const handleRemoveEmail = (emailToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      emails: prev.emails.filter((email) => email !== emailToRemove), // Filter out the email to remove
    }));
    setMessage(null); // Clear any previous messages
  };

  // Handle the form submission event
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default browser form submission

    setIsLoading(true); // Set loading state
    setMessage(null); // Clear messages

    // Perform basic validation before sending data to the API
    if (
      !formData.title.trim() ||
      !formData.startDate ||
      !formData.endDate ||
      formData.intervalDurationMinutes <= 0 ||
      formData.emails.length === 0
    ) {
      setMessage({
        type: "error",
        text: "Please fill in all required fields and add at least one email.",
      });
      setIsLoading(false);
      return; // Stop submission
    }

    // Prepare the data payload for the API (emails is already an array)
    const apiData = {
      title: formData.title.trim(), // Trim whitespace
      description: formData.description.trim(), // Trim whitespace
      intervalDurationMinutes: formData.intervalDurationMinutes,
      startDate: formData.startDate, // YYYY-MM-DD string
      endDate: formData.endDate, // YYYY-MM-DD string
      emails: formData.emails, // Array of email strings
    };

    try {
      // Send POST request to your API route
      const response = await fetch("/api/appointment", {
        // Assuming API route is at /api/appointment
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indicate JSON body
        },
        body: JSON.stringify(apiData), // Convert data to JSON string
      });

      const result = await response.json(); // Parse JSON response

      if (response.ok) {
        setMessage({
          type: "success",
          text: result.message || "Appointment series created successfully!",
        });
      } else {
        setMessage({
          type: "error",
          text: result.message || "Failed to create appointment series.",
        });
      }
    } catch (error) {
      // Network or other fetch errors
      console.error("Error submitting form:", error);
      setMessage({
        type: "error",
        text: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false); // Always stop loading
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      {/* Form Title */}
      <h1 className="text-2xl font-bold mb-6 text-center">
        Create Appointment Series
      </h1>

      {/* The Form Element */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {" "}
        {/* space-y adds vertical space */}
        {/* Title Input */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Description Textarea */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Interval Duration Input */}
        <div>
          <label
            htmlFor="intervalDurationMinutes"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Interval Duration (minutes)
          </label>
          <input
            type="number"
            id="intervalDurationMinutes"
            name="intervalDurationMinutes"
            value={formData.intervalDurationMinutes}
            onChange={handleNumberInputChange}
            required
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Start Date Input */}
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* End Date Input */}
        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            required
            min={formData.startDate} // Prevent selecting end date before start date
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Emails Section (Input, Button, List) */}
        <div>
          <label
            htmlFor="emailInput"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Add Emails
          </label>
          <div className="flex gap-2 mb-2">
            {" "}
            {/* Flex container for input and button */}
            <input
              type="email" // Use type="email" for better mobile keyboards and basic validation
              id="emailInput"
              value={currentEmailInput}
              onChange={handleEmailInputChange}
              placeholder="Enter email"
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button" // Important: Use type="button" to prevent form submission
              onClick={handleAddEmail}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>

          {/* List of Added Emails */}
          {formData.emails.length > 0 && (
            <div className="border border-gray-300 rounded-md p-3 max-h-32 overflow-y-auto">
              {" "}
              {/* Container for the list */}
              <ul className="space-y-2">
                {" "}
                {/* List with vertical spacing */}
                {formData.emails.map((email, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center text-sm text-gray-800"
                  >
                    {" "}
                    {/* List item */}
                    <span>{email}</span> {/* Display the email */}
                    <button
                      type="button" // Important: Use type="button"
                      onClick={() => handleRemoveEmail(email)} // Call remove handler
                      className="text-red-600 hover:text-red-800 focus:outline-none"
                      aria-label={`Remove email ${email}`} // Accessibility
                    >
                      {/* Simple X icon or text */}
                      &times;{" "}
                      {/* HTML entity for multiplication sign (looks like X) */}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {formData.emails.length === 0 && (
            <p className="text-sm text-red-600 mt-1">
              At least one email is required.
            </p> // Validation message if list is empty
          )}
        </div>
        {/* Submission Button */}
        <button
          type="submit" // Submit button
          disabled={isLoading} // Disable while loading
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating..." : "Create Appointment Series"}{" "}
          {/* Button text */}
        </button>
      </form>

      {/* Message Display (Success or Error) */}
      {message && (
        <div
          className={`mt-4 p-3 rounded-md text-center text-sm ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800" // Dynamic styling
          }`}
        >
          {message.text} {/* Message text */}
        </div>
      )}
    </div>
  );
}
