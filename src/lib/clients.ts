import axios from "axios"

export const client = axios.create({
  baseURL: `/api`,
  headers: {
    "Content-Type": "application/json",
  },
})

export const exampleClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_EXAMPLE_SERVICE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
})
