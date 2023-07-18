import React from "react";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const Notifications = ({ isLoading, isSuccess, error, info }) => {
  if (isLoading) {
    return <Spinner />;
  }
  if (isSuccess && info !== "") {
    console.log("info", info);
    toast.success(`${info}`, {
      toastId: "success1",
    });
  }
  if (error) {
    toast.error(`${error.data.message}`, {
      toastId: "errr1",
    });
  }
};

export default Notifications;
