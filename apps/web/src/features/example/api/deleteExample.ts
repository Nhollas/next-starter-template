import { useMutation } from "@tanstack/react-query"

import { NextApiClient } from "@/lib/clients/next-api-client"
import { queryClient } from "@/lib/react-query"
import { Example } from "@/types"

const deleteExample = async (exampleId: string) => {
  try {
    const response = await NextApiClient.build().delete(`/example/${exampleId}`)

    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const useDeleteExampleMutation = (successCallback: () => void) => {
  return useMutation({
    onSuccess: (_, exampleId) => {
      queryClient.setQueryData(["examples"], (oldData: Example[]) =>
        oldData
          ? oldData.filter((example) => example.id !== exampleId)
          : oldData,
      )

      successCallback()
    },
    onError: (_, __, context: any) => {
      if (context?.previousExamples) {
        queryClient.setQueryData(["examples"], context.previousExamples)
      }
    },
    mutationFn: deleteExample,
  })
}
