import { z } from "zod"

export function withValidation<T extends z.ZodTypeAny>(
  callBack: (request: Request, validatedBody: z.infer<T>) => Promise<Response>,
  schema: T,
) {
  return async (request: Request) => {
    const body = await request.clone().json()

    try {
      const validatedBody = await schema.parseAsync(body)

      return callBack(request, validatedBody)
    } catch (error) {
      return new Response("Validation Error", { status: 422 })
    }
  }
}
