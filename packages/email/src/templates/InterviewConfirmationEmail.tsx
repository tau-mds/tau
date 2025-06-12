import { Body, Container, Head, Html, Section, Text } from "@react-email/components";

interface InterviewConfirmationEmailProps {
  type: "candidate" | "interviewer";
  interviewer: string;
  candidate: string;
  date: Date | string;
  location: string;
}

export function InterviewConfirmationEmail({
  type,
  interviewer,
  candidate,
  date = new Date(),
  location = "online",
}: InterviewConfirmationEmailProps) {
  const isOnline = location.toLowerCase() === "online";
  const isCandidate = type === "candidate";

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
      <Body style={{ backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ padding: "20px", backgroundColor: "#ffffff" }}>
          <Section>
            <Text style={{ fontSize: "20px", fontWeight: "bold" }}>Hello there,</Text>
            <Text>
              {isCandidate ? (
                <>
                  Your interview has been scheduled. Here are your interview details:
                </>
              ) : (
                <>
                  An interview has been scheduled. Here are the details:
                </>
              )}
            </Text>

            <Text>
              <strong>📅 Date:</strong> {formattedDate}
              <br />
              <strong>🕒 Time:</strong> {formattedTime}
              <br />
              <strong>👤 {isCandidate ? "Interviewer" : "Candidate"}:</strong>{" "}
              {isCandidate ? interviewer : candidate}
              <br />
              <strong>📍 Location:</strong> {location}
            </Text>

            <Text>
              {isCandidate ? (
                isOnline ? (
                  <>
                    Please make sure you have a strong internet connection and a
                    functioning camera. Join the meeting on time using the provided link.
                    Best of luck!
                  </>
                ) : (
                  <>
                    Please arrive at the interview location at least 15 minutes early. If
                    you need to reschedule, please contact the interviewer directly. Best
                    of luck!
                  </>
                )
              ) : null}
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

export default InterviewConfirmationEmail;
