import "@testing-library/react"
import { server } from "@/test/server"

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())
