import { exampleGenerator } from "@/test/data-generators"

export async function GET(
  request: Request,
  { params }: { params: { exampleId: string } },
) {
  const exampleId = params.exampleId

  return Response.json(exampleGenerator({ id: exampleId }))
}

export async function DELETE() {
  return Response.json({}, { status: 200 })
}
