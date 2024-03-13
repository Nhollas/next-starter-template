import { useMutation } from "@tanstack/react-query"

import { NextApiClient } from "@/app/lib/clients/next-api-client"
import { queryClient } from "@/app/lib/react-query"

import { Example } from "../types"

const deleteExample = async (exampleId: string): Promise<void> => {
  try {
    const client = NextApiClient.build()

    await client.delete(`/example/${exampleId}`)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const useDeleteExampleMutation = (successCallback?: () => void) => {
  return useMutation({
    onSuccess: (_, exampleId) => {
      queryClient.setQueryData(["examples"], (oldData: Example[]) =>
        oldData
          ? oldData.filter((example) => example.id !== exampleId)
          : oldData,
      )

      successCallback && successCallback()
    },
    onError: (_, __, context: any) => {
      if (context?.previousExamples) {
        queryClient.setQueryData(["examples"], context.previousExamples)
      }
    },
    mutationFn: deleteExample,
  })
}
