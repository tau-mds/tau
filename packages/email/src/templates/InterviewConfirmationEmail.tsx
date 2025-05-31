import { Body, Container, Head, Html, Section, Text } from "@react-email/components";

interface InterviewConfirmationEmailProps {
  recipientName: string;
  role: "candidate" | "interviewer";
  interviewer: string;
  candidate: string;
  date: string;
  time: string;
  location: string;
}

export function InterviewConfirmationEmail({
  recipientName,
  role,
  interviewer,
  candidate,
  date,
  time,
  location = "online",
}: InterviewConfirmationEmailProps) {
  const isOnline = location.toLowerCase() === "online";
  const isCandidate = role === "candidate";

  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#ffffff", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ padding: "20px", backgroundColor: "#ffffff" }}>
          <Section>
            <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
              Hello {recipientName},
            </Text>
            <Text>
              {isCandidate ? (
                <>
                  Your interview for the <strong>{role}</strong> role has been scheduled.
                  Here are your interview details:
                </>
              ) : (
                <>
                  An interview for the <strong>{role}</strong> role has been scheduled.
                  Here are the details:
                </>
              )}
            </Text>

            <Text>
              <strong>📅 Date:</strong> {date}
              <br />
              <strong>🕒 Time:</strong> {time}
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
