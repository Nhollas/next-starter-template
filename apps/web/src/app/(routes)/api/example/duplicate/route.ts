import { faker } from "@faker-js/faker"

import { Example } from "@/app/features/example"
import { exampleGenerator } from "@/test/data-generators"

export async function POST(request: Request) {
  const exampleToDuplicate = (await request.json()) as Example

  return Response.json(
    exampleGenerator({
      ...exampleToDuplicate,
      id: faker.string.uuid(),
    }),
  )
}
