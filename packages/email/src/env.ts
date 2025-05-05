import * as v from "valibot";


const envSchema = v.object({
  RESEND_API_KEY: v.pipe(
    v.string(),
    v.nonEmpty("API key cannot be empty")
  ),
});


export const env = v.parse(envSchema, process.env);