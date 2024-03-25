import { HttpResponse, HttpResponseResolver, http } from "msw"

import { server, withJsonBody } from "@/test/server"

import { Client, baseUrl, buildClient } from "./index"

describe("buildClient", () => {
  it("should allow overriding the default config", async () => {
    const defaultConfig = {
      method: "GET",
    }

    const overrideConfig = {
      method: "POST",
    }
    const testApiClient: Client = {
      build: buildClient("https://api.example.com", defaultConfig),
      createUrl: baseUrl("https://api.example.com"),
    }

    const testFn = jest.fn()

    server.use(
      http.post("https://api.example.com/endpoint", ({ request }) => {
        testFn({ method: request.method })
        return HttpResponse.json({})
      }),
    )

    const fetch = testApiClient.build()
    await fetch("/endpoint", overrideConfig)

    expect(testFn).toHaveBeenCalledWith(overrideConfig)
  })

  it("should serialize the body as JSON", async () => {
    const resolver: HttpResponseResolver = jest.fn(() => {
      return HttpResponse.json()
    })

    const testApiClient: Client = {
      build: buildClient("https://api.example.com"),
      createUrl: baseUrl("https://api.example.com"),
    }

    const expectedBody = { foo: "bar" }

    server.use(
      http.post(
        "https://api.example.com/endpoint",
        withJsonBody(expectedBody, resolver),
      ),
    )

    const fetch = testApiClient.build()
    await fetch("/endpoint", {
      method: "POST",
      body: { foo: "bar" },
      headers: {
        "Content-Type": "application/json",
      },
    })

    expect(resolver).toHaveBeenCalledTimes(1)
  })
})
