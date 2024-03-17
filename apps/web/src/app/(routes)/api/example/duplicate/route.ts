import { faker } from "@faker-js/faker"

import { Example } from "@/app/features/example"
import { pause } from "@/app/lib/utils"
import { exampleGenerator } from "@/test/data-generators"

export async function POST(request: Request) {
  const exampleToDuplicate = (await request.json()) as Example

  await pause(1000)

  return Response.json(
    exampleGenerator({
      ...exampleToDuplicate,
      id: faker.string.uuid(),
    }),
  )
}
