import { useMutation } from "@tanstack/react-query"

import { NextApiClient } from "@/app/lib/clients/next-api-client"
import { queryClient } from "@/app/lib/react-query"

import { Example } from "../types"

const updateExample = async (example: Example): Promise<Example> => {
  try {
    const fetch = NextApiClient.build()

    const response = await fetch(`/example`, {
      body: example,
      method: "PUT",
    })
    return response.json()
  } catch (error) {
    return Promise.reject(error)
  }
}

export const useUpdateExampleMutation = (
  successCallback?: (updatedExample: Example) => void,
) => {
  return useMutation({
    onSuccess: (_, updatedExample) => {
      queryClient.setQueryData(["examples"], (oldData: Example[]) =>
        oldData
          ? oldData.map((example) =>
              example.id === updatedExample.id ? updatedExample : example,
            )
          : oldData,
      )

      successCallback && successCallback(updatedExample)
    },
    onError: (_, __, context: any) => {
      if (context?.previousExamples) {
        queryClient.setQueryData(["examples"], context.previousExamples)
      }
    },
    mutationFn: updateExample,
  })
}
