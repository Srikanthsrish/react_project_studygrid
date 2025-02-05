
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Input, Modal, message, Spin } from 'antd';
import { DeleteOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';

const AdminAddTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    // Fetch teachers from backend
    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://studygrid-backendmongo.onrender.com/api/teachers');
            setTeachers(response.data);
        } catch (error) {
            message.error('Failed to load teachers');
        } finally {
            setLoading(false);
        }
    };

    // Handle adding a teacher
    const handleAddTeacher = async (values) => {
        setLoading(true); // Start loading spinner
        try {
            const response = await axios.post('https://studygrid-backendmongo.onrender.com/api/teachers', values);

            // Add the newly added teacher to the teachers state
            setTeachers([...teachers, { teacherId: response.data.teacher.teacherId, ...values }]);

            message.success('Teacher added successfully!');
            form.resetFields();
            setIsModalVisible(false);
        } catch (error) {
            message.error('Failed to add teacher');
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    // Handle deleting a teacher
    const handleDeleteTeacher = async (teacherId) => {
        if (!window.confirm('Are you sure you want to delete this teacher?')) return;
        try {
            await axios.delete(`https://studygrid-backendmongo.onrender.com/api/teachers/${teacherId}`);
            setTeachers(teachers.filter(teacher => teacher.teacherId !== teacherId));
            message.success('Teacher deleted successfully!');
        } catch (error) {
            message.error('Failed to delete teacher');
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', color: '#2C3E50' }}>Teachers Management</h1>

            {/* Add Teacher Button */}
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
                style={{ backgroundColor: '#2C3E50', marginBottom: '20px' }}
            >
                Add Teacher
            </Button>

            {/* Add Teacher Modal */}
            <Modal
                title="Add New Teacher"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleAddTeacher}>
                    <Form.Item
                        label="Teacher ID"
                        name="teacherId"
                        rules={[{ required: true, message: 'Please enter Teacher ID' }]}
                    >
                        <Input placeholder="Enter Teacher ID" />
                    </Form.Item>

                    <Form.Item
                        label="Full Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter full name' }]}
                    >
                        <Input placeholder="Enter full name" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please enter email' }, { type: 'email', message: 'Enter a valid email' }]}
                    >
                        <Input placeholder="Enter email" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please enter password' }]}
                    >
                        <Input.Password placeholder="Enter password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: '#2C3E50' }}>
                            Add Teacher
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

            {/* Loading Indicator */}
            {loading ? (
                <div style={{ textAlign: 'center', margin: '20px' }}>
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#2C3E50' }} spin />} />
                </div>
            ) : (
                <Table
                    dataSource={teachers}
                    rowKey="teacherId"
                    bordered
                    pagination={{ pageSize: 5 }}
                    style={{ backgroundColor: '#EAF2F8' }}
                >
                    <Table.Column title="Teacher ID" dataIndex="teacherId" key="teacherId" />
                    <Table.Column title="Name" dataIndex="name" key="name" />
                    <Table.Column title="Email" dataIndex="email" key="email" />
                    <Table.Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Button
                                type="primary"
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleDeleteTeacher(record.teacherId)}
                            >
                                Delete
                            </Button>
                        )}
                    />
                </Table>
            )}
        </div>
    );
};

export default AdminAddTeachers;
