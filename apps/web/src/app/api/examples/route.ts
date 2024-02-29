import { exampleGenerator } from "@/test/data-generators"

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return Response.json(Array.from({ length: 8 }, exampleGenerator))
}
