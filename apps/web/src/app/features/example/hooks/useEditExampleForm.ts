import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Example } from "../types"

const editExampleSchema = z.object({
  title: z.string().min(1, { message: "Title cannot be empty." }),
  description: z.string().min(1, { message: "Description cannot be empty." }),
})

export type EditExampleForm = z.infer<typeof editExampleSchema>

export const useEditExampleForm = (example: Example) =>
  useForm<EditExampleForm>({
    resolver: zodResolver(editExampleSchema),
    defaultValues: {
      ...example,
    },
  })
