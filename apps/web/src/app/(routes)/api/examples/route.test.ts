/**
 * @jest-environment node
 */
import { GET } from "./route"

jest.mock("@/app/lib/utils", () => ({
  ...jest.requireActual("@/app/lib/utils"),
  pause: jest.fn(() => Promise.resolve()),
}))

describe("/examples API route", () => {
  it("should return some examples", async () => {
    const res = await GET()

    expect(res.status).toBe(200)

    const json = await res.json()

    expect(json).toHaveLength(8)
  })
})
