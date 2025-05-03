---
title: "@tau/auth Reference"
---

Tau provides a unified authentication system that seamlessly integrates across both backend and frontend layers. Sessions are automatically synchronized between server and client, providing a consistent authentication experience.


## Backend Implementation

### Accessing User Sessions

Protect your server functions with the authMiddleware to validate authentication and
populate session data. This middleware automatically:

1. Verifies session tokens/cookies
2. Attaches decoded user information to the request context
3. Handles token expiration and invalid sessions


```ts
import { authMiddleware } from "~/lib/middlewares/authMiddleware";

const handler = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    // Access the user session
    const user = context.session?.user;
    // ...your logic...
  });
```

## Using `fetchUser` in Loaders

You can use `fetchUser` to get the authenticated user inside a loader function. For example:

```ts
import { createFileRoute, redirect } from "@tanstack/react-router";
import { fetchUser } from "~/lib/api/fetch-user";
import { echo } from "~/lib/api/echo";

export const Route = createFileRoute("/_landing/")({
  component: Component,
  loader: async (opts) => {
    const user = await fetchUser();
  },
});
```

## Guarding Authenticated Routes

You can guard an authenticated route by fetching the user and redirecting if not authenticated in a loader. For example:

```ts
import { createFileRoute, redirect } from "@tanstack/react-router";
import { fetchUser } from "~/lib/api/fetch-user";

export const Route = createFileRoute("/_protected/")({
  component: Component,
  loader: async () => {
    const user = await fetchUser();
    console.log(user);
    if (!user) {
      throw redirect({ to: "/app" });
    }
    // ...other loader logic...
  },
});
```

## Frontend Implementation

### Accessing User Sessions

Use the authClient hooks to manage authentication state in React components:


```ts
import { authClient } from "@tau/auth-client";

function MyComponent() {
  const { data } = authClient.useSession();
  // data?.user contains the authenticated user, if any
}
```

## Magic Link Authentication

Magic link authentication lets users sign in via a link sent to their email.

**Frontend usage:**

```ts
import { authClient } from "@tau/auth-client";

await authClient.signIn.magicLink({
  email: "user@example.com",
  callbackURL: "/dashboard",
});
```

**Example helper (from `invite-user.ts`):**

```ts
// Example: apps/app/app/lib/api/invite-user.ts
import { authClient } from "@tau/auth-client";

export async function inviteUser(email: string, interviewId: string) {
  await authClient.signIn.magicLink({
    email,
    callbackURL: `/interview/${interviewId}`,
  });
}
```

> This is just an example to illustrate usage; adapt as needed.

**Handling the magic link:**  
After clicking the link, the user is redirected to your app and authenticated automatically.

**Backend customization:**  
You can customize magic link delivery by providing a `sendMagicLink` function in your backend auth config.

```ts
magicLink({
  sendMagicLink: async ({ email, url }) => {
    // Send email with the magic link
  },
});
```

## Best practices

1. Server-Side Security
    - Always use `authMiddleware` for protected routes
    - Validate user roles/permissions in middleware

2. Client-Side Management
    - Use the `useSession` hook at the root level for global access
    - Handle loading states gracefully during initial session check
    - Trigger session refresh after critical auth operations
