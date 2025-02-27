import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, Select, Table, Form, message, Modal, Spin, Grid } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { PlusOutlined, DeleteOutlined, LoadingOutlined, EditOutlined,EyeOutlined } from '@ant-design/icons';
import 'react-toastify/dist/ReactToastify.css';

const { Option } = Select;
const { useBreakpoint } = Grid;


const AdminSubjects = () => {

  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [viewSubject, setViewSubject] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const screens = useBreakpoint();
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();


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

  const handleEdit = (record) => {
    setEditingSubject(record);
    editForm.setFieldsValue(record);
    setEditModal(true);
  };

  const handleUpdate = async (values) => {
    if (!editingSubject) {
      toast.error('No subject selected for editing');
      return;
    }
  
    setLoadingAction(true);
    try {
      await axios.put(
        `https://studygrid-backendmongo.onrender.com/api/subjects/${editingSubject.subject_code}`,
        values
      );
      toast.success('Subject updated successfully');
      setEditModal(false);
      fetchSubjects();
    } catch (error) {
      toast.error('Error updating subject');
    } finally {
      setLoadingAction(false);
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
    {
      title: 'Subject Code',
      dataIndex: 'subject_code',
      key: 'subject_code',
      onHeaderCell: () => ({ style: { backgroundColor: '#2C3E50', color: 'white' } })
    },
    {
      title: 'Subject Name',
      dataIndex: 'subject_name',
      key: 'subject_name',
      onHeaderCell: () => ({ style: { backgroundColor: '#2C3E50', color: 'white' } })
    },
    {
      title: 'Action',
      key: 'action',
      onHeaderCell: () => ({ style: { backgroundColor: '#2C3E50', color: 'white' } }),
      render: (_, record) => (
        <>
        <Button type="link" onClick={() => handleView(record)} icon={<EyeOutlined />}>View</Button>
          <Button type="link" onClick={() => handleEdit(record)} icon={<EditOutlined />}>
            Edit
          </Button>
          <Button
            type="link"
            onClick={() => handleDelete(record.subject_code)}
            icon={loadingAction ? <LoadingOutlined /> : <DeleteOutlined />}
            style={{ color: 'red' }}
            disabled={loadingAction}
          >
            {loadingAction ? 'Deleting...' : 'Delete'}
          </Button>
        </>
      ),
    },
  ];


  return (
    <div style={{ backgroundColor: '#EAF2F8', padding: '20px' }}>
      <h1 style={{ color: '#2C3E50' }}>Subject Management</h1>



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
            rules={[{ required: true, message: 'Please select a subject!' }]}
          >
            <Select placeholder="Select Subject">
              {[
                "English",
                "Environmental Studies",
                "Mathematics",
                "Mother Tongue",
                "Computer Basics",
                "Science",
                "Social Studies",
                "Computer Applications",
                "General Awareness",
                "Language Skills",
                "Mathematics Basics",
                "Numbers and Shapes",
                "Rhymes and Stories"
              ].map((subject) => (
                <Option key={subject} value={subject}>
                  {subject}
                </Option>
              ))}
            </Select>
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
      {/* Edit Subject Modal */}
<Modal title="Edit Subject" open={editModal} onCancel={() => setEditModal(false)} footer={null}>
  <Form form={editForm} onFinish={handleUpdate} layout="vertical">
    {/* Subject Code */}
    <Form.Item label="Subject Code" name="subject_code" rules={[{ required: true, message: 'Please enter subject code' }]}>
      <Input placeholder="Enter Subject Code" />
    </Form.Item>

    {/* Subject Name */}
    <Form.Item label="Subject Name" name="subject_name" rules={[{ required: true, message: 'Please select a subject' }]}>
      <Select placeholder="Select Subject">
        {[
          "English", "Environmental Studies", "Mathematics", "Mother Tongue",
          "Computer Basics", "Science", "Social Studies", "Computer Applications",
          "General Awareness", "Language Skills", "Mathematics Basics",
          "Numbers and Shapes", "Rhymes and Stories"
        ].map(subject => (
          <Select.Option key={subject} value={subject}>{subject}</Select.Option>
        ))}
      </Select>
    </Form.Item>

    {/* Submit Button */}
    <Form.Item>
      <Button type="primary" htmlType="submit" loading={loadingAction}>
        Update
      </Button>
    </Form.Item>
  </Form>
</Modal>
{/* View Subject Modal */}
<Modal
        title="Subject Details"
        open={viewModal}
        onCancel={() => setViewModal(false)}
        footer={null}
      >
        {viewSubject && (
          <div>
            <p><strong>Subject Code:</strong> {viewSubject.subject_code}</p>
            <p><strong>Subject Name:</strong> {viewSubject.subject_name}</p>
            <p><strong>Class:</strong> {viewSubject.class_name}</p>
          </div>
        )}
      </Modal>



      {/* Class Selection and Fetching Subjects */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Select
            onChange={setSelectedClass}
            value={selectedClass || undefined}
            placeholder="Select class"
            style={{
              width: 200,
              marginBottom: '20px',
            }}

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




