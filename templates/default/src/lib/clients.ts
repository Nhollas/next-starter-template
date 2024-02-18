import axios from "axios"

import { serverEnv } from "./env"

export const client = () =>
  axios.create({
    baseURL: `/api`,
  })

export const exampleClient = () => {
  const { EXAMPLE_SERVICE_URL } = serverEnv()

  return axios.create({
    baseURL: `${EXAMPLE_SERVICE_URL}/api`,
  })
}
