import { Button, Tag } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import { useApplyJobMutation } from "../redux/features/jobs/jobsApi";
import Notifications from "../components/Notifications";
function JobInfo() {
  const jobs = useSelector((state) => state.jobs.value);
  const searchedJobs = useSelector((state) => state.jobs.searchedJobs);
  /// job muatation
  const [applyJob, { isLoading, error, isSuccess }] = useApplyJobMutation();
  const { id } = useParams();

  const job = jobs?.find((job) => job?._id === id);
  const job2 = searchedJobs?.find((job) => job?._id === id);
  const userid = JSON.parse(localStorage.getItem("auth"))?.user?._id;

  const appliedCandidates = job?.appliedCandidates;

  const alreadyApplied = appliedCandidates.find(
    (candidate) => candidate?.userid === userid
  );

  const dispatch = useDispatch();

  function applyNow() {
    applyJob({ userid, job });
  }

  return (
    <div>
      <DefaultLayout>
        <Notifications
          isLoading={isLoading}
          error={error}
          isSuccess={isSuccess}
          info={`applied successfully!`}
        />
        {job ? (
          <div>
            <p>
              <b>Title</b> : {job?.title}
            </p>
            <p>
              <b>Company</b> : {job?.company}
            </p>

            <p>
              <b>Small Description</b> : {job?.smallDescription}
            </p>
            <p>
              <b>Full Description</b> : {job?.fullDescription}
            </p>
            <p>
              <b>Title</b> : {job?.title}
            </p>
            <p>
              <b>Skills Required</b> : {job?.skillsRequired}
            </p>
            <p>
              <b>Experience</b> : {job?.experience}
            </p>
            <p>
              <b>Minimum Qualification</b> : {job?.minimumQualification}
            </p>

            <hr />

            <p>
              <b>Salary Range</b> : {job?.salaryFrom} - {job?.salaryTo}
            </p>
            <p>
              <b>Department</b> : {job?.department}
            </p>
            <p>
              <b>Company Profile</b> : {job?.companyDescription}
            </p>
            <p>
              <b>Total Candidates applied</b> : {job?.appliedCandidates.length}
            </p>

            <hr />

            <div className="flex justify-content-between">
              {job.postedBy === userid ? (
                <Button>
                  <Link to={`/editjob/${job?._id}`}>Edit Now</Link>
                </Button>
              ) : alreadyApplied !== undefined ? (
                <Tag color="green">Already Applied</Tag>
              ) : (
                <Button onClick={applyNow}>Apply Now</Button>
              )}
              <p>
                <b>Posted on</b> {moment(job?.createdAt).format("MMM DD yyyy")}
              </p>
            </div>
          </div>
        ) : (
          job2 && (
            <div>
              <p>
                <b>Title</b> : {job?.title}
              </p>
              <p>
                <b>Company</b> : {job?.company}
              </p>

              <p>
                <b>Small Description</b> : {job?.smallDescription}
              </p>
              <p>
                <b>Full Description</b> : {job?.fullDescription}
              </p>
              <p>
                <b>Title</b> : {job?.title}
              </p>
              <p>
                <b>Skills Required</b> : {job?.skillsRequired}
              </p>
              <p>
                <b>Experience</b> : {job?.experience}
              </p>
              <p>
                <b>Minimum Qualification</b> : {job?.minimumQualification}
              </p>

              <hr />

              <p>
                <b>Salary Range</b> : {job?.salaryFrom} - {job?.salaryTo}
              </p>
              <p>
                <b>Department</b> : {job?.department}
              </p>
              <p>
                <b>Company Profile</b> : {job?.companyDescription}
              </p>
              <p>
                <b>Total Candidates applied</b> :{" "}
                {job?.appliedCandidates.length}
              </p>

              <hr />

              <div className="flex justify-content-between">
                {job.postedBy === userid ? (
                  <Button>
                    <Link to={`/editjob/${job?._id}`}>Edit Now</Link>
                  </Button>
                ) : alreadyApplied ? (
                  <Tag color="green">Already Applied</Tag>
                ) : (
                  <Button onClick={applyNow}>Apply Now</Button>
                )}

                <Button>Delete Job</Button>

                <p>
                  <b>Posted on</b>{" "}
                  {moment(job?.createdAt).format("MMM DD yyyy")}
                </p>
              </div>
            </div>
          )
        )}
      </DefaultLayout>
    </div>
  );
}

export default JobInfo;
