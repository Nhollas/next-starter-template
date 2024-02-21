import axios from "axios";

import { serverEnv } from "./env";

export const client = () =>
  axios.create({
    baseURL: `/api`,
  });

export const serverClient = () => {
  const { EXAMPLE_CLIENT_URL } = serverEnv();

  return axios.create({
    baseURL: `${EXAMPLE_CLIENT_URL}/api`,
  });
};
