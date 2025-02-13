import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Input, Modal, message, Grid, Spin, Select } from 'antd';
import { DeleteOutlined, PlusOutlined, LoadingOutlined, SearchOutlined } from '@ant-design/icons';

const { useBreakpoint } = Grid;
const { confirm } = Modal;
const { Option } = Select;

const AdminAddStudent = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [loadingAction, setLoadingAction] = useState(false);
    const [form] = Form.useForm();
    const screens = useBreakpoint();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        setLoadingData(true);
        try {
            const response = await axios.get('https://studygrid-backendmongo.onrender.com/students');
            setStudents(response.data);
            setFilteredStudents(response.data);
        } catch (error) {
            message.error('Failed to load students');
        } finally {
            setLoadingData(false);
        }
    };

    const handleSearch = (value) => {
        setSearchText(value);
        if (!value) {
            setFilteredStudents(students);
            return;
        }
        const filtered = students.filter(student =>
            student.fullName?.toLowerCase().includes(value.toLowerCase()) ||
            student['class']?.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredStudents(filtered);
    };

    const handleAddStudent = async (values) => {
        setLoadingAction(true);
        try {
            const response = await axios.post('https://studygrid-backendmongo.onrender.com/students', values);
            const newStudent = { _id: response.data.student._id, ...values };
            setStudents([...students, newStudent]);
            setFilteredStudents([...filteredStudents, newStudent]);
            message.success('Student added successfully!');
            form.resetFields();
            setIsModalVisible(false);
        } catch (error) {
            message.error('Failed to add student');
        } finally {
            setLoadingAction(false);
        }
    };

    const handleDeleteStudent = (_id) => {
        confirm({
            title: 'Are you sure you want to delete this student?',
            content: 'This action cannot be undone.',
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: async () => {
                setLoadingAction(true);
                try {
                    await axios.delete(`https://studygrid-backendmongo.onrender.com/students/${_id}`);
                    const updatedStudents = students.filter(student => student._id !== _id);
                    setStudents(updatedStudents);
                    setFilteredStudents(updatedStudents);
                    message.success('Student deleted successfully!');
                } catch (error) {
                    message.error('Failed to delete student');
                } finally {
                    setLoadingAction(false);
                }
            },
        });
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ color: '#2C3E50' }}>Student Management</h1>
                <h2 style={{ color: '#2C3E50' }}>Total Students: {students.length}</h2>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap',justifyContent: 'space-between', alignItems: 'center' }}>
                <Input
                    prefix={<SearchOutlined />}
                    placeholder="Search by name"
                    allowClear
                    value={searchText}
                    onChange={(e) => handleSearch(e.target.value)}
                    style={{ width: screens.xs ? '100%' : '250px', marginBottom: '20px' }}
                />
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalVisible(true)}
                    disabled={loadingAction}
                    style={{ backgroundColor: '#2C3E50', marginBottom: '20px', width: screens.xs ? '100%' : 'auto' }}
                >
                    Add Student
                </Button>
            </div>

            <Modal
                title="Add New Student"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleAddStudent}>
                    <Form.Item label="Full Name" name="fullName" rules={[{ required: true, message: 'Please enter full name' }]}>
                        <Input placeholder="Enter full name" />
                    </Form.Item>
                    <Form.Item label="Class" name="class" rules={[{ required: true, message: 'Please select a class' }]}>
                        <Select placeholder="Select class">
                            <Option value="1st">1st</Option>
                            <Option value="2nd">2nd</Option>
                            <Option value="3rd">3rd</Option>
                            <Option value="4th">4th</Option>
                            <Option value="5th">5th</Option>
                            <Option value="UKG">UKG</Option>
                            <Option value="LKG">LKG</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter password' }]}>
                        <Input.Password placeholder="Enter password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={loadingAction} style={{ backgroundColor: '#2C3E50', marginRight: '10px' }}>
                            {loadingAction ? <Spin indicator={<LoadingOutlined />} /> : 'Add Student'}
                        </Button>
                        <Button onClick={() => setIsModalVisible(false)} disabled={loadingAction} style={{ backgroundColor: 'red', color: '#FFFFFF' }}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {loadingData ? (
                <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
            ) : (
                <Table
                    dataSource={filteredStudents}
                    rowKey="_id"
                    bordered
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: screens.xs ? 600 : 'auto' }}
                >
                    <Table.Column title="Id" dataIndex="_id" key="_id" align="center" 
                    onHeaderCell={() => ({
                        style: { backgroundColor: '#2C3E50', color: 'white'  },
                    })} 
                    />
                    <Table.Column title="Full Name" dataIndex="fullName" key="fullName" align="center"
                    onHeaderCell={() => ({
                        style: { backgroundColor: '#2C3E50', color: 'white'  },
                    })}  />
                    <Table.Column title="Class" dataIndex="class" key="class" align="center" 
                    onHeaderCell={() => ({
                        style: { backgroundColor: '#2C3E50', color: 'white'  },
                    })} />
                    <Table.Column
                        title="Action"
                        key="actions"
                        align="center"
                        onHeaderCell={() => ({
                            style: { backgroundColor: '#2C3E50', color: 'white'  },
                        })} 
                        render={(_, record) => (
                            <Button type="default" danger icon={<DeleteOutlined />} onClick={() => handleDeleteStudent(record._id)}>
                                Delete
                            </Button>
                        )}
                    />
                </Table>
            )}
        </div>
    );
};

export default AdminAddStudent;
