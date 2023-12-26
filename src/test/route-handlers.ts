export const createMockRequest = (overrides?: Partial<Request>): Request => {
  const mockedRequest: Request = {
    cache: "default",
    credentials: "include",
    destination: "",
    headers: jest.fn() as any,
    integrity: "",
    keepalive: false,
    method: "",
    mode: "same-origin",
    redirect: "error",
    referrer: "",
    referrerPolicy: "",
    signal: jest.fn() as any,
    url: "",
    clone: function (): Request {
      throw new Error("Function not implemented.")
    },
    body: null,
    bodyUsed: false,
    arrayBuffer: function (): Promise<ArrayBuffer> {
      throw new Error("Function not implemented.")
    },
    blob: function (): Promise<Blob> {
      throw new Error("Function not implemented.")
    },
    formData: function (): Promise<FormData> {
      throw new Error("Function not implemented.")
    },
    json: function (): Promise<any> {
      throw new Error("Function not implemented.")
    },
    text: function (): Promise<string> {
      throw new Error("Function not implemented.")
    },
    ...overrides,
  }

  return mockedRequest
}
