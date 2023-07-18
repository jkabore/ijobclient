import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./features/jobs/jobSlice";
import authReducer from "./features/auth/authSlice";
import { apiSlice } from "./api/apiSlice";

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    jobs: jobReducer,
    auth: authReducer,
  },
  // getDefaultMiddleware enables important feature like caching.
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
  devTools: true,
});
