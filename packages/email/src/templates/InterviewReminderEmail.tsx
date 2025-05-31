import { Body, Container, Head, Html, Section, Text } from "@react-email/components";
import { format } from "date-fns";

interface InterviewReminderEmailProps {
  recipientName: string;
  role: string;
  interviewer: string;
  date: Date;
  time: string;
  location: string;
}

export function InterviewReminderEmail({
  recipientName = "there",
  role = "candidate",
  interviewer = "Andrew",
  date = new Date(),
  time = "10:00 AM",
  location = "online",
}: InterviewReminderEmailProps) {
  const isOnline = location.toLowerCase() === "online";

  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f9fafb", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ padding: "20px", backgroundColor: "#ffffff" }}>
          <Section>
            <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
              Hello {recipientName},
            </Text>

            <Text>
              This is a friendly reminder that your interview for the{" "}
              <strong>{role}</strong> role is coming up.
            </Text>

            <Text>
              <strong>📅 Date:</strong> {format(date, "EEEE, MMMM d, yyyy")}
              <br />
              <strong>🕒 Time:</strong> {time}
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
