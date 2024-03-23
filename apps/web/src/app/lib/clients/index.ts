export interface Client {
  build: () => (
    url: string,
    config?: RequestInit | undefined,
  ) => Promise<Response>
  createUrl: (path: string) => string
}

export const buildClient =
  (base: string, defaultConfig?: RequestInit) =>
  () =>
  (url: string, config?: RequestInit) =>
    fetch(base + url, { ...defaultConfig, ...config })

export const baseUrl = (base: string) => (path: string) => `${base}${path}`
