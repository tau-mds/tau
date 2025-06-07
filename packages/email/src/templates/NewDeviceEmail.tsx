import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Section,
  Text,
} from "@react-email/components";

interface NewDeviceEmailProps {
  role: "candidate" | "interviewer";
  magicLink: string;
}

export function NewDeviceEmail({ magicLink }: NewDeviceEmailProps) {
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
            <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
              Hello there,
            </Text>
            <Text style={{ fontSize: "16px", marginTop: "10px" }}>
              You have requested to sign in to Tau from a new device. Use the button below
              to securely sign in to Tau on your new device. After that, you will only
              need to go to our website to sign in.
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

export default NewDeviceEmail;
