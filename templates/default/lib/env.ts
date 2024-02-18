import { z } from "zod"

export const serverEnv = () =>
  z
    .object({
      EXAMPLE_SERVICE_URL: z.string(),
      LAUNCHDARKLY_SDK_KEY: z.string(),
      LAUNCHDARKLY_CLIENT_ID: z.string(),
      DRAFTMODE_SECRET: z.string(),
    })
    .parse(process.env)

export const clientEnv = () => z.object({}).parse(process.env)
