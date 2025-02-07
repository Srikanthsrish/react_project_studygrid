
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Button, Input, Select, Table, Form, message, Modal, Spin } from 'antd';
// import { ToastContainer, toast } from 'react-toastify';
// import { PlusOutlined } from '@ant-design/icons';
// import 'react-toastify/dist/ReactToastify.css';

// const { Option } = Select;

// const AdminSubjects = () => {
//   const [form] = Form.useForm();
//   const [showModal, setShowModal] = useState(false); // Manage modal visibility
//   const [selectedClass, setSelectedClass] = useState('');
//   const [subjects, setSubjects] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchSubjects = async () => {
//     if (!selectedClass) {
//       toast.error('Please select a class!');
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await axios.get(`https://studygrid-backendmongo.onrender.com/api/subjects/${selectedClass}`);
//       setSubjects(response.data);
//     } catch (error) {
//       toast.error('Error fetching subjects');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (values) => {
//     setLoading(true);
//     try {
//       // POST request to add a new subject
//       const response = await axios.post('https://studygrid-backendmongo.onrender.com/api/subjects', values);
//       toast.success('Subject added successfully');
//       form.resetFields();
//       setShowModal(false);
//       fetchSubjects();  // Fetch the updated list of subjects
//     } catch (error) {
//       toast.error('Error adding subject');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (subjectCode) => {
//     Modal.confirm({
//       title: 'Are you sure you want to delete this subject?',
//       content: 'This action cannot be undone.',
//       okText: 'Yes, Delete',
//       okType: 'danger',
//       cancelText: 'Cancel',
//       onOk: async () => {
//         setLoading(true);
//         try {
//           await axios.delete(`https://studygrid-backendmongo.onrender.com/api/subjects/${subjectCode}`);
//           toast.success('Subject deleted successfully');
//           fetchSubjects(); // Refresh the subject list
//         } catch (error) {
//           toast.error('Error deleting subject');
//         } finally {
//           setLoading(false);
//         }
//       },
//     });
//   };

//   const columns = [
//     { title: 'Subject Code', dataIndex: 'subject_code', key: 'subject_code' },
//     { title: 'Subject Name', dataIndex: 'subject_name', key: 'subject_name' },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_, record) => (
//         <Button type="link" onClick={() => handleDelete(record.subject_code)} style={{ color: 'red' }}>
//           Delete
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <div style={{ backgroundColor: '#EAF2F8', padding: '20px' }}>
//       <h1 style={{ color: '#2C3E50' }}>Subject Management</h1>

//       {/* Add New Subject Button */}
//       <Button
//         type="primary"
//         icon={<PlusOutlined />}
//         onClick={() => setShowModal(true)} // Show modal when clicked
//         style={{ backgroundColor: '#2C3E50', marginBottom: '20px' }}
//       >
//         Add Subject
//       </Button>

//       {/* Modal for Adding Subject */}
//       <Modal
//         title="Add New Subject"
//         open={showModal}
//         onCancel={() => setShowModal(false)} // Close modal when canceled
//         footer={null}
//         centered
//         width={600} // Adjust modal width
//       >
//         <Form form={form} onFinish={handleSubmit}  layout="vertical">
//           <Form.Item 
//           label="Subject Code" 
//           name="subject_code" 
//           rules={[{ required: true, message: 'Please input the subject code!' }]}>
//             <Input placeholder="Enter Subject Code" />
//           </Form.Item>
//           <Form.Item label="Subject Name" name="subject_name" rules={[{ required: true, message: 'Please input the subject name!' }]}>
//             <Input placeholder="Enter Subject Name" />
//           </Form.Item>
//           <Form.Item label="Class" name="class_name" rules={[{ required: true, message: 'Please select a class!' }]}>
//             <Select placeholder="Select Class">
//               {['1st', '2nd', '3rd', '4th', '5th', 'UKG', 'LKG'].map((grade) => (
//                 <Option key={grade} value={grade}>{grade}</Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: '#2C3E50' }}>
//               Add Subject
//             </Button>
//             <Button type="default" onClick={() => setShowModal(false)} style={{ marginLeft: '10px', color: 'red' }}>
//               Cancel
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>

//       <div style={{ marginTop: '20px' }}>
//         <h2 style={{ color: '#2C3E50' }}>View and Manage Subjects by Class</h2>
//         <Select
//           onChange={setSelectedClass}
//           value={selectedClass}
//           style={{ width: 200, marginBottom: '20px' }}
//           placeholder="Select Class"
//         >
//           {['1st', '2nd', '3rd', '4th', '5th', 'UKG', 'LKG'].map((grade) => (
//             <Option key={grade} value={grade}>{grade}</Option>
//           ))}
//         </Select>
//         <Button type="primary" onClick={fetchSubjects} style={{ backgroundColor: '#2C3E50' }}>
//           Fetch Subjects
//         </Button>
//         <Spin spinning={loading} tip="Loading...">
//           <Table
//             columns={columns}
//             dataSource={subjects}
//             rowKey="subject_code"
//             pagination={false}
//             style={{ marginTop: '20px' }}
//             bordered
//           />
//         </Spin>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default AdminSubjects;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, Select, Table, Form, message, Modal, Spin, Grid } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { PlusOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import 'react-toastify/dist/ReactToastify.css';

const { Option } = Select;
const { useBreakpoint } = Grid;

const AdminSubjects = () => {
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const screens = useBreakpoint();

  const fetchSubjects = async () => {
    if (!selectedClass) {
      toast.error('Please select a class!');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`https://studygrid-backendmongo.onrender.com/api/subjects/${selectedClass}`);
      setSubjects(response.data);
    } catch (error) {
      toast.error('Error fetching subjects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setLoadingAction(true);
    try {
      const response = await axios.post('https://studygrid-backendmongo.onrender.com/api/subjects', values);
      toast.success('Subject added successfully');
      form.resetFields();
      setShowModal(false);
      fetchSubjects(); // Fetch the updated list of subjects
    } catch (error) {
      toast.error('Error adding subject');
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDelete = async (subjectCode) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this subject?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        setLoadingAction(true);
        try {
          await axios.delete(`https://studygrid-backendmongo.onrender.com/api/subjects/${subjectCode}`);
          toast.success('Subject deleted successfully');
          fetchSubjects(); // Refresh the subject list
        } catch (error) {
          toast.error('Error deleting subject');
        } finally {
          setLoadingAction(false);
        }
      },
    });
  };

  const columns = [
    { title: 'Subject Code', dataIndex: 'subject_code', key: 'subject_code' },
    { title: 'Subject Name', dataIndex: 'subject_name', key: 'subject_name' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => handleDelete(record.subject_code)}
          icon={loadingAction ? <LoadingOutlined /> : <DeleteOutlined />}
          style={{ color: 'red' }}
          disabled={loadingAction}
        >
          {loadingAction ? 'Deleting...' : 'Delete'}
        </Button>
      ),
    },
  ];

  return (
    <div style={{ backgroundColor: '#EAF2F8', padding: '20px' }}>
      <h1 style={{ color: '#2C3E50', textAlign: 'center' }}>Subject Management</h1>

      {/* Add New Subject Button */}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setShowModal(true)} // Show modal when clicked
        style={{
          backgroundColor: '#2C3E50',
          marginBottom: '20px',
          width: screens.xs ? '100%' : 'auto', // Full width on smaller screens
        }}
        disabled={loadingAction}
      >
        Add Subject
      </Button>

      {/* Modal for Adding Subject */}
      <Modal
        title="Add New Subject"
        open={showModal}
        onCancel={() => setShowModal(false)} // Close modal when canceled
        footer={null}
        centered
        width={screens.xs ? '90%' : 600} // Adjust modal width for small screens
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Subject Code"
            name="subject_code"
            rules={[{ required: true, message: 'Please input the subject code!' }]}
          >
            <Input placeholder="Enter Subject Code" />
          </Form.Item>
          <Form.Item
            label="Subject Name"
            name="subject_name"
            rules={[{ required: true, message: 'Please input the subject name!' }]}
          >
            <Input placeholder="Enter Subject Name" />
          </Form.Item>
          <Form.Item
            label="Class"
            name="class_name"
            rules={[{ required: true, message: 'Please select a class!' }]}
          >
            <Select placeholder="Select Class">
              {['1st', '2nd', '3rd', '4th', '5th', 'UKG', 'LKG'].map((grade) => (
                <Option key={grade} value={grade}>
                  {grade}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loadingAction}
              style={{ backgroundColor: '#2C3E50' }}
            >
              {loadingAction ? <Spin indicator={<LoadingOutlined />} /> : 'Add Subject'}
            </Button>
            <Button
              type="default"
              onClick={() => setShowModal(false)}
              style={{ marginLeft: '10px', color: 'red' }}
              disabled={loadingAction}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Class Selection and Fetching Subjects */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Select
          onChange={setSelectedClass}
          value={selectedClass}
          style={{
            width: 200,
            marginBottom: '20px',
          }}
          placeholder="Select Class"
        >
          {['1st', '2nd', '3rd', '4th', '5th', 'UKG', 'LKG'].map((grade) => (
            <Option key={grade} value={grade}>
              {grade}
            </Option>
          ))}
        </Select>
        <Button
          type="primary"
          onClick={fetchSubjects}
          style={{
            backgroundColor: '#2C3E50',
            width: screens.xs ? '100%' : 'auto', // Full width on smaller screens
          }}
          disabled={loadingAction}
        >
          Fetch Subjects
        </Button>
      </div>

      {/* Subjects Table */}
      <Spin spinning={loading} tip="Loading...">
        <Table
          columns={columns}
          dataSource={subjects}
          rowKey="subject_code"
          pagination={false}
          style={{
            marginTop: '20px',
            backgroundColor: '#FFFFFF',
          }}
          scroll={{ x: screens.xs ? 600 : 'auto' }} // Make the table scrollable on small screens
        />
      </Spin>

      <ToastContainer />
    </div>
  );
};

export default AdminSubjects;

