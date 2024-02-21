import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Example } from "@/types";

const updateExampleSchema = z.object({
  title: z.string().min(1, { message: "Title cannot be empty." }),
  description: z.string().min(1, { message: "Description cannot be empty." }),
  isOpen: z.boolean(),
});

export type UpdateExampleFormValues = z.infer<typeof updateExampleSchema>;

export const useEditExampleForm = (example: Example) =>
  useForm<UpdateExampleFormValues>({
    resolver: zodResolver(updateExampleSchema),
    defaultValues: {
      ...example,
      isOpen: false,
    },
  });
