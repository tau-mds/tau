import { Body, Container, Head, Html, Link, Section, Text } from "@react-email/components";

interface AppointmentLinkEmailProps {
  role: "candidate" | "interviewer";
  magicLink: string;
  date: string | Date;
}

export function AppointmentLinkEmail({ magicLink, role }: AppointmentLinkEmailProps) {
  return (
    <Html>
      <Head />
      <Body
        style={{
          backgroundColor: "#ffffff",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Container style={{ padding: "20px", backgroundColor: "#fcfcfc" }}>
          <Section>
            <Text style={{ fontSize: "20px", fontWeight: "bold" }}>Hello there,</Text>
            <Text style={{ fontSize: "16px", marginTop: "10px" }}>
              {role === "candidate"
                ? "You have been invited to an interview on Tau as a candidate. Best of luck!"
                : "You have been invited to conduct an interview round on Tau."}
            </Text>
            <Text style={{ fontSize: "16px", marginTop: "10px" }}>
              Use the button below to securely sign in to Tau for the first time. After
              that, you will only need to go to our website to sign in.
            </Text>
            <Text style={{ textAlign: "center", margin: "24px 0" }}>
              <Link
                href={magicLink}
                style={{
                  display: "inline-block",
                  padding: "18px 48px",
                  fontSize: "20px",
                  backgroundColor: "#1249ef",
                  color: "#ffffff",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  minWidth: "260px",
                  textAlign: "center",
                }}
              >
                Sign in
              </Link>
            </Text>
            <Text style={{ fontSize: "12px", color: "#7f7d8a" }}>
              This link will expire in 24 hours. Be sure to sign in before then!
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default AppointmentLinkEmail;