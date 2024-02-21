import { z } from "zod";

export const serverEnv = () =>
  z
    .object({
      DRAFTMODE_SECRET: z.string(),
      EXAMPLE_CLIENT_URL: z.string().url(),
    })
    .parse(process.env);
