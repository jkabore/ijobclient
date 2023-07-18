import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import { useGetAllJobsQuery } from "../redux/features/jobs/jobsApi";
import { getJobsData } from "../redux/features/jobs/jobSlice";
import Notifications from "../components/Notifications";

import moment from "moment";

const Home = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.searchedJobs);
  const jobsData = useSelector((state) => state.jobs?.value);

  const { data, isError, isLoading, isSuccess } = useGetAllJobsQuery();

  if (isSuccess && jobsData !== null) {
    dispatch(getJobsData(data));
  } else {
    dispatch(getJobsData(data));
  }

  return (
    <div>
      <div>
        <DefaultLayout>
          <Notifications
            isLoading={isLoading}
            error={isError}
            isSuccess={isSuccess}
            info={""}
          />
          {jobs !== undefined ? (
            <Row gutter={16}>
              {jobs.map((job) => {
                return (
                  <Col lg={12} sm={24} key={job._id}>
                    <div className="job-div bs m-2 p-2">
                      <h4>{job?.title}</h4>
                      <p>{job?.company}</p>
                      <hr />
                      <p>{job.smallDescription}</p>
                      <div className="flex">
                        <p>
                          Salary :{" "}
                          <b>
                            {job?.salaryFrom} - {job.salaryTo}
                          </b>{" "}
                          ,{" "}
                        </p>
                        <p style={{ marginLeft: 20 }}>
                          Experience : <b>{job?.experience} Years</b>{" "}
                        </p>
                      </div>
                      <hr />

                      <div className="flex justify-content-between">
                        <Link to={`/jobs/${job?._id}`}>
                          <Button>View</Button>
                        </Link>
                        <p>
                          Posted on :{" "}
                          {moment(job?.createdAt).format("MMM DD yyyy")}
                        </p>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          ) : (
            <Row gutter={16}>
              {jobs !== null &&
                data.map((job) => {
                  return (
                    <Col lg={12} sm={24} key={job._id}>
                      <div className="job-div bs m-2 p-2">
                        <h4>{job?.title}</h4>
                        <p>{job?.company}</p>
                        <hr />
                        <p>{job?.smallDescription}</p>
                        <div className="flex">
                          <p>
                            Salary :{" "}
                            <b>
                              {job?.salaryFrom} - {job?.salaryTo}
                            </b>{" "}
                            ,{" "}
                          </p>
                          <p style={{ marginLeft: 20 }}>
                            Experience : <b>{job?.experience} Years</b>{" "}
                          </p>
                        </div>
                        <hr />

                        <div className="flex justify-content-between">
                          <Link to={`/jobs/${job?._id}`}>
                            <Button>View</Button>
                          </Link>
                          <p>
                            Posted on :{" "}
                            {moment(job?.createdAt).format("MMM DD yyyy")}
                          </p>
                        </div>
                      </div>
                    </Col>
                  );
                })}
            </Row>
          )}
        </DefaultLayout>
      </div>
    </div>
  );
};

export default Home;
