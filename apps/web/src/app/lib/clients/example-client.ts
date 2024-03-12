import { serverEnv } from "../env"

import { Client, buildClient, baseUrl } from "."

const { EXAMPLE_SERVICE_URL } = serverEnv()

export const ExampleClient: Client = {
  build: buildClient(EXAMPLE_SERVICE_URL),
  createUrl: baseUrl(EXAMPLE_SERVICE_URL),
}
