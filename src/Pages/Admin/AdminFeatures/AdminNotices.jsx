import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Input,
  Select,
  Table,
  Modal,
  Spin,
  message,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";

const { Option } = Select;
const { confirm } = Modal;

const AdminNotices = () => {
  const [form] = Form.useForm();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/notices");
      setNotices(response.data);
    } catch (error) {
      message.error("Failed to load notices.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/notices", values);
      message.success("Notice added successfully!");
      form.resetFields();
      setShowFormModal(false);
      fetchNotices();
    } catch (error) {
      message.error("Failed to add notice.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNotice = (id) => {
    confirm({
      title: "Are you sure you want to delete this notice?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        setLoading(true);
        try {
          await axios.delete(`http://localhost:5000/api/notices/${id}`);
          message.success("Notice deleted successfully.");
          fetchNotices();
        } catch (error) {
          message.error("Failed to delete notice.");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const columns = [
    {
      title: "Audience",
      dataIndex: "audience",
      key: "audience",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button danger onClick={() => handleDeleteNotice(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 20, backgroundColor: "#EAF2F8", borderRadius: 10 }}>
      <h2 style={{ color: "#2C3E50" }}>Notice Management</h2>
      <Button
        type="primary"
        onClick={() => setShowFormModal(true)} // Open modal on button click
        style={{
          marginBottom: 20,
          backgroundColor: "#2C3E50",
          borderColor: "#2C3E50",
        }}
      >
        Add Notice
      </Button>

      {/* Modal for adding notice */}
      <Modal
        title="Add Notice"
        visible={showFormModal}
        onCancel={() => setShowFormModal(false)} // Close the modal
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          style={{ background: "white", padding: 20, borderRadius: 10 }}
        >
          <Form.Item
            label="Select Audience"
            name="audience"
            rules={[{ required: true, message: "Please select an audience!" }]}
          >
            <Select placeholder="Select audience">
              <Option value="students">Students</Option>
              <Option value="teachers">Teachers</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter the title!" }]}
          >
            <Input placeholder="Enter title" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description!" }]}
          >
            <Input.TextArea rows={3} placeholder="Enter description" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "#2C3E50",
                borderColor: "#2C3E50",
              }}
            >
              Submit Notice
            </Button>
            <Button
              type="default"
              onClick={() => {
                form.resetFields();
                setShowFormModal(false);
              }}
              style={{ marginLeft: 10, color: "red" }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Table columns={columns} dataSource={notices} rowKey="id" bordered />
      )}
    </div>
  );
};

export default AdminNotices;

