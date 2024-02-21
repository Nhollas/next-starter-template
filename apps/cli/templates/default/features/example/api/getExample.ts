import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/clients";
import { Example } from "@/types";

export const getExample = async (exampleId: string) => {
  try {
    const response = await client().get<Example>(`/example/${exampleId}`);

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const useExampleQuery = (exampleId: string) =>
  useQuery({
    queryKey: ["examples", exampleId],
    queryFn: () => getExample(exampleId),
  });
