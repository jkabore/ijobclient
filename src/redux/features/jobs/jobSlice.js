import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    value: [],
    searchedJobs: [],
    searchQuery: "",
  },
  reducers: {
    getJobsData: (state, action) => {
      state.value = action.payload;
    },
    searchJobsData: (state, action) => {
      state.searchedJobs = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});
export const { getJobsData, searchJobsData, setSearchQuery } = jobSlice.actions;
export default jobSlice.reducer;
