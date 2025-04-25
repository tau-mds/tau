import { env } from "~/env";

export function url() {
  return `http://localhost:${env.PORT}`;
}
