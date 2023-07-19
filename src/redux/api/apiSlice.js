import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedOut } from "../features/auth/authSlice";
const devEnv = process.env.NODE_ENV !== "production";
const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const baseQuery = fetchBaseQuery({
  baseUrl: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = getState()?.auth?.accessToken;
    console.log("token: ", token);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
      api.dispatch(userLoggedOut());
      localStorage.clear();
    }

    return result;
  },
  mode: "cors",
  tagTypes: ["Jobs"],
  endpoints: (builder) => ({}),
});
