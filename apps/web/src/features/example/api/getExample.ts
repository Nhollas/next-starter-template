import { useQuery } from "@tanstack/react-query"

import { NextApiClient } from "@/lib/clients/next-api-client"
import { Example } from "@/types"

export const getExample = async (exampleId: string) => {
  try {
    const response = await NextApiClient.buildClient().get<Example>(
      `/example/${exampleId}`,
    )

    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const useExampleQuery = (exampleId: string) =>
  useQuery({
    queryKey: ["examples", exampleId],
    queryFn: () => getExample(exampleId),
  })
