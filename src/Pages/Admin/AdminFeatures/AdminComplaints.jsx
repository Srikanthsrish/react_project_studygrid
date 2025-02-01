
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Tag, message, Spin, Modal, Form, Input } from 'antd';
import { PlusOutlined, CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [form] = Form.useForm(); // Form instance for handling form data

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/complains');
      setComplaints(response.data);
    } catch (error) {
      message.error('Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/complains/${id}/status`, { status: newStatus });
      toast.success(`Complaint status updated to ${newStatus}`);
      fetchComplaints();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleAddComplaint = async (values) => {
    try {
      await axios.post('http://localhost:5000/complains', values);
      toast.success('Complaint added successfully');
      fetchComplaints();
      setIsModalVisible(false); // Close the modal after submitting the form
    } catch (error) {
      toast.error('Failed to add complaint');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Teacher ID',
      dataIndex: 'teacherId',
      key: 'teacherId',
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'class',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullname',
      key: 'fullname',
      render: (text) => text || 'N/A',
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
        <Tag color={status === 'pending' ? 'orange' : status === 'resolved' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record) => (
        record.status === 'pending' && (
          <>
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={() => handleStatusChange(record.id, 'resolved')}
              style={{ marginRight: '10px', backgroundColor: '#27AE60', border: 'none' }}
            >
              Resolve
            </Button>
            <Button
              type="primary"
              danger
              icon={<CloseCircleOutlined />}
              onClick={() => handleStatusChange(record.id, 'rejected')}
            >
              Reject
            </Button>
          </>
        )
      ),
    },
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#2C3E50' }}>Complaint Management</h1>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Add New Complaint Button */}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
        style={{ backgroundColor: '#2C3E50', marginBottom: '20px' }}
      >
        Add Complaint
      </Button>

      {loading ? (
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#2C3E50' }} spin />} />
        </div>
      ) : (
        <Table
          dataSource={complaints}
          columns={columns}
          rowKey="id"
          bordered
          pagination={{ pageSize: 5 }}
          style={{ backgroundColor: '#EAF2F8' }}
        />
      )}

      {/* Add Complaint Modal */}
      <Modal
        title="Add New Complaint"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        width={600} // Adjust width of modal
      >
        <Form form={form} layout="vertical" onFinish={handleAddComplaint}>
          <Form.Item
            label="Teacher ID"
            name="teacherId"
            rules={[{ required: true, message: 'Please enter teacher ID' }]}
          >
            <Input placeholder="Enter teacher ID" />
          </Form.Item>

          <Form.Item
            label="Class"
            name="class"
            rules={[{ required: true, message: 'Please enter class' }]}
          >
            <Input placeholder="Enter class" />
          </Form.Item>

          <Form.Item
            label="Full Name"
            name="fullname"
            rules={[{ required: true, message: 'Please enter full name' }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <Input.TextArea rows={4} placeholder="Enter complaint description" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#2C3E50' }}>
              Add Complaint
            </Button>
            <Button
              onClick={() => setIsModalVisible(false)}
              style={{ marginLeft: '10px', backgroundColor: 'red', color: '#FFFFFF' }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminComplaints;

