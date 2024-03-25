type RequestInitWithTypedBody<T> = Omit<RequestInit, "body"> & { body?: T }

export interface Client {
  build: () => <T>(
    url: string,
    config?: RequestInitWithTypedBody<T> | undefined,
  ) => Promise<Response>
  createUrl: (path: string) => string
}

export const buildClient =
  <T>(base: string, defaultConfig?: RequestInitWithTypedBody<T>) =>
  () =>
  (url: string, config?: RequestInitWithTypedBody<T>) =>
    fetch(base + url, {
      ...defaultConfig,
      ...config,
      body: JSON.stringify(config ? config.body : undefined),
    })

export const baseUrl = (base: string) => (path: string) => `${base}${path}`
