import { useQuery } from "@tanstack/react-query"

import { NextApiClient } from "@/app/lib/clients/next-api-client"

import { Example } from "../../../features/example/types"

export const getExamples = async (axiosClient = NextApiClient) => {
  try {
    const client = axiosClient.build()

    const response = await client.get<Example[]>(`/examples`)

    return response.data
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
