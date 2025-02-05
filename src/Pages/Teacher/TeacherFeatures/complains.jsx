// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { Table, Form, Input, Button, Select, Modal, notification, Spin } from 'antd';
// import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

// const { TextArea } = Input;
// const { Option } = Select;

// const Complaints = () => {
//   const { teacherId } = useParams();
//   const [complaints, setComplaints] = useState([]);
//   const [description, setDescription] = useState('');
//   const [status, setStatus] = useState('pending');
//   const [loading, setLoading] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);

//   useEffect(() => {
//     fetchComplaints();
//   }, [teacherId]);

//   // ✅ Function to Fetch Complaints
//   const fetchComplaints = async () => {
//     setLoading(true);
//     try {
//       console.log(`Fetching complaints for teacher ID: ${teacherId}`);
//       const response = await axios.get(`http://localhost:5000/complaints/${teacherId}`);
//       console.log('Complaints fetched:', response.data);
//       setComplaints(response.data);
//     } catch (error) {
//       console.error('Error fetching complaints:', error);
//       notification.error({ message: 'Error fetching complaints' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Function to Add a Complaint
//   const handleSubmit = async () => {
//     if (!description.trim()) {
//       notification.error({ message: 'Please provide a description.' });
//       return;
//     }

//     setLoading(true);
//     try {
//       await axios.post(`http://localhost:5000/complaints/${teacherId}`, {
//         description,
//         status,
//       });

//       notification.success({ message: 'Complaint submitted successfully!' });
//       setModalVisible(false);
//       setDescription('');
//       setStatus('pending');
//       fetchComplaints(); // Refresh complaints
//     } catch (error) {
//       console.error('Error submitting complaint:', error);
//       notification.error({ message: 'Error submitting complaint' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Function to Delete a Complaint
//   const handleDelete = async (id) => {
//     setLoading(true);
//     try {
//       await axios.delete(`http://localhost:5000/complaints/${id}`);
//       notification.success({ message: 'Complaint deleted successfully' });
//       setComplaints(complaints.filter((complaint) => complaint._id !== id));
//     } catch (error) {
//       console.error('Error deleting complaint:', error);
//       notification.error({ message: 'Error deleting complaint' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Table Columns
//   const columns = [
//     {
//       title: 'Description',
//       dataIndex: 'description',
//       key: 'description',
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => (
//         <span style={{ color: status === 'resolved' ? 'green' : 'orange' }}>{status}</span>
//       ),
//     },
//     {
//       title: 'Created At',
//       dataIndex: 'created_at',
//       key: 'created_at',
//       render: (text) => <span>{new Date(text).toLocaleString()}</span>,
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (text, record) => (
//         <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)}>
//           Delete
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <div style={{ backgroundColor: '#EAF2F8', padding: '20px' }}>
//       <h1 style={{ color: '#2C3E50' }}>Complaints for Teacher {teacherId}</h1>

//       {/* Add Complaint Button */}
//       <Button
//         type="primary"
//         icon={<PlusOutlined />}
//         onClick={() => setModalVisible(true)}
//         style={{ marginBottom: '20px' }}
//       >
//         Add Complaint
//       </Button>

//       {/* Modal to Add Complaint */}
//       <Modal title="Add Complaint" visible={modalVisible} onCancel={() => setModalVisible(false)} footer={null}>
//         <Form layout="vertical" onFinish={handleSubmit}>
//           <Form.Item label="Description" required>
//             <TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
//           </Form.Item>
//           <Button type="primary" htmlType="submit" loading={loading}>Submit Complaint</Button>
//         </Form>
//       </Modal>

//       {/* Complaints Table */}
//       {loading ? <Spin size="large" /> : <Table columns={columns} dataSource={complaints} rowKey="_id" />}
//     </div>
//   );
// };

// export default Complaints;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, Form, Input, Button, Select, Modal, notification, Spin } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const Complaints = () => {
  const { teacherId } = useParams();
  const [complaints, setComplaints] = useState([]);
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [className, setClassName] = useState(''); // Optional
  const [fullname, setFullname] = useState('');   // Optional
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://studygrid-backendmongo.onrender.com/complaints/${teacherId}`);
        setComplaints(response.data);
        setError(null);
      } catch (err) {
        setError('Error fetching complaints');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [teacherId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description) {
      notification.error({ message: 'Please provide a description.' });
      return;
    }

    setLoading(true);
    try {
      await axios.post(`https://studygrid-backendmongo.onrender.com/complaints/${teacherId}`, {
        description,
        status,
        class: className, // Optional field
        fullname,          // Optional field
      });

      notification.success({ message: 'Complaint submitted successfully!' });
      setDescription('');
      setClassName('');
      setFullname('');
      setStatus('pending');
      setModalVisible(false);
      
      const updatedComplaints = await axios.get(`https://studygrid-backendmongo.onrender.com/complaints/${teacherId}`);
      setComplaints(updatedComplaints.data);
    } catch (err) {
      setError('Error submitting complaint');
      notification.error({ message: 'Error submitting complaint' });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://studygrid-backendmongo.onrender.com/complaints/${id}`);
      setComplaints(complaints.filter((complaint) => complaint._id !== id));
      notification.success({ message: 'Complaint deleted successfully' });
    } catch (err) {
      setError('Error deleting complaint');
      notification.error({ message: 'Error deleting complaint' });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span style={{ color: status === 'resolved' ? 'green' : 'orange' }}>{status}</span>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => <span>{new Date(text).toLocaleString()}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ backgroundColor: '#EAF2F8', padding: '20px' }}>
      <h1 style={{ color: '#2C3E50' }}>Complaints for Teacher {teacherId}</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Button to toggle modal visibility */}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setModalVisible(true)}
        style={{ marginBottom: '20px' }}
      >
        Add Complaint
      </Button>

      {/* Modal for adding complaint */}
      <Modal
        title="Add Complaint"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form onSubmitCapture={handleSubmit} layout="vertical" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
          <Form.Item label="Description" required>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue"
              style={{ borderRadius: '5px' }}
            />
          </Form.Item>

          <Form.Item label="Class (Optional)">
            <Input
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Class"
              style={{ borderRadius: '5px' }}
            />
          </Form.Item>

          <Form.Item label="Full Name (Optional)">
            <Input
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Full Name"
              style={{ borderRadius: '5px' }}
            />
          </Form.Item>

          <Form.Item label="Status">
            <Select
              value={status}
              onChange={(value) => setStatus(value)}
              style={{ width: '100%', borderRadius: '5px' }}
            >
              <Option value="pending">Pending</Option>
              <Option value="resolved">Resolved</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: '100%', borderRadius: '5px' }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={complaints}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
      </Spin>
    </div>
  );
};

export default Complaints;
