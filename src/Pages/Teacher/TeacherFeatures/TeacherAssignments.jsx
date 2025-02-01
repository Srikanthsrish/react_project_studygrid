import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Modal, Table, Spin } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TeacherAssignments = () => {
  const { teacherId } = useParams();

  const [assignmentData, setAssignmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formVisible, setFormVisible] = useState(false); // State to toggle form visibility

  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const { className, subject, assignment } = values;

    try {
      const response = await axios.post(
        `http://localhost:5000/teacherassignments/${teacherId}`,
        { class: className, subject, assignment }
      );
      toast.success(response.data.message);
      fetchAssignments();
      form.resetFields();
      setFormVisible(false); // Hide form after submission
    } catch (error) {
      toast.error('Error adding assignment');
      console.error('Error:', error);
    }
  };

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/teacherassignments/${teacherId}`);
      setAssignmentData(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (assignmentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/teacherassignments/${teacherId}/${assignmentId}`
      );
      toast.success(response.data.message);
      fetchAssignments();
    } catch (error) {
      toast.error('Error deleting assignment');
      console.error('Error deleting assignment:', error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [teacherId]);

  if (loading) {
    return <Spin tip="Loading..." size="large" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const columns = [
    { title: 'Id', dataIndex: 'id', key: 'id', sorter: (a, b) => a.id - b.id },
    { title: 'Class', dataIndex: 'class', key: 'class' },
    { title: 'Subject', dataIndex: 'subject', key: 'subject' },
    { title: 'Assignment', dataIndex: 'assignment', key: 'assignment' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button danger onClick={() => handleDelete(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      <div style={{ backgroundColor: '#EAF2F8', padding: '20px', borderRadius: '10px' }}>
        <h2 style={{ color: '#2C3E50' }}>Assignments for Teacher: {teacherId}</h2>
        <Button
          type="primary"
          style={{ marginBottom: '10px', backgroundColor: '#2C3E50' }}
          onClick={() => setFormVisible(true)} // Open modal form on click
        >
          Add Assignment
        </Button>

        {/* Modal for Add Assignment */}
        <Modal
          title="Add Assignment"
          visible={formVisible}
          onCancel={() => setFormVisible(false)} // Close modal on cancel
          footer={null} // Custom footer (No default buttons)
          width={600}
        >
          <Form
            form={form}
            name="assignment-form"
            onFinish={handleSubmit}
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              name="className"
              label="Class"
              rules={[{ required: true, message: 'Class is required!' }]}
            >
              <Input placeholder="Enter class name" />
            </Form.Item>

            <Form.Item
              name="subject"
              label="Subject"
              rules={[{ required: true, message: 'Subject is required!' }]}
            >
              <Input placeholder="Enter subject" />
            </Form.Item>

            <Form.Item
              name="assignment"
              label="Assignment"
              rules={[{ required: true, message: 'Assignment details are required!' }]}
            >
              <Input.TextArea placeholder="Enter assignment details" rows={4} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ backgroundColor: '#2C3E50' }}>
                Add Assignment
              </Button>
              <Button
                style={{ marginLeft: '10px' }}
                onClick={() => setFormVisible(false)} // Close modal on cancel
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Table
          columns={columns}
          dataSource={assignmentData}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered
          style={{ backgroundColor: '#EAF2F8' }}
        />
      </div>

      <ToastContainer />
    </>
  );
};

export default TeacherAssignments;








