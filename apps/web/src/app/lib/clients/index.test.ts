import { HttpResponse, http } from "msw"

import { server } from "@/test/server"

import { buildClient } from "./index"

describe("buildClient", () => {
  it("should allow overriding the default config", async () => {
    const testFn = jest.fn()

    server.use(
      http.post("https://api.example.com/endpoint", ({ request }) => {
        testFn({ method: request.method })
        return HttpResponse.json({})
      }),
    )

    const defaultConfig = {
      method: "GET",
    }
    const overrideConfig = {
      method: "POST",
    }

    const client = buildClient("https://api.example.com", defaultConfig)()
    await client("/endpoint", overrideConfig)

    expect(testFn).toHaveBeenCalledWith({ method: "POST" })
  })
})
