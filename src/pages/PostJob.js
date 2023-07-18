import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { usePostJobMutation } from "../redux/features/jobs/jobsApi";
import { Row, Col, Form, Tabs, Input, Button, Select } from "antd";
import Notifications from "../components/Notifications";
const { TextArea } = Input;
const { Option } = Select;
const PostJob = () => {
  const [jobInfo, setJobInfo] = useState({});
  const [activeTab, setActiveTab] = useState("0");
  const [postJob, { isLoading, error, isSuccess }] = usePostJobMutation();
  function onFirstFormFinish(values) {
    setJobInfo(values);
    setActiveTab("1");
  }
  function onFinalFormFinish(values) {
    const finalObj = { ...jobInfo, ...values };

    postJob(finalObj);
    window.location.href = "/";
  }
  const items = [
    {
      key: "0",
      label: `Job Info`,
      children: (
        <Form layout="vertical" onFinish={onFirstFormFinish}>
          <Row gutter={16}>
            <Col lg={8} sm={24}>
              <Form.Item
                name="title"
                rules={[{ required: true }]}
                label="Title"
              >
                <Input />
              </Form.Item>
            </Col>

            <Col lg={8} sm={24}>
              <Form.Item
                name="department"
                rules={[{ required: true }]}
                label="Department"
              >
                <Input />
              </Form.Item>
            </Col>

            <Col lg={8} sm={24}>
              <Form.Item
                name="experience"
                rules={[{ required: true }]}
                label="Experience"
              >
                <Input />
              </Form.Item>
            </Col>

            <Col lg={8} sm={24}>
              <Form.Item
                name="salaryFrom"
                rules={[{ required: true }]}
                label="Salary From"
              >
                <Input type="number" />
              </Form.Item>
            </Col>

            <Col lg={8} sm={24}>
              <Form.Item
                name="salaryTo"
                rules={[{ required: true }]}
                label="Salary To"
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col lg={8} sm={24}>
              <Form.Item
                name="skillsRequired"
                rules={[{ required: true }]}
                label="Skills"
              >
                <Input />
              </Form.Item>
            </Col>

            <Col lg={8} sm={24}>
              <Form.Item
                name="minimumQualification"
                rules={[{ required: true }]}
                label="Minimum Qualification"
              >
                <Select>
                  <Option value="3 years experience">3 years experience</Option>
                  <Option value="5 years experience">5 years experience</Option>
                  <Option value="Bachelor degree">Bachelor degree</Option>
                  <Option value="Master degree">Master degree</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col lg={24} sm={24}>
              <Form.Item
                name="smallDescription"
                rules={[{ required: true }]}
                label="Small description"
              >
                <TextArea rows={3} />
              </Form.Item>
            </Col>

            <Col lg={24} sm={24}>
              <Form.Item
                name="fullDescription"
                rules={[{ required: true }]}
                label="Full description"
              >
                <TextArea rows={6} />
              </Form.Item>
            </Col>
          </Row>

          <Button htmlType="submit">Next</Button>
        </Form>
      ),
    },
    {
      key: "1",
      label: `Company Info`,
      children: (
        <Form layout="vertical" onFinish={onFinalFormFinish}>
          <Row gutter={16}>
            <Col lg={8} sm={24}>
              <Form.Item
                name="company"
                label="Company Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={8} sm={24}>
              <Form.Item
                name="email"
                label="Company Email"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col lg={8} sm={24}>
              <Form.Item
                name="phoneNumber"
                label="Phone number"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={24} sm={24}>
              <Form.Item
                name="companyDescription"
                label="Company Description"
                rules={[{ required: true }]}
              >
                <TextArea rows={3} />
              </Form.Item>
            </Col>
          </Row>
          <Button
            onClick={() => {
              setActiveTab("0");
            }}
          >
            Previous
          </Button>
          <Button htmlType="submit">Post Job</Button>
        </Form>
      ),
    },
  ];
  return (
    <DefaultLayout>
      <Notifications
        isLoading={isLoading}
        error={error}
        isSuccess={isSuccess}
        info={"posted successfully!"}
      />
      <Tabs defaultActiveKey="0" items={items} activeKey={activeTab} />
    </DefaultLayout>
  );
};

export default PostJob;
