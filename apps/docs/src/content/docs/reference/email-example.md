# Sending Emails with Resend (`@tau/email`)

Tau uses the [Resend](https://resend.com/) email service, wrapped in the `@tau/email` package, to send transactional emails such as interview invitations and reminders.

## Usage Example

First, install the required dependencies if you haven't already:

```bash
npm install @tau/email
```

### Sending an Email

Here's how you can send an email using the built-in templates and the Resend client:

```typescript
import { resend, Email } from "@tau/email";
import { render } from "@react-email/components";

// Choose an email template and provide the required props
const emailHtml = await render(
  Email.WelcomeEmail()
);

// Send the email using the Resend client
await resend.emails.send({
  from: "Tau <tau@yourdomain.com>",
  to: ["recipient@example.com"],
  subject: "Welcome to Tau!",
  html: emailHtml,
});
```

### Using Other Templates

You can use any of the available templates:

- `Email.WelcomeEmail()`
- `Email.AppointmentLinkEmail({ magicLink, role })`
- `Email.InterviewConfirmationEmail({ ... })`
- `Email.InterviewReminderEmail({ ... })`
- `Email.NewDeviceEmail({ magicLink, role })`

Each template requires specific props. Refer to their TypeScript definitions for details.

---

**Note:**  
Make sure your environment is configured with the `RESEND_API_KEY` variable for authentication with the Resend service.
