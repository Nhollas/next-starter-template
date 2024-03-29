"use client";
import { useMutation } from "@tanstack/react-query";

import { client } from "@/lib/clients";
import { queryClient } from "@/lib/react-query";
import { Example } from "@/types";

const duplicateExample = async (example: Example): Promise<Example> => {
  try {
    const response = await client().post(`/example/duplicate`, example);

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const useDuplicateExampleMutation = (successCallback: () => void) => {
  return useMutation({
    onSuccess: (duplicatedExample) => {
      queryClient.setQueryData(["examples"], (oldData: Example[]) =>
        oldData ? [...oldData, duplicatedExample] : [duplicatedExample],
      );

      successCallback();
    },
    onError: (_, __, context: any) => {
      if (context?.previousExamples) {
        queryClient.setQueryData(["examples"], context.previousExamples);
      }
    },
    mutationFn: duplicateExample,
  });
};
