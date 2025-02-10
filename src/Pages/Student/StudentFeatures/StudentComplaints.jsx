
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
//   Grid,
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
//   const screens = Grid.useBreakpoint(); // Use Ant Design Grid breakpoints

//   // Fetch complaints when component mounts or params change
//   const fetchComplaints = async () => {
//     if (!className || !fullName) {
//       toast.error("Class name and full name are required.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://studygrid-backendmongo.onrender.com/complains/${className}/${fullName}`
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
//         teacherId: "T001", // Example: Modify based on your application logic
//       };
//       await axios.post(
//         `https://studygrid-backendmongo.onrender.com/complains/${className}/${fullName}`,
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
//       await axios.delete(`https://studygrid-backendmongo.onrender.com/complains/${id}`);
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
//       title: "ID",
//       dataIndex: "_id",
//       key: "_id",
//     },
//     {
//       title: "Class",
//       dataIndex: "class",
//       key: "class",
//     },
//     {
//       title: "Full Name",
//       dataIndex: "fullname",
//       key: "fullname",
//     },
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
//         { text: "Pending", value: "pending" },
//         { text: "Resolved", value: "resolved" },
//         { text: "In Progress", value: "in-progress" },
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
//     <div
//       style={{
//         padding: "2rem",
//         backgroundColor: "#EAF2F8",
//         minHeight: "100vh",
//       }}
//     >
//       <Title level={2} style={{ color: "#2C3E50", textAlign: "center" }}>
//         Submit Complaint for {className} - {fullName}
//       </Title>

//       <Button
//         type="primary"
//         onClick={() => setModalVisible(true)}
//         style={{
//           backgroundColor: "#2C3E50",
//           borderColor: "#3498DB",
//           margin: "1rem auto", // Centers the button
//           width: screens.xs ? "90%" : "auto", // Adjusts width dynamically
//           maxWidth: screens.xs ? "200px" : "auto", // Limits width on mobile
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         Add Complaint
//       </Button>


//       {/* Modal for Adding Complaint */}
//       <Modal
//         title="Submit a Complaint"
//         open={modalVisible}
//         onCancel={() => setModalVisible(false)}
//         footer={null}
//         width={screens.xs ? "90%" : "600px"} // Adjust modal width for smaller screens
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

//           <Form.Item label="Status" name="status" initialValue="pending">
//             <Select>
//               <Option value="pending">Pending</Option>
//               <Option value="resolved">Resolved</Option>
//               <Option value="in-progress">In Progress</Option>
//             </Select>
//           </Form.Item>

//           <Space>
//             <Button
//               type="primary"
//               htmlType="submit"
//               icon={<SendOutlined />}
//               style={{
//                 backgroundColor: "#2C3E50",
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

//       {/* Responsive Table */}
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
//             scroll={{ x: screens.xs ? 600 : "auto" }} // Makes table scrollable on small screens
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
  Grid,
} from "antd";
import { DeleteOutlined, SendOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/reset.css";

const { Title } = Typography;
const { Option } = Select;
const { useBreakpoint } = Grid; // Use Ant Design Grid breakpoints

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
        teacherId: "T001",
      };
      await axios.post(
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
          onClick={() => handleDelete(record._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#EAF2F8",
        minHeight: "100vh",
      }}
    >
      <Title level={2} style={{ color: "#2C3E50", textAlign: "center" }}>
        Submit Complaint for {className} - {fullName}
      </Title>

      <Button
        type="primary"
        onClick={() => setModalVisible(true)}
        style={{
          backgroundColor: "#2C3E50",
          borderColor: "#3498DB",
          margin: "1rem auto",
          width: screens.xs ? "90%" : "auto",
          maxWidth: screens.xs ? "200px" : "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Add Complaint
      </Button>

      {/* Modal for Adding Complaint */}
      <Modal
        title="Submit a Complaint"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={screens.xs ? "90%" : "600px"}
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
                backgroundColor: "#2C3E50",
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

      {/* Responsive Table */}
      <div style={{ marginTop: "2rem" }}>
        {loading ? (
          <Spin size="large" style={{ display: "block", margin: "auto" }} />
        ) : complaints.length === 0 ? (
          <Alert message="No complaints found." type="info" showIcon />
        ) : (
          <Table
            columns={columns}
            dataSource={complaints}
            rowKey="_id"
            bordered
            pagination={{ pageSize: 5 }}
            scroll={{ x: screens.xs ? 600 : "auto" }}
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              marginTop: "1rem",
            }}
            components={{
              header: {
                cell: (props) => (
                  <th
                    {...props}
                    style={{
                      backgroundColor: "#2C3E50",
                      color: "white",
                      padding: "12px",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                  />
                ),
              },
            }}
          />
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SubmitComplaint;
