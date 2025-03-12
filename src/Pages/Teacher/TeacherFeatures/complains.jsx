import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table, Form, Input, Button, Select, Modal, notification, Spin } from 'antd';
import { DeleteOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;
const { confirm } = Modal;

const Complaints = () => {
  const { teacherId } = useParams();
  const [complaints, setComplaints] = useState([]);
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [className, setClassName] = useState('');
  const [fullname, setFullname] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch complaints from backend
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

  // Submit a new complaint
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
        class: className,
        fullname,
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

  // Confirm before deleting a complaint
  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Are you sure you want to delete this complaint?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
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
      },
    });
  };

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      
      onHeaderCell: () => ({
        style: { backgroundColor: '#2C3E50', color: 'white',  },
      }),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      
      onHeaderCell: () => ({
        style: { backgroundColor: '#2C3E50', color: 'white' },
      }),
      render: (status) => (
        <span style={{ color: status === 'resolved' ? 'green' : 'orange' }}>{status}</span>
      ),
    },
    {
      title: 'Date of complaint',
      dataIndex: 'created_at',
      key: 'created_at',
      
      onHeaderCell: () => ({
        style: { backgroundColor: '#2C3E50', color: 'white',  },
      }),
      render: (text) => <span>{new Date(text).toLocaleString()}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      
      onHeaderCell: () => ({
        style: { backgroundColor: '#2C3E50', color: 'white', },
      }),
      render: (text, record) => (
        <Button danger icon={<DeleteOutlined />} onClick={() => showDeleteConfirm(record._id)}>
          Delete
        </Button>
      ),
    },
  ];


  return (
    <div style={{  padding: '20px', borderRadius: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',marginBottom:"20px" }}>
        <h2 style={{ color: '#2C3E50'}}>Complaints for Teacher {teacherId}</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalVisible(true)}
          style={{ backgroundColor: '#2C3E50' }}
        >
          Add Complaint
        </Button>

      </div>




      {/* Modal for adding complaint */}
      <Modal
        title="Add Complaint"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form onSubmitCapture={handleSubmit} layout="vertical" style={{ padding: '20px', borderRadius: '8px' }}>
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

          <Form.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={() => setModalVisible(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: '#2C3E50' }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={complaints}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
          bordered
          rowClassName={(record, index) => (index % 2 === 0 ? 'even-row' : 'odd-row')}
        />
      )}
    </div>
  );
};

export default Complaints;
