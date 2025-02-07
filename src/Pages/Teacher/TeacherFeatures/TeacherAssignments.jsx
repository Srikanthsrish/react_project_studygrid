// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Form, Input, Button, Modal, Table, Spin } from 'antd';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const TeacherAssignments = () => {
//   const { teacherId } = useParams();

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
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   // Submit a new assignment to the backend
//   const handleSubmit = async (values) => {
//     try {
//       // Destructuring className from values to ensure it's passed correctly as `class`
//       const { className, subject, assignment } = values;
//       const response = await axios.post(
//         `https://studygrid-backendmongo.onrender.com/teachers/assignments/${teacherId}`,
//         { class: className, subject, assignment } // Posting 'class' instead of 'className'
//       );
//       toast.success(response.data.message);
//       fetchAssignments();
//       form.resetFields();
//       setFormVisible(false);
//     } catch (error) {
//       toast.error('Error adding assignment');
//     }
//   };

//   // Delete an assignment
//   const handleDelete = async (assignmentId) => {
//     try {
//       const response = await axios.delete(
//         `https://studygrid-backendmongo.onrender.com/teachers/assignments/${teacherId}/${assignmentId}`
//       );
//       toast.success(response.data.message);
//       fetchAssignments();
//     } catch (error) {
//       toast.error('Error deleting assignment');
//     }
//   };

//   // Effect to fetch assignments when the component mounts
//   useEffect(() => {
//     fetchAssignments();
//   }, [teacherId]);

//   if (loading) {
//     return <Spin tip="Loading..." size="large" />;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const columns = [
//     { title: 'Class', dataIndex: 'class', key: 'class' },
//     { title: 'Subject', dataIndex: 'subject', key: 'subject' },
//     { title: 'Assignment', dataIndex: 'assignment', key: 'assignment' },
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
//       <div style={{ backgroundColor: '#EAF2F8', padding: '20px', borderRadius: '10px' }}>
//         <h2 style={{ color: '#2C3E50' }}>Assignments for Teacher: {teacherId}</h2>
//         <Button
//           type="primary"
//           style={{ marginBottom: '10px', backgroundColor: '#2C3E50' }}
//           onClick={() => setFormVisible(true)}
//         >
//           Add Assignment
//         </Button>

//         <Modal
//           title="Add Assignment"
//           visible={formVisible}
//           onCancel={() => setFormVisible(false)}
//           footer={null}
//           width={600}
//         >
//           <Form form={form} name="assignment-form" onFinish={handleSubmit}>
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
//               <Button type="primary" htmlType="submit" style={{ backgroundColor: '#2C3E50' }}>
//                 Add Assignment
//               </Button>
//               <Button style={{ marginLeft: '10px' }} onClick={() => setFormVisible(false)}>
//                 Cancel
//               </Button>
//             </Form.Item>
//           </Form>
//         </Modal>
//       </div>

//       <div style={{ marginTop: '20px' }}>
//         <Table columns={columns} dataSource={assignmentData} rowKey="_id" pagination={{ pageSize: 5 }} bordered />
//       </div>

//       <ToastContainer />
//     </>
//   );
// };

// export default TeacherAssignments;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Modal, Table, Spin, Grid } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { useBreakpoint } = Grid;

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

  // Delete an assignment
  const handleDelete = async (assignmentId) => {
    try {
      const response = await axios.delete(
        `https://studygrid-backendmongo.onrender.com/teachers/assignments/${teacherId}/${assignmentId}`
      );
      toast.success(response.data.message);
      fetchAssignments();
    } catch (error) {
      toast.error('Error deleting assignment');
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchAssignments();
  }, [teacherId]);

  if (loading) return <Spin tip="Loading..." size="large" />;
  if (error) return <div>Error: {error}</div>;

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
      <div style={styles.container}>
        <h2 style={styles.header}>Assignments for Teacher: {teacherId}</h2>

        <Button
          type="primary"
          style={{ marginBottom: screens.xs ? '5px' : '10px', backgroundColor: '#2C3E50' }}
          onClick={() => setFormVisible(true)}
        >
          Add Assignment
        </Button>

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
              <Button type="primary" htmlType="submit" style={{ backgroundColor: '#2C3E50' }}>
                Add Assignment
              </Button>
              <Button style={{ marginLeft: '10px' }} onClick={() => setFormVisible(false)}>
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
        />
      </div>

      <ToastContainer />
    </>
  );
};

// ✅ Styles for better responsiveness
const styles = {
  container: {
    backgroundColor: '#EAF2F8',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
  },
  header: {
    color: '#2C3E50',
    fontSize: '20px',
    marginBottom: '15px',
  },
};

export default TeacherAssignments;


