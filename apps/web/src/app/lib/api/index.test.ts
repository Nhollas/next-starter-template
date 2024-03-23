import { z } from "zod" // replace with your actual file path

import modelFactory from "@/test/model-factory"

import { withValidation } from "."

// Define a simple schema for testing
const schema = z.object({
  name: z.string(),
})

// Define a mock function to use as the callback
const mockFn = jest.fn()

// Reset the mock function before each test
beforeEach(() => {
  mockFn.mockReset()
})

test("withValidation calls the callback function when validation passes", async () => {
  const request = modelFactory.request({
    json: async () => ({ name: "Test" }),
  })

  const validatedFn = withValidation(mockFn, schema)

  await validatedFn(request)

  expect(mockFn).toHaveBeenCalled()
})

test("withValidation does not call the callback function when validation fails", async () => {
  const request = modelFactory.request({
    json: async () => ({ name: 123 }), // name should be a string, not a number
  })

  const validatedFn = withValidation(mockFn, schema)

  const response = await validatedFn(request)

  expect(mockFn).not.toHaveBeenCalled()
  expect(response.status).toBe(422)
  expect(await response.text()).toBe("Validation Error")
})
