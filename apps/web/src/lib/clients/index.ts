import axios, { AxiosInstance, AxiosRequestConfig } from "axios"

export interface Client {
  build: () => AxiosInstance
  createUrl: (path: string) => string
}

export const buildClient =
  (base: string, headers?: AxiosRequestConfig["headers"]) => () =>
    axios.create({
      baseURL: base,
      headers,
    })

export const baseUrl = (base: string) => (path: string) => `${base}${path}`
