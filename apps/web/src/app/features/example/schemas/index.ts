import { z } from "zod"

export const updateExampleApiSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, { message: "Title cannot be empty." }),
  description: z.string().min(1, { message: "Description cannot be empty." }),
})
