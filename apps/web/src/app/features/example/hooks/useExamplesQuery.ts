import { useQuery } from "@tanstack/react-query"

import { Client } from "@/app/lib/clients"
import { NextApiClient } from "@/app/lib/clients/next-api-client"

import { Example } from "../types"

const getExamples = async (
  fetchClient: Client = NextApiClient,
): Promise<Example[]> => {
  try {
    const fetch = fetchClient.build()

    const response = await fetch(`/examples`)

    return response.json()
  } catch (error) {
    return Promise.reject(error)
  }
}
export function useExamplesQuery() {
  return useQuery({
    queryKey: ["examples"],
    queryFn: () => getExamples(),
  })
}
