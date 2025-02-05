import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Input, Modal, message, Grid } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import 'react-toastify/dist/ReactToastify.css';

const { useBreakpoint } = Grid;

const AdminAddStudent = () => {
    const [students, setStudents] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const screens = useBreakpoint();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('https://studygrid-backendmongo.onrender.com/students');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
            message.error('Failed to load students');
        }
    };

    const handleAddStudent = async (values) => {
        try {
            const response = await axios.post('https://studygrid-backendmongo.onrender.com/students', values);
            // MongoDB assigns _id, not id, so we use _id
            setStudents([...students, { _id: response.data.student._id, ...values }]);
            message.success('Student added successfully!');
            form.resetFields();
            setIsModalVisible(false);
        } catch (error) {
            console.error('Error adding student:', error);
            message.error('Failed to add student');
        }
    };

    const handleDeleteStudent = async (_id) => { // Use _id instead of id
        if (!window.confirm('Are you sure you want to delete this student?')) return;
        try {
            await axios.delete(`https://studygrid-backendmongo.onrender.com/students/${_id}`); // Correct delete endpoint with _id
            setStudents(students.filter(student => student._id !== _id)); // Use _id for filtering
            message.success('Student deleted successfully!');
        } catch (error) {
            console.error('Error deleting student:', error);
            message.error('Failed to delete student');
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', color: '#2C3E50' }}>Student Management</h1>

            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
                style={{ backgroundColor: '#2C3E50', marginBottom: '20px', width: screens.xs ? '100%' : 'auto' }}
            >
                Add Student
            </Button>

            <Modal
                title="Add New Student"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleAddStudent}>
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[{ required: true, message: 'Please enter full name' }]}>
                        <Input placeholder="Enter full name" />
                    </Form.Item>

                    <Form.Item
                        label="Class"
                        name="class"  // Match the backend field
                        rules={[{ required: true, message: 'Please enter class' }]}>
                        <Input placeholder="Enter class" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please enter password' }]}>
                        <Input.Password placeholder="Enter password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: '#2C3E50', width: '100%' }}>
                            Add Student
                        </Button>
                        <Button
                            onClick={() => setIsModalVisible(false)}
                            style={{ marginTop: '10px', backgroundColor: 'red', color: '#FFFFFF', width: '100%' }}
                        >
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Table
                dataSource={students}
                rowKey="_id" // Use _id as rowKey for proper mapping
                bordered
                pagination={{ pageSize: 5 }}
                scroll={{ x: screens.xs ? 600 : 'auto' }}
                style={{ backgroundColor: '#EAF2F8' }}
            >
                <Table.Column title="Id" dataIndex="_id" key="_id" />
                <Table.Column title="Full Name" dataIndex="fullName" key="fullName" />
                <Table.Column title="Class" dataIndex="class" key="class" />
                <Table.Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                        <Button
                            type="primary"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDeleteStudent(record._id)} // Use _id for delete
                        >
                            Delete
                        </Button>
                    )}
                />
            </Table>
        </div>
    );
};

export default AdminAddStudent;

