
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, Button, Form, Input, Modal, message, Spin } from 'antd';
// import { DeleteOutlined, PlusOutlined, LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
// import 'antd/dist/reset.css';

// const { confirm } = Modal;

// const AdminAddTeachers = () => {
//     const [teachers, setTeachers] = useState([]);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [form] = Form.useForm();

//     useEffect(() => {
//         fetchTeachers();
//     }, []);

//     const fetchTeachers = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get('https://studygrid-backendmongo.onrender.com/api/teachers');
//             setTeachers(response.data);
//         } catch (error) {
//             message.error('Failed to load teachers');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleAddTeacher = async (values) => {
//         setLoading(true);
//         try {
//             const response = await axios.post('https://studygrid-backendmongo.onrender.com/api/teachers', values);
//             setTeachers([...teachers, { teacherId: response.data.teacher.teacherId, ...values }]);
//             message.success('Teacher added successfully!');
//             form.resetFields();
//             setIsModalVisible(false);
//         } catch (error) {
//             message.error('Failed to add teacher');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const showDeleteConfirm = (teacherId) => {
//         confirm({
//             title: 'Are you sure you want to delete this teacher?',
//             icon: <ExclamationCircleOutlined />,
//             content: 'This action cannot be undone.',
//             okText: 'Yes, Delete',
//             okType: 'danger',
//             cancelText: 'Cancel',
//             onOk: async () => {
//                 try {
//                     await axios.delete(`https://studygrid-backendmongo.onrender.com/api/teachers/${teacherId}`);
//                     setTeachers(teachers.filter(teacher => teacher.teacherId !== teacherId));
//                     message.success('Teacher deleted successfully!');
//                 } catch (error) {
//                     message.error('Failed to delete teacher');
//                 }
//             },
//         });
//     };

//     return (
//         <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
//             <h1 style={{ textAlign: 'center', color: '#2C3E50' }}>Teachers Management</h1>

//             <Button
//                 type="primary"
//                 icon={<PlusOutlined />}
//                 onClick={() => setIsModalVisible(true)}
//                 style={{ backgroundColor: '#2C3E50', marginBottom: '20px' }}
//             >
//                 Add Teacher
//             </Button>

//             <Modal
//                 title="Add New Teacher"
//                 open={isModalVisible}
//                 onCancel={() => setIsModalVisible(false)}
//                 footer={null}
//             >
//                 <Form form={form} layout="vertical" onFinish={handleAddTeacher}>
//                     <Form.Item
//                         label="Teacher ID"
//                         name="teacherId"
//                         rules={[{ required: true, message: 'Please enter Teacher ID' }]}
//                     >
//                         <Input placeholder="Enter Teacher ID" />
//                     </Form.Item>

//                     <Form.Item
//                         label="Full Name"
//                         name="name"
//                         rules={[{ required: true, message: 'Please enter full name' }]}
//                     >
//                         <Input placeholder="Enter full name" />
//                     </Form.Item>

//                     <Form.Item
//                         label="Email"
//                         name="email"
//                         rules={[{ required: true, message: 'Please enter email' }, { type: 'email', message: 'Enter a valid email' }]}
//                     >
//                         <Input placeholder="Enter email" />
//                     </Form.Item>

//                     <Form.Item
//                         label="Password"
//                         name="password"
//                         rules={[{ required: true, message: 'Please enter password' }]}
//                     >
//                         <Input.Password placeholder="Enter password" />
//                     </Form.Item>

//                     <Form.Item>
//                         <Button type="primary" htmlType="submit" style={{ backgroundColor: '#2C3E50' }}>
//                             Add Teacher
//                         </Button>
//                         <Button
//                             onClick={() => setIsModalVisible(false)}
//                             style={{ marginLeft: '10px', backgroundColor: 'red', color: '#FFFFFF' }}
//                         >
//                             Cancel
//                         </Button>
//                     </Form.Item>
//                 </Form>
//             </Modal>

//             {loading ? (
//                 <div style={{ textAlign: 'center', margin: '20px' }}>
//                     <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#2C3E50' }} spin />} />
//                 </div>
//             ) : (
//                 <Table
//                     dataSource={teachers}
//                     rowKey="teacherId"
//                     bordered
//                     pagination={{ pageSize: 5 }}
//                     style={{ backgroundColor: '#EAF2F8' }}
//                 >
//                     <Table.Column title="Teacher ID" dataIndex="teacherId" key="teacherId" />
//                     <Table.Column title="Name" dataIndex="name" key="name" />
//                     <Table.Column title="Email" dataIndex="email" key="email" />
//                     <Table.Column
//                         title="Action"
//                         key="action"
//                         render={(text, record) => (
//                             <Button
//                                 type="primary"
//                                 danger
//                                 icon={<DeleteOutlined />}
//                                 onClick={() => showDeleteConfirm(record.teacherId)}
//                             >
//                                 Delete
//                             </Button>
//                         )}
//                     />
//                 </Table>
//             )}
//         </div>
//     );
// };

// export default AdminAddTeachers;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Input, Modal, message, Grid, Spin } from 'antd';
import { DeleteOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';

const { useBreakpoint } = Grid;
const { confirm } = Modal;

const AdminAddTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const screens = useBreakpoint();

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

    const handleAddTeacher = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('https://studygrid-backendmongo.onrender.com/api/teachers', values);
            setTeachers([...teachers, { teacherId: response.data.teacher.teacherId, ...values }]);
            message.success('Teacher added successfully!');
            form.resetFields();
            setIsModalVisible(false);
        } catch (error) {
            message.error('Failed to add teacher');
        } finally {
            setLoading(false);
        }
    };

    const showDeleteConfirm = (teacherId) => {
        confirm({
            title: 'Are you sure you want to delete this teacher?',
            content: 'This action cannot be undone.',
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: async () => {
                setLoading(true);
                try {
                    await axios.delete(`https://studygrid-backendmongo.onrender.com/api/teachers/${teacherId}`);
                    setTeachers(teachers.filter(teacher => teacher.teacherId !== teacherId));
                    message.success('Teacher deleted successfully!');
                } catch (error) {
                    message.error('Failed to delete teacher');
                } finally {
                    setLoading(false);
                }
            },
        });
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', color: '#2C3E50' }}>Teachers Management</h1>

            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
                style={{
                    backgroundColor: '#2C3E50',
                    marginBottom: '20px',
                    width: screens.xs ? '100%' : 'auto',
                    marginLeft: screens.xs ? '0' : '10px',
                }}
            >
                Add Teacher
            </Button>

            <Modal
                title="Add New Teacher"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={screens.xs ? '90%' : '50%'}
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
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={loading}
                                style={{ backgroundColor: '#2C3E50', flex: 1, marginRight: '10px' }}
                            >
                                {loading ? <Spin indicator={<LoadingOutlined />} /> : 'Add Teacher'}
                            </Button>
                            <Button
                                onClick={() => setIsModalVisible(false)}
                                disabled={loading}
                                style={{ backgroundColor: 'red', color: '#FFFFFF', flex: 1 }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
                </div>
            ) : (
                <Table
                    dataSource={teachers}
                    rowKey="teacherId"
                    bordered
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: screens.xs ? 600 : 'auto' }}
                    style={{ backgroundColor: '#EAF2F8', marginTop: '20px' }}
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
                                onClick={() => showDeleteConfirm(record.teacherId)}
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
