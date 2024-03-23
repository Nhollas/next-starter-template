import { serverEnv } from "../env"

import { Client, buildClient, baseUrl } from "."

const { EXAMPLE_SERVICE_URL } = serverEnv()

export const ExampleClient: Client = {
  build: buildClient(EXAMPLE_SERVICE_URL, {
    "Content-Type": "application/json",
  }),
  createUrl: baseUrl(EXAMPLE_SERVICE_URL),
}
