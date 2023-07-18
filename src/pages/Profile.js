import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import Notifications from "../components/Notifications";
import { useUpdateMutation } from "../redux/features/auth/authApi";
import { Row, Col, Form, Tabs, Input, Button } from "antd";
const { TextArea } = Input;

const Profile = () => {
  const [personalInfo, setPersonalInfo] = useState();

  const [activeTab, setActiveTab] = useState("1");

  const onChange = (activeTab) => {
    console.log("");
  };

  // user info from localStorage
  const user = JSON.parse(localStorage.getItem("auth")).user;
  const [updateUser, { isLoading, error, isSuccess }] = useUpdateMutation();
  // personal info
  function onPersonInfoSubmit(values) {
    setPersonalInfo(values);

    setActiveTab("2");
    onChange();
  }
  function onFinalFinish(values) {
    const finalObj = { ...personalInfo, ...values };

    updateUser({ id: user._id, data: finalObj });
  }

  const items = [
    {
      key: "1",
      label: `Personal Info`,
      children: (
        <Form
          layout="vertical"
          onFinish={onPersonInfoSubmit}
          initialValues={user}
        >
          <Row gutter={16}>
            <Col lg={8} sm={24}>
              <Form.Item
                label="First name"
                required
                rules={[{ required: true }]}
                name="firstName"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={8} sm={24}>
              <Form.Item
                label="Last name"
                required
                rules={[{ required: true }]}
                name="lastName"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={8} sm={24}>
              <Form.Item
                label="Email"
                required
                rules={[{ required: true }]}
                name="email"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={8} sm={24}>
              <Form.Item
                label="Mobile Number"
                required
                rules={[{ required: true }]}
                name="mobileNumber"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={8} sm={24}>
              <Form.Item
                label="Portfolio"
                required
                rules={[{ required: true }]}
                name="portfolio"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={24} sm={24}>
              <Form.Item
                label="About"
                required
                rules={[{ required: true }]}
                name="about"
              >
                <TextArea rows={4} />
              </Form.Item>
            </Col>
            <Col lg={24} sm={24}>
              <Form.Item
                label="Address"
                required
                rules={[{ required: true }]}
                name="address"
              >
                <TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
          <Button htmlType="submit">Next</Button>
        </Form>
      ),
    },
    {
      key: "2",
      label: `Skills and Education`,
      children: (
        <Form initialValues={user} layout="vertical" onFinish={onFinalFinish}>
          <Row>
            <Col lg={24} sm={24}>
              <Form.List name="education">
                {(education, { add, remove }) => (
                  <div>
                    {education.map((field, index) => (
                      <div className="flex">
                        <Form.Item
                          required
                          {...field}
                          label="Education"
                          style={{ width: "80%" }}
                          rules={[{ required: true }]}
                          name={[field.name, "education"]}
                        >
                          <TextArea rows={4} />
                        </Form.Item>
                        <Button
                          onClick={() => {
                            add();
                          }}
                        >
                          Add more
                        </Button>
                        {index !== 0 && (
                          <Button
                            onClick={() => {
                              remove(index);
                            }}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Form.List>
            </Col>

            <Col lg={24} sm={24}>
              <Form.List name="skills">
                {(skills, { add, remove }) => (
                  <div>
                    {skills.map((field, index) => (
                      <div className="flex">
                        <Form.Item
                          required
                          {...field}
                          label="Skill"
                          style={{ width: "80%" }}
                          rules={[{ required: true }]}
                          name={[field.name, "skills"]}
                        >
                          <TextArea rows={4} />
                        </Form.Item>
                        <Button
                          onClick={() => {
                            add();
                          }}
                        >
                          Add more
                        </Button>
                        {index !== 0 && (
                          <Button
                            onClick={() => {
                              remove(index);
                            }}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Form.List>
            </Col>

            <Col lg={24} sm={24}>
              <Form.List name="projects">
                {(projects, { add, remove }) => (
                  <div>
                    {projects.map((field, index) => (
                      <div className="flex">
                        <Form.Item
                          required
                          {...field}
                          label="Project"
                          style={{ width: "80%" }}
                          rules={[{ required: true }]}
                          name={[field.name, "projects"]}
                        >
                          <TextArea rows={4} />
                        </Form.Item>
                        <Button
                          onClick={() => {
                            add();
                          }}
                        >
                          Add more
                        </Button>
                        {index !== 0 && (
                          <Button
                            onClick={() => {
                              remove(index);
                            }}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Form.List>
            </Col>
            <Col lg={24} sm={24}>
              <Form.List name="experience">
                {(experience, { add, remove }) => (
                  <div>
                    {experience.map((field, index) => (
                      <div className="flex">
                        <Form.Item
                          required
                          {...field}
                          label="Experience"
                          style={{ width: "80%" }}
                          rules={[{ required: true }]}
                          name={[field.name, "experience"]}
                        >
                          <TextArea rows={4} />
                        </Form.Item>
                        <Button
                          onClick={() => {
                            add();
                          }}
                        >
                          Add more
                        </Button>
                        {index !== 0 && (
                          <Button
                            onClick={() => {
                              remove(index);
                            }}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Form.List>
            </Col>
          </Row>
          <Button
            onClick={() => {
              setActiveTab("1");
            }}
          >
            Previous
          </Button>
          <Button htmlType="submit">Update</Button>
        </Form>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        activeKey={activeTab}
      />
      <Notifications
        isLoading={isLoading}
        error={error}
        isSuccess={isSuccess}
        info={`updated successfully!`}
      />
    </DefaultLayout>
  );
};

export default Profile;
