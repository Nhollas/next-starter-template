import { useMutation } from "@tanstack/react-query"

import { NextApiClient } from "@/lib/clients/next-api-client"
import { queryClient } from "@/lib/react-query"
import { Example } from "@/types"

const duplicateExample = async (example: Example): Promise<Example> => {
  try {
    const response = await NextApiClient.build().post(
      `/example/duplicate`,
      example,
    )

    return response.data
  } catch (error) {
    return Promise.reject(error)
  }
}

export const useDuplicateExampleMutation = (
  successCallback?: (duplicatedExample: Example) => void,
) => {
  return useMutation({
    onSuccess: (duplicatedExample) => {
      queryClient.setQueryData(["examples"], (oldData: Example[]) =>
        oldData ? [...oldData, duplicatedExample] : [duplicatedExample],
      )

      successCallback && successCallback(duplicatedExample)
    },
    onError: (_, __, context: any) => {
      if (context?.previousExamples) {
        queryClient.setQueryData(["examples"], context.previousExamples)
      }
    },
    mutationFn: duplicateExample,
  })
}
