
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Tag, message, Spin } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://studygrid-backendmongo.onrender.com/complains');
      setComplaints(response.data);
    } catch (error) {
      message.error('Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (_id, newStatus) => {
    try {
      await axios.put(`https://studygrid-backendmongo.onrender.com/complains/${_id}/status`, { status: newStatus });
      toast.success(`Complaint status updated to ${newStatus}`);
      fetchComplaints();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const columns = [
    {
      title: 'Complaint ID',
      dataIndex: '_id', // Use _id field as identifier
      key: '_id',
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
              onClick={() => handleStatusChange(record._id, 'resolved')} // Use _id for status change
              style={{ marginRight: '10px', backgroundColor: '#27AE60', border: 'none' }}
            >
              Resolve
            </Button>
            <Button
              type="primary"
              danger
              icon={<CloseCircleOutlined />}
              onClick={() => handleStatusChange(record._id, 'rejected')} // Use _id for status change
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

      {loading ? (
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#2C3E50' }} spin />} />
        </div>
      ) : (
        <Table
          dataSource={complaints}
          columns={columns}
          rowKey="_id" // Use _id as the unique key for rows
          bordered
          pagination={{ pageSize: 5 }}
          style={{ backgroundColor: '#EAF2F8' }}
        />
      )}
    </div>
  );
};

export default AdminComplaints;
