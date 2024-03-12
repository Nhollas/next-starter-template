import { z } from "zod"

export const serverEnv = () =>
  z
    .object({
      EXAMPLE_SERVICE_URL: z.string().url(),
      DRAFTMODE_SECRET: z.string(),
    })
    .parse(process.env)
