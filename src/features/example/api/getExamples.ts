import { useQuery } from "@tanstack/react-query"

import { client } from "@/lib/clients"
import { Example } from "@/types"

export const getExamples = async (axiosClient = client) => {
  try {
    const response = await axiosClient.get<Example[]>(`/examples`)

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
