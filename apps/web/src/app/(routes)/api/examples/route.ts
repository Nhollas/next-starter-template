import { pause } from "@/app/lib/utils"
import { exampleGenerator } from "@/test/data-generators"

export async function GET() {
  // Simulate a slow response
  await pause(1000)

  return Response.json(Array.from({ length: 8 }, exampleGenerator))
}
