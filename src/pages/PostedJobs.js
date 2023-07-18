import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { Table, Modal } from "antd";
import { useDeleteJobMutation } from "../redux/features/jobs/jobsApi";

import { getJobsData } from "../redux/features/jobs/jobSlice";
import {
  DeleteOutlined,
  EditOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import Notifications from "../components/Notifications";

const PostedJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState();
  const [selectedId, setSelectedId] = useState("");
  const [postedJob, setPostedJob] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const alljobs = useSelector((state) => state.jobs.value);
  const allusers = useSelector((state) => state.auth.allUsers);
  const userid = JSON.parse(localStorage.getItem("auth")).user._id;
  const [deleteJob, { data, isLoading, error, isSuccess }] =
    useDeleteJobMutation();

  useEffect(() => {
    if (data === undefined) {
      setPostedJob(alljobs);
    } else {
      setPostedJob(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  let userPostedJobs = postedJob.filter((job) => job?.postedBy === userid);

  const columns = [
    {
      key: "1",
      title: "Title",
      dataIndex: "title",
    },
    {
      key: "2",
      title: "Company",
      dataIndex: "company",
    },
    {
      key: "3",
      title: "Posted On",
      dataIndex: "postedOn",
    },
    {
      key: "4",
      title: "Applied Candidates",
      dataIndex: "appliedCandidates",
    },
    {
      title: "Actions",
      render: (text, data) => {
        return (
          <div className="d-flex justify-content-evenly">
            <EditOutlined
              key="action1"
              className="e-4"
              style={{ fontSize: 20 }}
              onClick={() => {
                navigate(`/editjob/${data.completeJobData._id}`);
              }}
            />

            <DeleteOutlined
              key="action2"
              style={{ fontSize: 20 }}
              onClick={() => {
                showModalTwo(data.completeJobData);
              }}
            />

            <OrderedListOutlined
              key="action3"
              style={{ fontSize: 20 }}
              onClick={() => {
                showModal(data.completeJobData);
              }}
            />
          </div>
        );
      },
    },
  ];

  const dataSource = [];

  for (let job of userPostedJobs) {
    let obj = {
      title: job.title,
      company: job.company,
      postedOn: moment(job.createdAt).format("MMM DD yyyy"),
      appliedCandidates: job.appliedCandidates.length,
      completeJobData: job,
    };
    dataSource.push(obj);
  }

  const showModal = (job) => {
    setIsModalVisible(true);
    setSelectedJob(job);
  };
  const showModalTwo = (job) => {
    const { title, _id } = job;

    setIsModalOpen(true);
    setSelectedId(_id);
    setSelectedTitle(title);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleCancelTwo = () => {
    setIsModalOpen(false);
  };
  const handleDelete = () => {
    setIsModalOpen(false);

    deleteJob(selectedId);
  };
  isSuccess && dispatch(getJobsData(data));

  function CandidatesList() {
    const candidatesColumns = [
      {
        title: "Candidate Id",
        dataIndex: "candidateId",
        render: (text, data) => {
          return (
            <Link to={`/users/${data.candidateId}`}>{data.candidateId}</Link>
          );
        },
      },
      {
        title: "Full Name",
        dataIndex: "fullName",
      },
      { title: "Applied Date", dataIndex: "appliedDate" },
    ];
    let candidatesDatasource = [];

    for (let candidate of selectedJob.appliedCandidates) {
      let user = allusers.find((user) => user?._id === candidate?.userid);

      let obj = {
        candidateId: user._id,
        fullName: user.firstName + " " + user.lastName,
        appliedDate: candidate.appliedDate,
      };

      candidatesDatasource.push(obj);
    }

    return (
      <Table columns={candidatesColumns} dataSource={candidatesDatasource} />
    );
  }
  return (
    <div>
      <DefaultLayout>
        <h1>Posted Jobs</h1>

        <Table
          columns={columns}
          dataSource={dataSource}
          size="small"
          scroll={{ x: 400 }}
        />

        <Modal
          title="Applied Candidates List"
          open={isModalVisible}
          closable={false}
          onOk={handleOk}
          onCancel={handleCancel}
          width={800}
        >
          <CandidatesList />
        </Modal>
        <Modal
          title="Delete Job"
          open={isModalOpen}
          onOk={handleDelete}
          okText="Delete"
          onCancel={handleCancelTwo}
          closable={false}
        >
          <div className="d-flex justify-content-center align-items-center">
            <p style={{ color: "#FF163F", marginRight: 4 }}>
              Are sure you want to delete this job post
            </p>
            <b>{selectedTitle} ?</b>
          </div>
        </Modal>
        <Notifications
          isLoading={isLoading}
          error={error}
          isSuccess={isSuccess}
          info={`Deleted successfully!`}
        />
      </DefaultLayout>
    </div>
  );
};

export default PostedJobs;
