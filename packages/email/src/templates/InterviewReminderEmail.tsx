import { Body, Container, Head, Html, Section, Text } from "@react-email/components";

interface InterviewReminderEmailProps {
  jobRole: string;
  interviewer: string;
  date: Date | string;
  location: string;
}

export function InterviewReminderEmail({
  jobRole = "sales manager",
  interviewer = "Andrew",
  date = new Date(),
  location = "online",
}: InterviewReminderEmailProps) {
  const isOnline = location.toLowerCase() === "online";
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const formattedDate = dateObj.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const formattedTime = dateObj.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f9fafb", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ padding: "20px", backgroundColor: "#ffffff" }}>
          <Section>
            <Text style={{ fontSize: "20px", fontWeight: "bold" }}>Hello there,</Text>

            <Text>
              This is a friendly reminder that your interview for the{" "}
              <strong>{jobRole}</strong> role is coming up.
            </Text>

            <Text>
              <strong>📅 Date:</strong> {formattedDate}
              <br />
              <strong>🕒 Time:</strong> {formattedTime}
              <br />
              <strong>👤 Interviewer:</strong> {interviewer}
              <br />
              <strong>📍 Location:</strong> {location}
            </Text>

            <Text>
              {isOnline ? (
                <>
                  Please make sure you have a strong internet connection and a functioning
                  camera. Join the meeting on time using the provided link. Best of luck!
                </>
              ) : (
                <>
                  Please arrive at the interview location at least 15 minutes early. If
                  you need to reschedule, please contact the interviewer directly. Best of
                  luck!
                </>
              )}
            </Text>

            <Text style={{ fontSize: "12px", color: "#6b7280" }}>
              This is an automated message from Tau Interview Scheduling.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default InterviewReminderEmail;
