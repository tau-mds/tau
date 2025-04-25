import type { routes } from "@tau/api";
import { hc } from "hono/client";
import { env } from "./env";

export const sdk = hc<routes>(env.API_URL);

export * from "./handle-res";
