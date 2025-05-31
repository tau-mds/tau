import { Resend } from "resend";
import { env } from "./env";

export const email = new Resend(env.RESEND_API_KEY);
