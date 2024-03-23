import { useQuery } from "@tanstack/react-query"

import { NextApiClient } from "@/app/lib/clients/next-api-client"

import { Example } from "../types"

const getExamples = async (axiosClient = NextApiClient): Promise<Example[]> => {
  try {
    const client = axiosClient.build()

    const response = await client(`/examples`)

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
