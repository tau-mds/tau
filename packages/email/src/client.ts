// import { env } from 'process';
import { Resend } from "resend";
import { TestEmail } from "./templates";
import { render } from "@react-email/components";

const EmailService = new Resend(process.env["RESEND_API_KEY"]);
console.log("Resend API Key:", process.env["RESEND_API_KEY"]);
console.log("Sending email...");

(async function () {
  const html = await render(TestEmail());

  const { data, error } = await EmailService.emails.send({
    from: "Tau <onboarding@resend.dev>",
    to: ["iulian.stefan.rizescu@gmail.com"],
    subject: "Hello World",
    html,
  });

  if (error) {
    console.error("Error sending email:", error);
    return console.error({ error });
  }

  console.log("Email sent successfully!");
  console.log({ data });
})();

export default EmailService;
