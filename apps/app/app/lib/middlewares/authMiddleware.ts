import { createMiddleware } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { type Session, auth } from "@tau/auth-server";

export const authMiddleware = createMiddleware().server(
  async ({ next, data }) => {
    const request = getWebRequest();

    let session: Session | null = null;

    if (!request) {
      return next({
        context: {
          session: null as Session | null,
        },
      });
    }

    const { headers } = request;
    session = await auth.api.getSession({ headers });
    console.log("authMiddleware: Fetched Session:", session);

    console.log("authMiddleware: Request received (data):", data);

    return next({
      context: {
        session,
      },
    });
  }
);
