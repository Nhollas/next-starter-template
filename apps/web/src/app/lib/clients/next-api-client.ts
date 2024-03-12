import { Client, buildClient, baseUrl } from "."

export const NextApiClient: Client = {
  build: buildClient("/api"),
  createUrl: baseUrl("/api"),
}
