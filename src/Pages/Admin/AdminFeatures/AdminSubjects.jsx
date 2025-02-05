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
//       const response = await axios.get(`http://localhost:3006/api/subjects/${selectedClass}`);
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
//       await axios.post('http://localhost:3006/api/subjects', values);
//       toast.success('Subject added successfully');
//       form.resetFields();
//       setShowModal(false);
//       fetchSubjects();
//     } catch (error) {
//       toast.error('Error adding subject');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (subjectCode) => {
//     if (!window.confirm('Are you sure you want to delete this subject?')) return;
//     setLoading(true);
//     try {
//       await axios.delete(`http://localhost:3006/api/subjects/${subjectCode}`);
//       toast.success('Subject deleted successfully');
//       fetchSubjects();
//     } catch (error) {
//       toast.error('Error deleting subject');
//     } finally {
//       setLoading(false);
//     }
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
//         style={{ backgroundColor: '#3498DB', marginBottom: '20px' }}
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
//         <Form form={form} onFinish={handleSubmit} style={{ maxWidth: '500px' }}>
//           <Form.Item label="Subject Code" name="subject_code" rules={[{ required: true, message: 'Please input the subject code!' }]}>
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
//             <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: '#3498DB' }}>
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
//         <Button type="primary" onClick={fetchSubjects} style={{ backgroundColor: '#3498DB' }}>
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
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input, Select, Table, Form, message, Modal, Spin } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { PlusOutlined } from '@ant-design/icons';
import 'react-toastify/dist/ReactToastify.css';

const { Option } = Select;

const AdminSubjects = () => {
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false); // Manage modal visibility
  const [selectedClass, setSelectedClass] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      // POST request to add a new subject
      const response = await axios.post('https://studygrid-backendmongo.onrender.com/api/subjects', values);
      toast.success('Subject added successfully');
      form.resetFields();
      setShowModal(false);
      fetchSubjects();  // Fetch the updated list of subjects
    } catch (error) {
      toast.error('Error adding subject');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (subjectCode) => {
    if (!window.confirm('Are you sure you want to delete this subject?')) return;
    setLoading(true);
    try {
      await axios.delete(`https://studygrid-backendmongo.onrender.com/api/subjects/${subjectCode}`);
      toast.success('Subject deleted successfully');
      fetchSubjects();  // Fetch the updated list of subjects after deletion
    } catch (error) {
      toast.error('Error deleting subject');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: 'Subject Code', dataIndex: 'subject_code', key: 'subject_code' },
    { title: 'Subject Name', dataIndex: 'subject_name', key: 'subject_name' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => handleDelete(record.subject_code)} style={{ color: 'red' }}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ backgroundColor: '#EAF2F8', padding: '20px' }}>
      <h1 style={{ color: '#2C3E50' }}>Subject Management</h1>

      {/* Add New Subject Button */}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setShowModal(true)} // Show modal when clicked
        style={{ backgroundColor: '#3498DB', marginBottom: '20px' }}
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
        width={600} // Adjust modal width
      >
        <Form form={form} onFinish={handleSubmit} style={{ maxWidth: '500px' }}>
          <Form.Item label="Subject Code" name="subject_code" rules={[{ required: true, message: 'Please input the subject code!' }]}>
            <Input placeholder="Enter Subject Code" />
          </Form.Item>
          <Form.Item label="Subject Name" name="subject_name" rules={[{ required: true, message: 'Please input the subject name!' }]}>
            <Input placeholder="Enter Subject Name" />
          </Form.Item>
          <Form.Item label="Class" name="class_name" rules={[{ required: true, message: 'Please select a class!' }]}>
            <Select placeholder="Select Class">
              {['1st', '2nd', '3rd', '4th', '5th', 'UKG', 'LKG'].map((grade) => (
                <Option key={grade} value={grade}>{grade}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: '#3498DB' }}>
              Add Subject
            </Button>
            <Button type="default" onClick={() => setShowModal(false)} style={{ marginLeft: '10px', color: 'red' }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <div style={{ marginTop: '20px' }}>
        <h2 style={{ color: '#2C3E50' }}>View and Manage Subjects by Class</h2>
        <Select
          onChange={setSelectedClass}
          value={selectedClass}
          style={{ width: 200, marginBottom: '20px' }}
          placeholder="Select Class"
        >
          {['1st', '2nd', '3rd', '4th', '5th', 'UKG', 'LKG'].map((grade) => (
            <Option key={grade} value={grade}>{grade}</Option>
          ))}
        </Select>
        <Button type="primary" onClick={fetchSubjects} style={{ backgroundColor: '#3498DB' }}>
          Fetch Subjects
        </Button>
        <Spin spinning={loading} tip="Loading...">
          <Table
            columns={columns}
            dataSource={subjects}
            rowKey="subject_code"
            pagination={false}
            style={{ marginTop: '20px' }}
            bordered
          />
        </Spin>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AdminSubjects;
