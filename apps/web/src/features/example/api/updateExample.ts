import { useMutation } from "@tanstack/react-query"

import { NextApiClient } from "@/lib/clients/next-api-client"
import { queryClient } from "@/lib/react-query"

import { Example } from "../types"

const updateExample = async (example: Example) => {
  try {
    const client = NextApiClient.build()

    const response = await client.put(`/example`, example)
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const useUpdateExampleMutation = (successCallback: () => void) => {
  return useMutation({
    onSuccess: (_, updatedExample) => {
      queryClient.setQueryData(["examples"], (oldData: Example[]) =>
        oldData
          ? oldData.map((example) =>
              example.id === updatedExample.id ? updatedExample : example,
            )
          : oldData,
      )

      successCallback()
    },
    onError: (_, __, context: any) => {
      if (context?.previousExamples) {
        queryClient.setQueryData(["examples"], context.previousExamples)
      }
    },
    mutationFn: updateExample,
  })
}
