import axios from "axios"

import { serverEnv } from "./env"

export const client = () =>
  axios.create({
    baseURL: `/api`,
    headers: {
      "Content-Type": "application/json",
    },
  })

export const exampleClient = () =>
  axios.create({
    baseURL: `${serverEnv().EXAMPLE_SERVICE_URL}/api`,
    headers: {
      "Content-Type": "application/json",
    },
  })
