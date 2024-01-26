/**
 * @jest-environment node
 */
import { createMockRequest } from "@/test/route-handlers"
import { Example } from "@/types"

import { GET } from "./route"

describe("/example/:id API route", () => {
  it("should return an example", async () => {
    const mockedRequest = createMockRequest()

    const res = await GET(mockedRequest, { params: { exampleId: "123" } })

    expect(res.status).toBe(200)

    const example = (await res.json()) as Example

    expect(example.id).toBe("123")
  })

  it("should delete examples given to it", async () => {
    const mockedRequest = createMockRequest()

    const res = await GET(mockedRequest, { params: { exampleId: "123" } })

    expect(res.status).toBe(200)

    const responseBody = (await res.json()) as Example

    expect(responseBody).toBe({})
  })
})
