import { Client, buildClient, baseUrl } from "."

export const NextApiClient: Client = {
  build: buildClient("/api", {
    headers: {
      "Content-Type": "application/json",
    },
  }),
  createUrl: baseUrl("/api"),
}
