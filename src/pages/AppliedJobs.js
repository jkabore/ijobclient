import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "antd";

const AppliedJobs = () => {
  const jobs = useSelector((state) => state.jobs.value);
  const user = JSON.parse(localStorage.getItem("auth"))?.user;
  const userAppliedJobs = [];

  for (let job of jobs) {
    const appliedCandidates = job?.appliedCandidates;

    const temp = appliedCandidates.find(
      (candidate) => candidate?.userid === user?._id
    );

    if (temp) {
      let obj = {
        title: job?.title,
        company: job?.company,
        appliedDate: temp?.appliedDate,
      };

      userAppliedJobs.push(obj);
    }
  }

  const columns = [
    {
      key: "ggd",
      title: "Job Title",
      dataIndex: "title",
    },
    {
      key: "jjf",
      title: "Company",
      dataIndex: "company",
    },
    {
      key: "zzz",
      title: "Applied Date",
      dataIndex: "appliedDate",
    },
  ];
  return (
    <DefaultLayout>
      <h1>AppliedJobs</h1>
      <Table columns={columns} dataSource={userAppliedJobs} />
    </DefaultLayout>
  );
};

export default AppliedJobs;
