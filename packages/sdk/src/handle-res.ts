import type { ClientResponse } from "hono/client";

/**
 * Handles an API response, parsing the JSON and throwing an error if necessary.
 *
 * If the response is successful, it returns the parsed JSON. If the response contains an error,
 * it throws an `ApiError` with the error details. Otherwise, it throws a generic error.
 *
 * @param response - Client response object to handle.
 * @returns Parsed JSON from response.
 * @throws ApiError for expected errors, generic error for unknown issues.
 */
// biome-ignore lint/suspicious/noExplicitAny: any is used to allow any type of response
export const handleResponse = async <
  T extends Record<string, any>,
  U extends ClientResponse<T, number, "json">,
>(
  response: U,
) => {
  const json = await response.json();

  if (response.ok) {
    return json as Awaited<ReturnType<Extract<U, { status: 200 }>["json"]>>;
  }
  throw new Error(
    json["errors"]?.map((e: any) => e.message)?.join(", ") ??
      json["error"].message,
    { cause: json["errors"] ?? json["error"] },
  );
};
