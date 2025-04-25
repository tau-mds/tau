import { resolver } from "hono-openapi/valibot";
import * as v from "valibot";

export * as openapi from "./openapi";

type x = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export function response<T extends v.GenericSchema>(
  statusCode: `2${x}${x}`,
  schema: T,
  description: string,
) {
  return {
    [statusCode]: {
      description,
      content: {
        "application/json": {
          schema: resolver(schema),
        },
      },
    },
  };
}

export function ok<const T extends v.GenericSchema>(
  schema: T,
  description?: string,
) {
  return {
    200: {
      description,
      content: {
        "application/json": {
          schema: resolver(
            v.object({
              code: v.literal("ok"),
              status: v.literal("completed"),
              error: v.null(),
              data: schema,
            }),
          ),
        },
      },
    },
  };
}

export function created<const T extends v.GenericSchema>(
  schema: T,
  description?: string,
) {
  return {
    201: {
      description,
      content: {
        "application/json": {
          schema: resolver(
            v.object({
              code: v.literal("created"),
              status: v.literal("completed"),
              error: v.null(),
              data: schema,
            }),
          ),
        },
      },
    },
  };
}

export function bad_request() {
  return {
    400: {
      description:
        "The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).",
      content: {
        "application/json": {
          schema: resolver(
            v.object({
              type: v.string(),
              code: v.literal("bad_request"),
              status: v.literal("failed"),
              data: v.null(),
              error: v.object({ message: v.string() }),
            }),
          ),
        },
      },
    },
  };
}

export function validation() {
  return {
    400: {
      description:
        "The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).",
      content: {
        "application/json": {
          schema: resolver(
            v.object({
              type: v.literal("validation"),
              code: v.literal("bad_request"),
              status: v.literal("failed"),
              data: v.null(),
              errors: v.array(
                v.object({
                  expected: v.string(),
                  received: v.string(),
                  message: v.string(),
                  path: v.array(
                    v.object({
                      type: v.string(),
                      origin: v.string(),
                      key: v.string(),
                      value: v.string(),
                    }),
                  ),
                }),
              ),
            }),
          ),
        },
      },
    },
  };
}

export function unauthorized() {
  return {
    401: {
      description:
        "We were unable to authorize your request. Either your key was missing, malformed or does not have the required permissions.",
      content: {
        "application/json": {
          schema: resolver(
            v.object({
              type: v.string(),
              code: v.literal("unauthorized"),
              status: v.literal("failed"),
              data: v.null(),
              error: v.object({ message: v.string() }),
            }),
          ),
        },
      },
    },
  };
}

export function forbidden() {
  return {
    403: {
      description:
        "We were able to authenticate you but you do not have access to the requested resources.",
      content: {
        "application/json": {
          schema: resolver(
            v.object({
              type: v.string(),
              code: v.literal("forbidden"),
              status: v.literal("failed"),
              data: v.null(),
              error: v.object({ message: v.string() }),
            }),
          ),
        },
      },
    },
  };
}

export function not_found() {
  return {
    404: {
      description:
        "The requested resource could not be found. It may have been deleted or does not exist.",
      content: {
        "application/json": {
          schema: resolver(
            v.object({
              type: v.string(),
              code: v.literal("not_found"),
              status: v.literal("failed"),
              data: v.null(),
              error: v.object({ message: v.string() }),
            }),
          ),
        },
      },
    },
  };
}

export function conflict() {
  return {
    409: {
      description: "Another resource already uses this identifier",
      content: {
        "application/json": {
          schema: resolver(
            v.object({
              type: v.string(),
              code: v.literal("conflict"),
              status: v.literal("failed"),
              data: v.null(),
              error: v.object({ message: v.string() }),
            }),
          ),
        },
      },
    },
  };
}

export function too_many_requests() {
  return {
    429: {
      description: "You have made too many requests in a short period of time.",
      content: {
        "application/json": {
          schema: resolver(
            v.object({
              type: v.string(),
              code: v.literal("too_many_requests"),
              status: v.literal("failed"),
              data: v.null(),
              error: v.object({ message: v.string() }),
            }),
          ),
        },
      },
    },
  };
}

export function internal_server_error() {
  return {
    500: {
      description:
        "Something unexpected happened and we did not handle the error well.",
      content: {
        "application/json": {
          schema: resolver(
            v.object({
              code: v.literal("internal_server_error"),
              status: v.literal("failed"),
              data: v.null(),
              error: v.object({ message: v.string() }),
            }),
          ),
        },
      },
    },
  };
}
