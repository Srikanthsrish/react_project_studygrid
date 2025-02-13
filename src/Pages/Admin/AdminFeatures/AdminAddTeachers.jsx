import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Input, Modal, message, Grid, Spin,Select } from 'antd';
import { DeleteOutlined, PlusOutlined, LoadingOutlined, EditOutlined,SearchOutlined } from '@ant-design/icons';

const { useBreakpoint } = Grid;
const { confirm } = Modal;
const {Option}=Select;

const AdminAddTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [loadingAction, setLoadingAction] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [form] = Form.useForm();
    const screens = useBreakpoint();
    const [editForm] = Form.useForm();

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        setLoadingData(true);
        try {
            const response = await axios.get('https://studygrid-backendmongo.onrender.com/api/teachers');
            setTeachers(response.data);
        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to load teachers');
        } finally {
            setLoadingData(false);
        }
    };

    const handleAddTeacher = async (values) => {
        setLoadingAction(true);
        try {
            
    
            const response = await axios.post('https://studygrid-backendmongo.onrender.com/api/teachers', values, {
                headers: { 'Content-Type': 'application/json' },
            });
    
            console.log("Server Response:", response.data); // Log response
    
            if (response.data && response.data.teacher) {
                setTeachers(prev => [...prev, response.data.teacher]);
                message.success('Teacher added successfully!');
                form.resetFields();
                setIsModalVisible(false);
            } else {
                message.error('Unexpected response from server');
            }
        } catch (error) {
           
            message.error(error.response?.data?.message || 'Failed to add teacher');
        } finally {
            setLoadingAction(false);
        }
    };
    const handleEditTeacher = async (values) => {
        setLoadingAction(true);
        try {
            const response = await axios.put(`https://studygrid-backendmongo.onrender.com/api/teachers/${editingTeacher.teacherId}`, values);
            if (response.data && response.data.teacher) {
                setTeachers(prev =>
                    prev.map(teacher => (teacher.teacherId === editingTeacher.teacherId ? response.data.teacher : teacher))
                );
                message.success('Teacher updated successfully!');
                setIsEditModalVisible(false);
            } else {
                message.error('Unexpected response from server');
            }
        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to update teacher');
        } finally {
            setLoadingAction(false);
        }
    };

    const showEditModal = (teacher) => {
        setEditingTeacher(teacher);
        editForm.setFieldsValue({
            teacherId: teacher.teacherId,
            name: teacher.name,
            email: teacher.email,
            gender: teacher.gender
        });
        setIsEditModalVisible(true);
    };
    
    const showDeleteConfirm = (teacherId) => {
        confirm({
            title: 'Are you sure you want to delete this teacher?',
            content: 'This action cannot be undone.',
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: async () => {
                setLoadingAction(true);
                try {
                    await axios.delete(`https://studygrid-backendmongo.onrender.com/api/teachers/${teacherId}`);
                    setTeachers(prev => prev.filter(teacher => teacher.teacherId !== teacherId));
                    message.success('Teacher deleted successfully!');
                } catch (error) {
                    message.error(error.response?.data?.message || 'Failed to delete teacher');
                } finally {
                    setLoadingAction(false);
                }
            },
        });
    };

    const filteredTeachers = teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ color: '#2C3E50' }}>Teachers Management</h1>
                <h2 style={{ color: '#2C3E50' }}>Total Teachers : {teachers.length}</h2>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                
                <Input
                    placeholder="Search Teachers"
                    prefix={<SearchOutlined />}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ maxWidth: '300px' }}
                />
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalVisible(true)}
                    style={{ backgroundColor: '#2C3E50' }}
                >
                    Add Teacher
                </Button>
            </div>

            <Modal
                title="Add New Teacher"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleAddTeacher}>
                    <Form.Item label="Teacher ID" name="teacherId" rules={[{ required: true, message: 'Please enter Teacher ID' }]}> 
                        <Input placeholder="Enter Teacher ID" /> 
                    </Form.Item>
                    <Form.Item label="Full Name" name="name" rules={[{ required: true, message: 'Please enter full name' }]}> 
                        <Input placeholder="Enter full name" /> 
                    </Form.Item>
                    <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter email' }, { type: 'email', message: 'Enter a valid email' }]}> 
                        <Input placeholder="Enter email" /> 
                    </Form.Item>
                    <Form.Item label="gender" name="gender" rules={[{ required: true, message: 'Please enter gender' }]}> 
                    <Select placeholder="Select gender">
                            <Option value="Male">Male</Option>
                            <Option value="Female">Female</Option>
                    </Select>
                    </Form.Item>
                    
                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter password' }]}> 
                        <Input.Password placeholder="Enter password" /> 
                    </Form.Item>
                    <Form.Item>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button type="primary" htmlType="submit" disabled={loadingAction} style={{ backgroundColor: '#2C3E50', flex: 1, marginRight: '10px' }}> 
                                {loadingAction ? <Spin indicator={<LoadingOutlined />} /> : 'Add Teacher'} 
                            </Button>
                            <Button onClick={() => setIsModalVisible(false)} disabled={loadingAction} style={{ backgroundColor: 'red', color: '#FFFFFF', flex: 1 }}> 
                                Cancel 
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
            {/* Edit Teacher Modal */}
            <Modal title="Edit Teacher" open={isEditModalVisible} onCancel={() => setIsEditModalVisible(false)} footer={null}>
                <Form form={editForm} layout="vertical" onFinish={handleEditTeacher}>
                    <Form.Item label="Teacher ID" name="teacherId">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Full Name" name="name" rules={[{ required: true, message: 'Please enter full name' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Enter a valid email' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select gender' }]}>
                        <Select>
                            <Option value="Male">Male</Option>
                            <Option value="Female">Female</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loadingAction} style={{ backgroundColor: '#2C3E50' }}>
                            Update Teacher
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>


            {loadingData ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
                </div>
            ) : (
                <Table
                    dataSource={filteredTeachers}
                    rowKey="teacherId"
                    bordered
                    pagination={{ pageSize: 5 }}
                    style={{ backgroundColor: '#EAF2F8', marginTop: '20px' }}
                >
                    <Table.Column title="Teacher ID" dataIndex="teacherId" key="teacherId" align="center"
                     onHeaderCell={() => ({
                        style: { backgroundColor: '#2C3E50', color: 'white'  },
                    })} />
                    <Table.Column title="Name" dataIndex="name" key="name" align="center" 
                     onHeaderCell={() => ({
                        style: { backgroundColor: '#2C3E50', color: 'white'  },
                    })}/>
                    <Table.Column title="Email" dataIndex="email" key="email" align="center"
                     onHeaderCell={() => ({
                        style: { backgroundColor: '#2C3E50', color: 'white'  },
                    })} />
                    <Table.Column title="gender" dataIndex="gender" key="gender" align="center"
                     onHeaderCell={() => ({
                        style: { backgroundColor: '#2C3E50', color: 'white'  },
                    })} />

                    <Table.Column
                        title="Action"
                        key="action"
                        align="center"
                        onHeaderCell={() => ({
                            style: { backgroundColor: '#2C3E50', color: 'white'  },
                        })}
                        render={(_, record) => (
                            <>
                            <Button icon={<EditOutlined />} onClick={() => showEditModal(record)}> Edit </Button>
                            <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => showDeleteConfirm(record.teacherId)}> 
                                Delete 
                            </Button>
                            </>

                        )}
                    />
                </Table>
            )}
        </div>
    );
};

export default AdminAddTeachers;
