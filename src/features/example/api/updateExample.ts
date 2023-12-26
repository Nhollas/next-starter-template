"use client"
import { useMutation } from "@tanstack/react-query"

import { client } from "@/lib/clients"
import { queryClient } from "@/lib/react-query"
import { Example } from "@/types"

const updateExample = async (example: Example) => {
  try {
    const response = await client.put(`/example`, example)
    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const useUpdateExampleMutation = (successCallback: () => void) => {
  return useMutation({
    onSuccess: (_, updatedExample) => {
      queryClient.setQueryData(
        ["examples"],
        // ✅ this is the way
        (oldData: Example[]) =>
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
