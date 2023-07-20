import "antd/dist/reset.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import { useGetAllUsersQuery } from "./redux/features/auth/authApi";
import Home from "./pages/Home";
import EditJob from "./pages/EditJob";
import JobInfo from "./pages/JobInfo";
import Profile from "./pages/Profile";
import PostJob from "./pages/PostJob";
import AppliedJobs from "./pages/AppliedJobs";
import { useDispatch } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostedJobs from "./pages/PostedJobs";
import PrivateRoute from "./ProtectedRoutes/PrivateRoute";
import useAuthCheck from "./authHooks/useAuthCheck";
import UserInfo from "./pages/UserInfo";
import { getUsersData } from "./redux/features/auth/authSlice";
import SearchFilter from "./components/SearchFilter";
import DeleteJob from "./pages/DeleteJob";

// ..
AOS.init();

function App() {
  const dispatch = useDispatch();
  const authChecked = useAuthCheck();
  const { data } = useGetAllUsersQuery();
  useEffect(() => {
    getUsersData(data);
  }, []);
  const dispatchUsers = async () => {
    try {
      if (authChecked) {
        dispatch(getUsersData(data));
      }
    } catch (error) {
      console("Erro: ", error);
    }
  };

  dispatchUsers();

  return !authChecked ? (
    <div className=" d-flex justify-content-center">
      <h3>...</h3>
    </div>
  ) : (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/editjob/:id"
            element={
              <PrivateRoute>
                <EditJob />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/deletejob/:id"
            element={
              <PrivateRoute>
                <DeleteJob />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/search/:id"
            element={
              <PrivateRoute>
                <SearchFilter />
              </PrivateRoute>
            }
          ></Route>

          <Route
            path="/jobs/:id"
            element={
              <PrivateRoute>
                <JobInfo />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/user/:id"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/postjob"
            element={
              <PrivateRoute>
                <PostJob />
              </PrivateRoute>
            }
          ></Route>

          <Route
            path="/posted"
            element={
              <PrivateRoute>
                <PostedJobs />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/appliedjobs"
            element={
              <PrivateRoute>
                <AppliedJobs />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/users/:id"
            element={
              <PrivateRoute>
                <UserInfo />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </Router>
      <ToastContainer limit={1} autoClose={2000} />
    </div>
  );
}

export default App;
