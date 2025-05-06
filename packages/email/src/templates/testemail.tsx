import { Button, Html } from "@react-email/components";

export const TestEmail = () => {
  return (
    <Html>
      <h1>This is a test email!</h1>
      <Button
        href="https://resend.com/docs/introduction"
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        Join Event
      </Button>

      <p>Click the button above to join the event!</p>
    </Html>
  );
};

export default TestEmail;
