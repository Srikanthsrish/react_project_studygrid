
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {Form,Input,Select,Table,Button,Spin,Alert,Space,Modal,Grid,} from "antd";
// import { DeleteOutlined, PlusOutlined, SendOutlined } from "@ant-design/icons";
// import { toast,ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "antd/dist/reset.css";
// const { Option } = Select;
// const { useBreakpoint } = Grid; // Use Ant Design Grid breakpoints
// const SubmitComplaint = () => {
//   const { class: className, fullName } = useParams();
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [form] = Form.useForm();
//   const [modalVisible, setModalVisible] = useState(false);
//   const screens = useBreakpoint();
//   // Fetch complaints
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
//         teacherId: "T001",
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
//     style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}
//     >
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
//   <h1 style={{ color: '#2C3E50', margin: 0 }}>Complaint Management</h1>
//   <Button
//     type="primary"
//     icon={<PlusOutlined />}
//     onClick={() => setModalVisible(true)}
//     style={{
//       backgroundColor: "#2C3E50",
//       borderColor: "#3498DB",
//       marginLeft: "auto", // Moves button to the right
//       width: screens.xs ? "90%" : "auto",
//       maxWidth: screens.xs ? "200px" : "auto",
//       display: "flex",
//       justifyContent: "center",
//     }}
//   >
//     Add Complaint
//   </Button>
// </div>

//       {/* Modal for Adding Complaint */}
//       <Modal
//         title="Submit a Complaint"
//         open={modalVisible}
//         onCancel={() => setModalVisible(false)}
//         footer={null}
//         width={screens.xs ? "90%" : "600px"}
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
//             scroll={{ x: screens.xs ? 600 : "auto" }}
//             style={{
//               backgroundColor: "#FFFFFF",
//               boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//               borderRadius: "8px",
//               marginTop: "1rem",
//             }}
//             components={{
//               header: {
//                 cell: (props) => (
//                   <th
//                     {...props}
//                     style={{
//                       backgroundColor: "#2C3E50",
//                       color: "white",
//                       padding: "12px",
//                       fontSize: "16px",
                      
//                     }}
//                   />
//                 ),
//               },
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
import { Form, Input, Select, Table, Button, Spin, Alert, Space, Modal, Grid } from "antd";
import { DeleteOutlined, PlusOutlined, SendOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/reset.css";

const { Option } = Select;
const { useBreakpoint } = Grid;
const { confirm } = Modal;

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
      onHeaderCell: () => ({
        style: { backgroundColor: "#2C3E50", color: "white" },
      }),
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
      onHeaderCell: () => ({
        style: { backgroundColor: "#2C3E50", color: "white" },
      }),
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
      onHeaderCell: () => ({
        style: { backgroundColor: "#2C3E50", color: "white" },
      }),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
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
      onHeaderCell: () => ({
        style: { backgroundColor: "#2C3E50", color: "white" },
      }),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => new Date(date).toLocaleString(),
      onHeaderCell: () => ({
        style: { backgroundColor: "#2C3E50", color: "white" },
      }),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => showDeleteConfirm(record._id)}>
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <h1 style={{ color: "#2C3E50", margin: 0 }}>Complaint Management</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalVisible(true)}
          style={{
            backgroundColor: "#2C3E50",
            borderColor: "#3498DB",
            marginLeft: "auto",
            width: screens.xs ? "90%" : "auto",
            maxWidth: screens.xs ? "200px" : "auto",
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
        {loading ? <Spin size="large" style={{ display: "block", margin: "auto" }} /> : <Table columns={columns} dataSource={complaints} rowKey="_id" bordered pagination={{ pageSize: 5 }} />}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SubmitComplaint;

