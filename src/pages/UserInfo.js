import React from "react";
import { useParams } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const UserInfo = () => {
  const { id } = useParams();

  const users = useSelector((state) => state.auth.allUsers);

  const user = users.find((user) => user?._id === id);

  return (
    <DefaultLayout>
      {user && (
        <div>
          <h3>
            <b>Personal information</b>
          </h3>
          <p>
            <b>First name : </b>
            {user?.firstName}
          </p>
          <p>
            <b>Last name : </b>
            {user?.lastName}
          </p>
          <p>
            <b>Email : </b>
            {user?.email}
          </p>
          <p>
            <b>Mobile Number : </b>
            {user?.mobileNumber}
          </p>
          <p>
            <b>Address : </b>
            {user?.address}
          </p>

          <hr />
          <h3>
            <b>Skills</b>
          </h3>

          {user?.skills.map((skill) => {
            return (
              <>
                <li key={uuidv4()}>{skill?.skills}</li>
              </>
            );
          })}

          <hr />
          <h3>
            <b>Education</b>
          </h3>
          {user.education.map((education) => {
            return (
              <>
                <li key={uuidv4()}>{education?.education}</li>
              </>
            );
          })}
          <hr />

          <h3>
            <b>Projects</b>
          </h3>
          {user?.projects.map((project) => {
            return (
              <>
                <li key={uuidv4()}>{project?.projects}</li>
              </>
            );
          })}

          <hr />
          <h3>
            <b>Experience</b>
          </h3>
          {user?.experience.map((experience) => {
            return (
              <>
                <li key={uuidv4()}>{experience?.experience}</li>
              </>
            );
          })}
        </div>
      )}
    </DefaultLayout>
  );
};

export default UserInfo;
