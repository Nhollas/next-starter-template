import { useMutation } from "@tanstack/react-query"

import { NextApiClient } from "@/app/lib/clients/next-api-client"
import { queryClient } from "@/app/lib/react-query"

import { Example } from "../types"

const duplicateExample = async (example: Example): Promise<Example> => {
  try {
    const fetch = NextApiClient.build()

    const response = await fetch(`/example/duplicate`, {
      method: "POST",
      body: example,
    })

    return response.json()
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
