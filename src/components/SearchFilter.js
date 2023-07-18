import { Input, Modal, Form, Select, Button } from "antd";
import React, { useState, useCallback } from "react";
import { FilterOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  useSearchJobQuery,
  useSortJobsQuery,
} from "../redux/features/jobs/jobsApi";
import debounce from "../debounce/debounce";
import {
  searchJobsData,
  setSearchQuery,
} from "../redux/features/jobs/jobSlice";
const { Search } = Input;
const { Option } = Select;

const SearchFilter = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.jobs.searchQuery);

  const [selectedValues, setSelected] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { data } = useSearchJobQuery(searchQuery, {
    skip: debounce === "",
  });
  const { data: sortedData } = useSortJobsQuery(selectedValues);
  const jobs = useSelector((state) => state.jobs.searchedJobs);

  const handleChange = (value) => {
    dispatch(setSearchQuery(value));
  };

  function sort(values) {
    setSelected(values);

    handleCancel();
  }
  ///prevent unnecessary re-rendering
  const optimizedFn = useCallback(debounce(handleChange), []);
  // pushing data to alljobs
  data && dispatch(searchJobsData(data));

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="d-flex justify-content-center ">
      <div className="d-flex input-ele">
        <Search onSearch={(value) => optimizedFn(value.replace(/\s/g, ""))} />
        <FilterOutlined onClick={showModal} className="icc" />
      </div>

      <Modal
        title="Select filters"
        footer={false}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
      >
        <Form layout="vertical" onFinish={sort}>
          <Form.Item name="experience" label="Experience">
            <Select>
              <Option value={0}>Fresher</Option>
              <Option value={1}>1 Year</Option>
              <Option value={2}>2 Years</Option>
              <Option value={3}>3 Years</Option>
              <Option value={4}>4 Years</Option>
              <Option value={5}>5 Years</Option>
              <Option value={+7}>+7 Years</Option>
            </Select>
          </Form.Item>

          <Form.Item name="salary" label="Salary">
            <Select>
              <Option value={75000}>75,000+</Option>
              <Option value={85000}>85,000+</Option>
              <Option value={95000}>95000+</Option>
              <Option value={100000}>100,000+</Option>
              <Option value={120000}>120,000+</Option>
              <Option value={150000}>150,000+</Option>
            </Select>
          </Form.Item>
          <Button htmlType="submit">Filter</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default SearchFilter;
