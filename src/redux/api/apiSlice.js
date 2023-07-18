import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedOut } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  prepareHeaders: async (headers, {getState, endpoint}) => {
      const token = getState()?.auth?.accessToken;

      if(token) {
          headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
  }
});

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if(result?.error?.status === 401) {
        api.dispatch(userLoggedOut());
        localStorage.clear();
    }

    return result;
},
  mode: "cors",
  tagTypes: ["Jobs"],
  endpoints: (builder) => ({}),
});
