import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { useParams } from "react-router-dom";
import { useDeleteJobMutation } from "../redux/features/jobs/jobsApi";
import DefaultLayout from "../components/DefaultLayout";
import Notifications from "../components/Notifications";
import { useNavigate } from "react-router-dom";

const DeleteJob = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteJob, { isLoading, error, isSuccess }] = useDeleteJobMutation();
  const navigate = useNavigate();
  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleDelete = (id) => {
   
    deleteJob(id);
    setIsModalOpen(false);
   
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    navigate("/posted");
  };
  return (
    <DefaultLayout>
      <Notifications
        isLoading={isLoading}
        error={error}
        isSuccess={isSuccess}
        info={`Deleted successfully!`}
      />
      <Modal
        title="Delete Job"
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={handleCancel}
      >
        <p style={{ color: "#FF163F" }}>
          Are sure you want to delete this job post?
        </p>
      </Modal>
    </DefaultLayout>
  );
};

export default DeleteJob;
