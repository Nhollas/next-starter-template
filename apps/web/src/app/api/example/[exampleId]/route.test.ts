/**
 * @jest-environment node
 */

import modelFactory from "@/test/model-factory"
import { Example } from "@/types"

import { DELETE, GET } from "./route"

describe("/example/:id API route", () => {
  it("should return an example", async () => {
    const mockedRequest = modelFactory.request()

    const res = await GET(mockedRequest, { params: { exampleId: "123" } })

    expect(res.status).toBe(200)

    const example = (await res.json()) as Example

    expect(example.id).toBe("123")
  })

  it("should delete examples given to it", async () => {
    const res = await DELETE()

    expect(res.status).toBe(200)

    const responseBody = await res.json()

    expect(responseBody).toEqual({})
  })
})
