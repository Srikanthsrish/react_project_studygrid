// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   Form,
//   Input,
//   Select,
//   Table,
//   Button,
//   Typography,
//   Spin,
//   Alert,
//   Space,
//   Modal,
// } from "antd";
// import { DeleteOutlined, SendOutlined } from "@ant-design/icons";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "antd/dist/reset.css";

// const { Title } = Typography;
// const { Option } = Select;

// const SubmitComplaint = () => {
//   const { class: className, fullName } = useParams();
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [form] = Form.useForm();
//   const [modalVisible, setModalVisible] = useState(false);

//   // Fetch complaints when component mounts or params change
//   const fetchComplaints = async () => {
//     if (!className || !fullName) {
//       toast.error("Class name and full name are required.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `http://localhost:3006/complains/${className}/${fullName}`
//       );
//       setComplaints(response.data);
//       toast.success("Complaints loaded successfully!");
//     } catch (err) {
//       toast.error("Error fetching complaints.");
//       setComplaints([]);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchComplaints();
//   }, [className, fullName]);

//   // Handle form submission
//   const handleSubmit = async (values) => {
//     setLoading(true);
//     try {
//       const complaintData = {
//         ...values,
//         teacherId: "T001", // Example teacherId, modify as needed
//       };
//       await axios.post(
//         `http://localhost:3006/complains/${className}/${fullName}`,
//         complaintData
//       );
//       toast.success("Complaint submitted successfully!");
//       form.resetFields();
//       setModalVisible(false);
//       fetchComplaints();
//     } catch (err) {
//       toast.error("Error submitting complaint.");
//     }
//     setLoading(false);
//   };

//   // Handle delete complaint
//   const handleDelete = async (id) => {
//     setLoading(true);
//     try {
//       console.log("Deleting complaint with ID:", id);
//       await axios.delete(`http://localhost:3006/complains/${id}`);
//       setComplaints(complaints.filter((complaint) => complaint._id !== id));
//       toast.success("Complaint deleted successfully!");
//     } catch (err) {
//       toast.error("Error deleting complaint.");
//     }
//     setLoading(false);
//   };

//   // Table Columns
//   const columns = [
//     {
//       title: "Description",
//       dataIndex: "description",
//       key: "description",
//       ellipsis: true,
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       filters: [
//         { text: "Pending", value: "Pending" },
//         { text: "Resolved", value: "Resolved" },
//         { text: "In Progress", value: "In Progress" },
//       ],
//       onFilter: (value, record) => record.status === value,
//     },
//     {
//       title: "Created At",
//       dataIndex: "created_at",
//       key: "created_at",
//       render: (date) => new Date(date).toLocaleString(),
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <Button
//           type="primary"
//           danger
//           icon={<DeleteOutlined />}
//           onClick={() => handleDelete(record._id)}
//         >
//           Delete
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: "2rem", backgroundColor: "#EAF2F8", minHeight: "100vh" }}>
//       <Title level={2} style={{ color: "#2C3E50", textAlign: "center" }}>
//         Submit Complaint for {className} - {fullName}
//       </Title>

//       {/* Button to open the modal */}
//       <Button
//         type="primary"
//         onClick={() => setModalVisible(true)}
//         style={{
//           backgroundColor: "#3498DB",
//           borderColor: "#3498DB",
//           marginBottom: "1rem",
//         }}
//       >
//         Add Complaint
//       </Button>

//       {/* Modal for adding complaint */}
//       <Modal
//         title="Submit a Complaint"
//         open={modalVisible}
//         onCancel={() => setModalVisible(false)}
//         footer={null}
//         width={600}
//       >
//         <Form
//           form={form}
//           onFinish={handleSubmit}
//           layout="vertical"
//           style={{
//             backgroundColor: "#FFFFFF",
//             padding: "1.5rem",
//             borderRadius: "8px",
//             boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <Form.Item
//             label="Description"
//             name="description"
//             rules={[{ required: true, message: "Please enter a description" }]}
//           >
//             <Input.TextArea placeholder="Enter complaint details" />
//           </Form.Item>

//           <Form.Item label="Status" name="status" initialValue="Pending">
//             <Select>
//               <Option value="Pending">Pending</Option>
//               <Option value="Resolved">Resolved</Option>
//               <Option value="In Progress">In Progress</Option>
//             </Select>
//           </Form.Item>

//           <Space>
//             <Button
//               type="primary"
//               htmlType="submit"
//               icon={<SendOutlined />}
//               style={{
//                 backgroundColor: "#3498DB",
//                 borderColor: "#3498DB",
//               }}
//             >
//               Submit Complaint
//             </Button>

//             <Button
//               type="default"
//               onClick={() => setModalVisible(false)}
//               style={{
//                 backgroundColor: "#E4E4E4",
//                 borderColor: "#E4E4E4",
//               }}
//             >
//               Cancel
//             </Button>
//           </Space>
//         </Form>
//       </Modal>

//       <div style={{ marginTop: "2rem" }}>
//         {loading ? (
//           <Spin size="large" style={{ display: "block", margin: "auto" }} />
//         ) : complaints.length === 0 ? (
//           <Alert message="No complaints found." type="info" showIcon />
//         ) : (
//           <Table
//             columns={columns}
//             dataSource={complaints}
//             rowKey="_id"
//             bordered
//             pagination={{ pageSize: 5 }}
//             style={{
//               backgroundColor: "#FFFFFF",
//               boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//               borderRadius: "8px",
//               marginTop: "1rem",
//             }}
//           />
//         )}
//       </div>

//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default SubmitComplaint;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Form,
  Input,
  Select,
  Table,
  Button,
  Typography,
  Spin,
  Alert,
  Space,
  Modal,
} from "antd";
import { DeleteOutlined, SendOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/reset.css";

const { Title } = Typography;
const { Option } = Select;

const SubmitComplaint = () => {
  const { class: className, fullName } = useParams();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch complaints when component mounts or params change
  const fetchComplaints = async () => {
    if (!className || !fullName) {
      toast.error("Class name and full name are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://studygrid-backendmongo.onrender.com/complains/${className}/${fullName}`
      );
      setComplaints(response.data);
      toast.success("Complaints loaded successfully!");
    } catch (err) {
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
      const complaintData = {
        ...values,
        teacherId: "T001", // Example: add teacherId here, modify based on your application logic
      };
      const response = await axios.post(
        `https://studygrid-backendmongo.onrender.com/complains/${className}/${fullName}`,
        complaintData
      );
      toast.success("Complaint submitted successfully!");
      form.resetFields();
      setModalVisible(false);
      fetchComplaints();
    } catch (err) {
      toast.error("Error submitting complaint.");
    }
    setLoading(false);
  };

  // Handle delete complaint
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      console.log("Deleting complaint with ID:", id);
      await axios.delete(`https://studygrid-backendmongo.onrender.com/complains/${id}`);
      setComplaints(complaints.filter((complaint) => complaint._id !== id));
      toast.success("Complaint deleted successfully!");
    } catch (err) {
      toast.error("Error deleting complaint.");
    }
    setLoading(false);
  };

  // Table Columns
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
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
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record._id)} // Use _id for deletion
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "2rem", backgroundColor: "#EAF2F8", minHeight: "100vh" }}>
      <Title level={2} style={{ color: "#2C3E50", textAlign: "center" }}>
        Submit Complaint for {className} - {fullName}
      </Title>

      {/* Button to open the modal */}
      <Button
        type="primary"
        onClick={() => setModalVisible(true)}
        style={{
          backgroundColor: "#3498DB",
          borderColor: "#3498DB",
          marginBottom: "1rem",
        }}
      >
        Add Complaint
      </Button>

      {/* Modal for adding complaint */}
      <Modal
        title="Submit a Complaint"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          style={{
            backgroundColor: "#FFFFFF",
            padding: "1.5rem",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
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
            <Button
              type="primary"
              htmlType="submit"
              icon={<SendOutlined />}
              style={{
                backgroundColor: "#3498DB",
                borderColor: "#3498DB",
              }}
            >
              Submit Complaint
            </Button>

            <Button
              type="default"
              onClick={() => setModalVisible(false)}
              style={{
                backgroundColor: "#E4E4E4",
                borderColor: "#E4E4E4",
              }}
            >
              Cancel
            </Button>
          </Space>
        </Form>
      </Modal>

      <div style={{ marginTop: "2rem" }}>
        {loading ? (
          <Spin size="large" style={{ display: "block", margin: "auto" }} />
        ) : complaints.length === 0 ? (
          <Alert message="No complaints found." type="info" showIcon />
        ) : (
          <Table
            columns={columns}
            dataSource={complaints}
            rowKey="_id" // Use _id as row key
            bordered
            pagination={{ pageSize: 5 }}
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              marginTop: "1rem",
            }}
          />
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SubmitComplaint; 