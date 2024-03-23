import { updateExampleApiSchema } from "@/app/features/example"
import { withValidation } from "@/app/lib/api"
import { pause } from "@/app/lib/utils"

export const PUT = withValidation(async (request, validatedBody) => {
  await pause(1000)

  return Response.json(validatedBody)
}, updateExampleApiSchema)
