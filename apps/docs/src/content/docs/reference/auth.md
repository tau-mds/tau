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

## Best practices

1. Server-Side Security
    - Always use `authMiddleware` for protected routes
    - Validate user roles/permissions in middleware

2. Client-Side Management
    - Use the `useSession` hook at the root level for global access
    - Handle loading states gracefully during initial session check
    - Trigger session refresh after critical auth operations
