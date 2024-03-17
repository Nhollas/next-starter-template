import { Example } from "@/app/features/example"
import { pause } from "@/app/lib/utils"

export async function PUT(request: Request) {
  const updatedExample = (await request.json()) as Example

  await pause(1000)

  return Response.json(updatedExample)
}
