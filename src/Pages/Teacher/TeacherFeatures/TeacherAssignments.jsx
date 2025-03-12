// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Form, Input, Button, Modal, Table, Spin, Grid } from 'antd';
// import { ToastContainer, toast } from 'react-toastify';
// import {PlusOutlined} from  '@ant-design/icons';
// import 'react-toastify/dist/ReactToastify.css';
// const { useBreakpoint } = Grid;
// const TeacherAssignments = () => {
//   const { teacherId } = useParams();
//   const screens = useBreakpoint();

//   const [assignmentData, setAssignmentData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [formVisible, setFormVisible] = useState(false);
//   const [form] = Form.useForm();

//   // Fetch assignments from the backend
//   const fetchAssignments = async () => {
//     try {
//       const response = await axios.get(`https://studygrid-backendmongo.onrender.com/teachers/assignments/${teacherId}`);
//       setAssignmentData(response.data.data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Submit a new assignment
//   const handleSubmit = async (values) => {
//     try {
//       const { className, subject, assignment } = values;
//       const response = await axios.post(
//         `https://studygrid-backendmongo.onrender.com/teachers/assignments/${teacherId}`,
//         { class: className, subject, assignment }
//       );
//       toast.success(response.data.message);
//       fetchAssignments();
//       form.resetFields();
//       setFormVisible(false);
//     } catch (error) {
//       toast.error('Error adding assignment');
//     }
//   };

//   // Delete an assignment with confirmation
//   const handleDelete = (assignmentId) => {
//     Modal.confirm({
//       title: 'Are you sure you want to delete this assignment?',
//       content: 'This action cannot be undone.',
//       okText: 'Yes, Delete',
//       okType: 'danger',
//       cancelText: 'Cancel',
//       onOk: async () => {
//         try {
//           setLoading(true);
//           const response = await axios.delete(
//             `https://studygrid-backendmongo.onrender.com/teachers/assignments/${teacherId}/${assignmentId}`
//           );
//           toast.success(response.data.message);
//           fetchAssignments();
//         } catch (error) {
//           toast.error('Error deleting assignment');
//         } finally {
//           setLoading(false);
//         }
//       },
//     });
//   };

//   // Fetch data when component mounts
//   useEffect(() => {
//     fetchAssignments();
//   }, [teacherId]);

//   if (loading) {
//     return (
//       <div style={styles.loaderContainer}>
//         <Spin tip="Loading..." size="large" />
//       </div>
//     );
//   }
  
//   if (error) return <div style={styles.errorText}>Error: {error}</div>;

//   const columns = [
//     { title: 'Class', dataIndex: 'class', key: 'class' },
//     { title: 'Subject', dataIndex: 'subject', key: 'subject'},
//     { title: 'Assignment', dataIndex: 'assignment', key: 'assignment'},
//     {
//       title: 'Actions',
//       key: 'actions',
      
//       render: (_, record) => (
//         <Button danger onClick={() => handleDelete(record._id)}>
//           Delete
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <>
//       <div style={{marginTop:"20px"}}>
//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <h1 style={{ color: '#2C3E50' }}>Assignments for Teacher: {teacherId}</h1>
//                 <Button
//           type="primary"
//           icon={<PlusOutlined />}
//           style={styles.addButton}
//           onClick={() => setFormVisible(true)}
//         >
//           Add Assignment
//         </Button>
//       </div>
        

        

//         {/* Add Assignment Modal */}
//         <Modal
//           title="Add Assignment"
//           open={formVisible}
//           onCancel={() => setFormVisible(false)}
//           footer={null}
//           width={screens.xs ? 320 : 600} // Responsive Modal Width
//         >
//           <Form form={form} name="assignment-form" onFinish={handleSubmit} layout="vertical">
//             <Form.Item name="className" label="Class" rules={[{ required: true, message: 'Class is required!' }]}>
//               <Input placeholder="Enter class name" />
//             </Form.Item>

//             <Form.Item name="subject" label="Subject" rules={[{ required: true, message: 'Subject is required!' }]}>
//               <Input placeholder="Enter subject" />
//             </Form.Item>

//             <Form.Item name="assignment" label="Assignment" rules={[{ required: true, message: 'Assignment details are required!' }]}>
//               <Input.TextArea placeholder="Enter assignment details" rows={4} />
//             </Form.Item>

//             <Form.Item>
//               <Button type="primary" htmlType="submit" style={styles.addButton}>
//                 Add Assignment
//               </Button>
//               <Button style={styles.cancelButton} onClick={() => setFormVisible(false)}>
//                 Cancel
//               </Button>
//             </Form.Item>
//           </Form>
//         </Modal>
//       </div>

//       {/* Table with Responsive Scroll */}
//       <div style={{ marginTop: screens.xs ? '10px' : '20px' }}>
//         <Table
//           columns={columns}
//           dataSource={assignmentData}
//           rowKey="_id"
//           pagination={{ pageSize: 5 }}
//           bordered
//           scroll={{ x: screens.xs ? 600 : 'auto' }} // Responsive Table Scroll
//           rowClassName={(record, index) => (index % 2 === 0 ? "table-row-light" : "table-row-dark")}
//         />
//       </div>

//       <ToastContainer />

//       <style>
//         {`
//           .table-row-light {
//             background-color: #f9f9f9;
//           }
//           .table-row-dark {
//             background-color: #ffffff;
//           }
//           .ant-table-thead > tr > th {
//             background-color: #2C3E50 !important;
//             color: white !important;
           
//           }
//           .ant-table-row:hover {
//             background-color: #EAF2F8 !important;
//           }
//         `}
//       </style>
//     </>
//   );
// };

// // ✅ Styles for better responsiveness
// const styles = {
  
//   header: {
//     color: '#2C3E50',
//     fontSize: '22px',
//     marginBottom: '15px',
//     textAlign:"center",
//   },
//   addButton: {
//     marginBottom: '10px',
//     backgroundColor: '#2C3E50',
//     borderColor: '#2C3E50',
//   },
//   cancelButton: {
//     marginLeft: '10px',
//   },
//   loaderContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh',
//   },
//   errorText: {
//     color: 'red',
//     textAlign: 'center',
//     fontSize: '18px',
//   },
// };

// export default TeacherAssignments;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Modal, Table, Spin, Grid, Typography } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { PlusOutlined } from '@ant-design/icons';
import 'react-toastify/dist/ReactToastify.css';

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;

const TeacherAssignments = () => {
  const { teacherId } = useParams();
  const screens = useBreakpoint();

  const [assignmentData, setAssignmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [form] = Form.useForm();

  // Fetch assignments from the backend
  const fetchAssignments = async () => {
    if (teacherId === "guest") {
      setLoading(false);
      return;
    }
    
    try {
      const response = await axios.get(`https://studygrid-backendmongo.onrender.com/teachers/assignments/${teacherId}`);
      setAssignmentData(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Submit a new assignment
  const handleSubmit = async (values) => {
    try {
      const { className, subject, assignment } = values;
      const response = await axios.post(
        `https://studygrid-backendmongo.onrender.com/teachers/assignments/${teacherId}`,
        { class: className, subject, assignment }
      );
      toast.success(response.data.message);
      fetchAssignments();
      form.resetFields();
      setFormVisible(false);
    } catch (error) {
      toast.error('Error adding assignment');
    }
  };

  // Delete an assignment with confirmation
  const handleDelete = (assignmentId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this assignment?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          setLoading(true);
          const response = await axios.delete(
            `https://studygrid-backendmongo.onrender.com/teachers/assignments/${teacherId}/${assignmentId}`
          );
          toast.success(response.data.message);
          fetchAssignments();
        } catch (error) {
          toast.error('Error deleting assignment');
        } finally {
          setLoading(false);
        }
      },
    });
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchAssignments();
  }, [teacherId]);

  if (loading) {
    return (
      <div style={styles.loaderContainer}>
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }

  // Display a message for the guest teacher
  if (teacherId === "guest") {
    return (
      <div style={styles.centerMessage}>
        <Title level={3} style={{ color: "#2C3E50" }}>No Assignments Available</Title>
        <Text type="secondary">Assignments are not available for guest teachers.</Text>
      </div>
    );
  }

  if (error) return <div style={styles.errorText}>Error: {error}</div>;

  const columns = [
    { title: 'Class', dataIndex: 'class', key: 'class' },
    { title: 'Subject', dataIndex: 'subject', key: 'subject' },
    { title: 'Assignment', dataIndex: 'assignment', key: 'assignment' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button danger onClick={() => handleDelete(record._id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginTop: "20px" }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1 style={{ color: '#2C3E50' }}>Assignments for Teacher: {teacherId}</h1>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={styles.addButton}
            onClick={() => setFormVisible(true)}
          >
            Add Assignment
          </Button>
        </div>

        {/* Add Assignment Modal */}
        <Modal
          title="Add Assignment"
          open={formVisible}
          onCancel={() => setFormVisible(false)}
          footer={null}
          width={screens.xs ? 320 : 600} // Responsive Modal Width
        >
          <Form form={form} name="assignment-form" onFinish={handleSubmit} layout="vertical">
            <Form.Item name="className" label="Class" rules={[{ required: true, message: 'Class is required!' }]}>
              <Input placeholder="Enter class name" />
            </Form.Item>

            <Form.Item name="subject" label="Subject" rules={[{ required: true, message: 'Subject is required!' }]}>
              <Input placeholder="Enter subject" />
            </Form.Item>

            <Form.Item name="assignment" label="Assignment" rules={[{ required: true, message: 'Assignment details are required!' }]}>
              <Input.TextArea placeholder="Enter assignment details" rows={4} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={styles.addButton}>
                Add Assignment
              </Button>
              <Button style={styles.cancelButton} onClick={() => setFormVisible(false)}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>

      {/* Table with Responsive Scroll */}
      <div style={{ marginTop: screens.xs ? '10px' : '20px' }}>
        <Table
          columns={columns}
          dataSource={assignmentData}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
          bordered
          scroll={{ x: screens.xs ? 600 : 'auto' }} // Responsive Table Scroll
          rowClassName={(record, index) => (index % 2 === 0 ? "table-row-light" : "table-row-dark")}
        />
      </div>

      <ToastContainer />

      <style>
        {`
          .table-row-light {
            background-color: #f9f9f9;
          }
          .table-row-dark {
            background-color: #ffffff;
          }
          .ant-table-thead > tr > th {
            background-color: #2C3E50 !important;
            color: white !important;
          }
          .ant-table-row:hover {
            background-color: #EAF2F8 !important;
          }
        `}
      </style>
    </>
  );
};

// ✅ Styles for better responsiveness
const styles = {
  header: {
    color: '#2C3E50',
    fontSize: '22px',
    marginBottom: '15px',
    textAlign: "center",
  },
  addButton: {
    marginBottom: '10px',
    backgroundColor: '#2C3E50',
    borderColor: '#2C3E50',
  },
  cancelButton: {
    marginLeft: '10px',
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: '18px',
  },
  centerMessage: {
    textAlign: 'center',
    marginTop: '50px',
  },
};

export default TeacherAssignments;
