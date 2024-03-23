import { Client, buildClient, baseUrl } from "."

export const NextApiClient: Client = {
  build: buildClient("/api", {
    "Content-Type": "application/json",
  }),
  createUrl: baseUrl("/api"),
}
