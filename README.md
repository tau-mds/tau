# Tau

## Getting started

## Authentication

Tau provides a unified authentication system for both backend and frontend.

### Backend: Getting the user session

To access the authenticated user in backend/server functions, use the provided `authMiddleware`. This middleware will populate the `session` in your context.

**Example:**

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

### Frontend: Getting the user session

To access the authenticated user in the frontend (React components), use the `authClient` hook:

**Example:**

```ts
import { authClient } from "@tau/auth-client";

function MyComponent() {
  const { data } = authClient.useSession();
  // data?.user contains the authenticated user, if any
}
```

- Use the middleware in your backend/server functions to ensure you have access to the user session.
- Use `authClient.useSession()` in your frontend components to access the current user.
