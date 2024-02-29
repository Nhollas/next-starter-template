import { Example } from "@/features/example"

export async function PUT(request: Request) {
  const updatedExample = (await request.json()) as Example

  await new Promise((resolve) => setTimeout(resolve, 500))

  return Response.json(updatedExample)
}
