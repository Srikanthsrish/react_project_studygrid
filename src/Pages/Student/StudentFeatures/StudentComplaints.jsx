import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Form, Input, Select, Table, Button, Spin, Alert, Space, Modal, Grid } from "antd";
import { DeleteOutlined, PlusOutlined, SendOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/reset.css";
const { Option } = Select;
const { confirm } = Modal;
const { useBreakpoint } = Grid;

const SubmitComplaint = () => {
  const { class: className, fullName } = useParams();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const screens = useBreakpoint();
  
  // Fetch complaints
  const fetchComplaints = async () => {
    if (!className || !fullName) {
      toast.dismiss();
      toast.error("Class name and full name are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://studygrid-backendmongo.onrender.com/complains/${className}/${fullName}`
      );
      setComplaints(response.data);
      toast.dismiss();
      toast.success("Complaints loaded successfully!");
    } catch (err) {
      toast.dismiss();
      toast.error("Error fetching complaints.");
      setComplaints([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchComplaints();
  }, [className, fullName]);

  // Handle form submission
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const complaintData = { ...values, teacherId: "T001" };
      await axios.post(
        `https://studygrid-backendmongo.onrender.com/complains/${className}/${fullName}`,
        complaintData
      );
      toast.dismiss();
      toast.success("Complaint submitted successfully!");
      form.resetFields();
      setModalVisible(false);
      fetchComplaints();
    } catch (err) {
      toast.dismiss();
      toast.error("Error submitting complaint.");
    }
    setLoading(false);
  };

  // Handle delete with confirmation
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure you want to delete this complaint?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        setLoading(true);
        try {
          await axios.delete(`https://studygrid-backendmongo.onrender.com/complains/${id}`);
          setComplaints(complaints.filter((complaint) => complaint._id !== id));
          toast.dismiss();
          toast.success("Complaint deleted successfully!");
        } catch (err) {
          toast.dismiss();
          toast.error("Error deleting complaint.");
        }
        setLoading(false);
      },
    });
  };

  // Table Columns
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      width: screens.xs ? 80 : "auto", // Compact on mobile
      onHeaderCell: () => ({
        style: { backgroundColor: "#2C3E50", color: "white" },
      }),
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
      width: screens.xs ? 100 : "auto",
      onHeaderCell: () => ({
        style: { backgroundColor: "#2C3E50", color: "white" },
      }),
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
      width: screens.xs ? 120 : "auto",
      onHeaderCell: () => ({
        style: { backgroundColor: "#2C3E50", color: "white" },
      }),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      width: screens.xs ? 150 : "auto",
      onHeaderCell: () => ({
        style: { backgroundColor: "#2C3E50", color: "white" },
      }),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Pending", value: "pending" },
        { text: "Resolved", value: "resolved" },
        { text: "In Progress", value: "in-progress" },
      ],
      onFilter: (value, record) => record.status === value,
      width: screens.xs ? 100 : "auto",
      onHeaderCell: () => ({
        style: { backgroundColor: "#2C3E50", color: "white" },
      }),
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => new Date(date).toLocaleDateString(), // Compact date format for mobile
      width: screens.xs ? 120 : "auto",
      onHeaderCell: () => ({
        style: { backgroundColor: "#2C3E50", color: "white" },
      }),
    },
    {
      title: "Action",
      key: "action",
      width: screens.xs ? 80 : "auto",
      render: (_, record) => (
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => showDeleteConfirm(record._id)}
        >
          Delete
        </Button>
      ),
      onHeaderCell: () => ({
        style: { backgroundColor: "#2C3E50", color: "white" },
      }),
    },
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          flexDirection: screens.xs ? "column" : "row", // Stack vertically on mobile, horizontally on larger screens
          justifyContent: "space-between",
          alignItems: screens.xs ? "flex-start" : "center", // Align text properly on mobile
          width: "100%",
          gap: screens.xs ? "10px" : "0", // Adds spacing in mobile view
        }}
      >
        <h1 style={{ color: "#2C3E50", margin: 0 }}>Complaint Management</h1>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalVisible(true)}
          style={{
            backgroundColor: "#2C3E50",
            borderColor: "#3498DB",
            width: screens.xs ? "100%" : "auto", // Full width on small screens
            maxWidth: screens.xs ? "250px" : "auto", // Restrict button width on mobile
            display: "flex",
            justifyContent: "center",
          }}
        >
          Add Complaint
        </Button>
      </div>


      {/* Complaint Submission Modal */}
      <Modal title="Submit a Complaint" open={modalVisible} onCancel={() => setModalVisible(false)} footer={null}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please enter a description" }]}>
            <Input.TextArea placeholder="Enter complaint details" />
          </Form.Item>
          <Form.Item label="Status" name="status" initialValue="pending">
            <Select>
              <Option value="pending">Pending</Option>
              <Option value="resolved">Resolved</Option>
              <Option value="in-progress">In Progress</Option>
            </Select>
          </Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
              Submit Complaint
            </Button>
            <Button onClick={() => setModalVisible(false)}>Cancel</Button>
          </Space>
        </Form>
      </Modal>

      {/* Complaints Table */}
      <div style={{ marginTop: "2rem" }}>
        {loading ? <Spin size="large" style={{ display: "block", margin: "auto" }} /> :
          <Table
            columns={columns}
            dataSource={complaints}
            rowKey="_id"
            bordered
            pagination={{ pageSize: 5 }}
            scroll={{ x: screens.xs ? 800 : "auto" }} // Enables horizontal scroll for mobile
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              overflowX: "auto", // Enables scrolling on smaller screens
            }}
          />}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SubmitComplaint;

