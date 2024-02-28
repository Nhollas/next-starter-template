import { Client, buildClient, baseUrl } from "."

export const NextApiClient: Client = {
  buildClient: buildClient("/api"),
  createUrl: baseUrl("/api"),
}
