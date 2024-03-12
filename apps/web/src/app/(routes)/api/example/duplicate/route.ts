import { faker } from "@faker-js/faker"

import { Example } from "@/app/features/example"
import { exampleGenerator } from "@/test/data-generators"

export async function POST(request: Request) {
  const exampleToDuplicate = (await request.json()) as Example

  await new Promise((resolve) => setTimeout(resolve, 500))

  return Response.json(
    exampleGenerator({
      ...exampleToDuplicate,
      id: faker.string.uuid(),
    }),
  )
}
