import { apiSlice } from "../../api/apiSlice";
import { getJobsData, searchJobsData } from "./jobSlice";

export const jobsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get ALL jobs
    getAllJobs: builder.query({
      query: () => "/jobs/getalljobs",
      providesTags: ["Jobs"],
    }),

    // Add a job
    postJob: builder.mutation({
      query: (data) => {
        data.postedBy = JSON.parse(localStorage.getItem("auth")).user._id;
        console.log("posted", data);
        return {
          url: "/jobs/postjob",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: updatedJob } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getAllJobs", undefined, (draft) => {
              Object.assign(draft, updatedJob);
            })
          );
        } catch (error) {
          console.log("error in catch block");
        }
      },
    }),

    getJob: builder.query({
      query: (id) => `/getalljobs/${id}`,
    }),

    editJob: builder.mutation({
      query: (data) => {
        const id = data._id;

        return {
          url: `/jobs/getalljobs/${id}`,
          method: "PUT",
          body: data,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const updatedJob = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getAllJobs", undefined, (draft) => {
              dispatch(getJobsData(updatedJob.data));
            })
          );
        } catch (error) {
          console.log("error in catch block", error);
        }
      },
    }),

    // apply for a job a job
    applyJob: builder.mutation({
      query: (data) => {
        return {
          url: "/jobs/applyjob",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: updatedJob } = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getAllJobs", undefined, (draft) => {
              Object.assign(draft, updatedJob);
            })
          );
          setTimeout(() => {
            window.location.href = "/home";
          }, 1000);
        } catch (error) {
          console.log("error: ", error);
        }
      },
    }),

    // search jobs
    searchJob: builder.query({
      query: (title) => {
        if (title !== null) {
          return {
            url: `/jobs/search/${title}`,
            method: "POST",
          };
        }
      },
    }),
    // search jobs
    sortJobs: builder.query({
      query: () => `/jobs/getalljobs`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const jobs = await queryFulfilled;

          let filteredJobs = jobs.data;
          if (arg?.experience !== undefined) {
            filteredJobs = jobs.data.filter(
              (job) => job?.experience <= arg?.experience
            );
          }
          if (arg?.salary !== undefined) {
            filteredJobs = jobs.data.filter(
              (job) => job?.salaryTo >= arg?.salary
            );
          }
          dispatch(searchJobsData(filteredJobs));
        } catch (error) {
          console.log("error in catch block", error);
        }
      },
    }),
    // Delete job by id
    deleteJob: builder.mutation({
      query: (id) => {
        return {
          url: `/jobs/deletejob/${id}`,
          method: "DELETE",
        };
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      //invalidatesTags: (result, error, id) => [{ type: "Jobs", id }],
    }),
    async onQueryStarted(arg, { queryFulfilled, dispatch }) {
      try {
        const result = await queryFulfilled;

        dispatch(
          apiSlice.util.updateQueryData("getAllJobs", undefined, (draft) => {
            let newresult = draft.filter((job) => job?.id !== arg?.id);
            Object.assign(newresult, result);
          })
        );
      } catch (error) {
        console.log("error in catch block:", error);
      }
    },
  }),
});

export const {
  useGetAllJobsQuery,
  usePostJobMutation,
  useEditJobMutation,
  useDeleteJobMutation,
  useApplyJobMutation,
  useSearchJobQuery,
  useSortJobsQuery,
} = jobsApi;
