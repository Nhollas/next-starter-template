import "@testing-library/react"
import { server } from "./src/test/server"

beforeAll(() => server.listen({ onUnhandledRequest: "error" }))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())
