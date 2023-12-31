import { apiSlice } from "../../api/apiSlice";
import { userLoggedIn, userInfo, getUsersData } from "./authSlice";

//const id = user._id;
export const authAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // register process
    register: builder.mutation({
      query: (data) => ({
        url: "/api/users/register",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          // navigate to home page
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),

    // login process
    login: builder.mutation({
      query: (data) => {
        return { url: "/api/users/login", method: "POST", body: data };
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // when fulfilled set data to localstorage
         

          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.token,
              user: result.data.user,
            })
          );
          dispatch(
            apiSlice.util.updateQueryData("getAllUsers", undefined, (draft) => {
              getUsersData();
            })
          );
          // dispatch those data to redux store

          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
          setTimeout(() => {
            window.location.href = "/home";
          }, 10000);
        } catch (err) {
          console.log("error", err);
        }
      },
    }),
    // Get ALL users
    getAllUsers: builder.query({
      query: () => "/api/users/getallusers",
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // when fulfilled

          // dispatch those data to redux store

          dispatch(getUsersData(result.data));
        } catch (err) {
          console.log("error", err.message);
        }
      },
    }),
    /// update user
    update: builder.mutation({
      query: (data) => {
        const { id, ...body } = data;
        console.log("body: ", body.data);
        return {
          url: `/api/users/user/${id}`,
          method: "PUT",
          body: body.data,
        };
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const updateUser = await queryFulfilled;

          dispatch(
            apiSlice.util.updateQueryData("getAllUsers", arg?.id, (draft) => {
              dispatch(getUsersData(updateUser.data));
            })
          );
          dispatch(userInfo(updateUser.data));
        } catch (error) {
          console.log("error in catch block:", error);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useUpdateMutation,
  useGetAllUsersQuery,
} = authAPI;
