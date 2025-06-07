import { Body, Container, Head, Html, Section, Text } from "@react-email/components";

export function WelcomeEmail() {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f9fafb", fontFamily: "Arial, sans-serif" }}>
        <Container style={{ padding: "20px", backgroundColor: "#ffffff" }}>
          <Section>
            <Text style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>
              Welcome to Tau Interview Scheduling!
            </Text>

            <Text style={{ fontSize: "16px" }}>Hello there,</Text>

            <Text style={{ fontSize: "16px" }}>
              We're excited to have you on board. With Tau, scheduling interviews is
              simple, fast, and reliable — whether you're an interviewer or a candidate.
            </Text>

            <Text style={{ fontSize: "16px" }}>
              You’ll receive emails like this one to confirm interviews, send reminders,
              and help you stay on track.
            </Text>

            <Text style={{ fontSize: "16px" }}>
              If you ever have any questions, feel free to reply to this email or contact
              our support team.
            </Text>

            <Text style={{ fontSize: "16px" }}>
              We wish you the best of luck in your interviews and hope you have a great
              experience with Tau!
            </Text>

            <Text style={{ fontSize: "14px", color: "#6b7280" }}>— The Tau Team</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default WelcomeEmail;
