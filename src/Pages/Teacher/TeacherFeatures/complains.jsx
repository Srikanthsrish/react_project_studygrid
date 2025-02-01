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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [modalVisible, setModalVisible] = useState(false); // Toggle modal visibility

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/complains/${teacherId}`);
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
      const response = await axios.post(`http://localhost:5000/complains/${teacherId}`, {
        description,
        status,
      });

      notification.success({ message: 'Complaint submitted successfully!' });
      setDescription('');
      setStatus('pending');
      setModalVisible(false); // Close the modal after submission

      const updatedComplaints = await axios.get(`http://localhost:5000/complains/${teacherId}`);
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
      await axios.delete(`http://localhost:5000/complains/${id}`);
      setComplaints(complaints.filter((complaint) => complaint.id !== id));
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
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
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
        <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
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
        onClick={() => setModalVisible(true)} // Open modal on click
        style={{ marginBottom: '20px' }}
      >
        Add Complaint
      </Button>

      {/* Modal for adding complaint */}
      <Modal
        title="Add Complaint"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)} // Close modal on cancel
        footer={null} // Custom footer (No default buttons)
        width={600}
      >
        <Form
          onSubmitCapture={handleSubmit}
          layout="vertical"
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
          }}
        >
          <Form.Item label="Description" required>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue"
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
              <Option value="in-progress">In Progress</Option>
            </Select>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: '#3498DB', borderRadius: '5px', marginRight: '10px' }}
            loading={loading}
          >
            Submit Complaint
          </Button>

          <Button
            type="default"
            onClick={() => setModalVisible(false)} // Close modal on cancel
            style={{ backgroundColor: 'red', borderRadius: '5px', color: 'white' }}
          >
            Cancel
          </Button>
        </Form>
      </Modal>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={complaints}
          rowKey="id"
          pagination={false}
          style={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
        />
      )}
    </div>
  );
};

export default Complaints;
