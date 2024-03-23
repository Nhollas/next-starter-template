import { updateExampleApiSchema } from "@/app/features/example"
import { withValidation } from "@/app/lib/api"

export const PUT = withValidation(async (request, validatedBody) => {
  return Response.json(validatedBody)
}, updateExampleApiSchema)
