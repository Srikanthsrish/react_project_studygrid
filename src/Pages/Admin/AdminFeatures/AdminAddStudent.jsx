// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, Button, Form, Input, Modal, message, Grid } from 'antd';
// import { DeleteOutlined, PlusOutlined ,} from '@ant-design/icons';
// import 'react-toastify/dist/ReactToastify.css';

// const { useBreakpoint } = Grid;
// const { confirm } = Modal;

// const AdminAddStudent = () => {
//     const [students, setStudents] = useState([]);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [form] = Form.useForm();
//     const screens = useBreakpoint();

//     useEffect(() => {
//         fetchStudents();
//     }, []);

//     const fetchStudents = async () => {
//         try {
//             const response = await axios.get('https://studygrid-backendmongo.onrender.com/students');
//             setStudents(response.data);
//         } catch (error) {
//             console.error('Error fetching students:', error);
//             message.error('Failed to load students');
//         }
//     };

//     const handleAddStudent = async (values) => {
//         try {
//             const response = await axios.post('https://studygrid-backendmongo.onrender.com/students', values);
//             setStudents([...students, { _id: response.data.student._id, ...values }]);
//             message.success('Student added successfully!');
//             form.resetFields();
//             setIsModalVisible(false);
//         } catch (error) {
//             console.error('Error adding student:', error);
//             message.error('Failed to add student');
//         }
//     };

//     const handleDeleteStudent = (_id) => {
//         confirm({
//             title: 'Are you sure you want to delete this student?',
//             content: 'This action cannot be undone.',
//             okText: 'Yes, Delete',
//             okType: 'danger',
//             cancelText: 'Cancel',
//             onOk: async () => {
//                 try {
//                     await axios.delete(`https://studygrid-backendmongo.onrender.com/students/${_id}`);
//                     setStudents(students.filter(student => student._id !== _id));
//                     message.success('Student deleted successfully!');
//                 } catch (error) {
//                     console.error('Error deleting student:', error);
//                     message.error('Failed to delete student');
//                 }
//             },
//         });
//     };

//     return (
//         <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
//             <h1 style={{ textAlign: 'center', color: '#2C3E50' }}>Student Management</h1>

//             <Button
//                 type="primary"
//                 icon={<PlusOutlined />}
//                 onClick={() => setIsModalVisible(true)}
//                 style={{ backgroundColor: '#2C3E50', marginBottom: '20px', width: screens.xs ? '100%' : 'auto' }}
//             >
//                 Add Student
//             </Button>

//             <Modal
//                 title="Add New Student"
//                 open={isModalVisible}
//                 onCancel={() => setIsModalVisible(false)}
//                 footer={null}
//             >
//                 <Form form={form} layout="vertical" onFinish={handleAddStudent}>
//                     <Form.Item
//                         label="Full Name"
//                         name="fullName"
//                         rules={[{ required: true, message: 'Please enter full name' }]}
//                     >
//                         <Input placeholder="Enter full name" />
//                     </Form.Item>

//                     <Form.Item
//                         label="Class"
//                         name="class"
//                         rules={[{ required: true, message: 'Please enter class' }]}
//                     >
//                         <Input placeholder="Enter class" />
//                     </Form.Item>

//                     <Form.Item
//                         label="Password"
//                         name="password"
//                         rules={[{ required: true, message: 'Please enter password' }]}
//                     >
//                         <Input.Password placeholder="Enter password" />
//                     </Form.Item>

//                     <Form.Item>
//                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                             <Button type="primary" htmlType="submit" style={{ backgroundColor: '#2C3E50', flex: 1, marginRight: '10px' }}>
//                                 Add Student
//                             </Button>
//                             <Button
//                                 onClick={() => setIsModalVisible(false)}
//                                 style={{ backgroundColor: 'red', color: '#FFFFFF', flex: 1 }}
//                             >
//                                 Cancel
//                             </Button>
//                         </div>
//                     </Form.Item>
//                 </Form>
//             </Modal>

//             <Table
//                 dataSource={students}
//                 rowKey="_id"
//                 bordered
//                 pagination={{ pageSize: 5 }}
//                 scroll={{ x: screens.xs ? 600 : 'auto' }}
//                 style={{ backgroundColor: '#EAF2F8' }}
//             >
//                 <Table.Column title="Id" dataIndex="_id" key="_id" />
//                 <Table.Column title="Full Name" dataIndex="fullName" key="fullName" />
//                 <Table.Column title="Class" dataIndex="class" key="class" />
//                 <Table.Column
//                     title="Action"
//                     key="actions"
//                     render={(_, record) => (
//                         <Button
//                             type="default"
//                             danger
//                             icon={<DeleteOutlined />}
//                             onClick={() => handleDeleteStudent(record._id)}
//                         >
//                             Delete
//                         </Button>
//                     )}
//                 />
//             </Table>
//         </div>
//     );
// };

// export default AdminAddStudent;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, Button, Form, Input, Modal, message, Grid, Spin } from 'antd';
// import { DeleteOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';
// import 'react-toastify/dist/ReactToastify.css';

// const { useBreakpoint } = Grid;
// const { confirm } = Modal;

// const AdminAddStudent = () => {
//     const [students, setStudents] = useState([]);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [form] = Form.useForm();
//     const screens = useBreakpoint();

//     useEffect(() => {
//         fetchStudents();
//     }, []);

//     const fetchStudents = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.get('https://studygrid-backendmongo.onrender.com/students');
//             setStudents(response.data);
//         } catch (error) {
//             message.error('Failed to load students');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleAddStudent = async (values) => {
//         setLoading(true);
//         try {
//             const response = await axios.post('https://studygrid-backendmongo.onrender.com/students', values);
//             setStudents([...students, { _id: response.data.student._id, ...values }]);
//             message.success('Student added successfully!');
//             form.resetFields();
//             setIsModalVisible(false);
//         } catch (error) {
//             message.error('Failed to add student');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDeleteStudent = (_id) => {
//         confirm({
//             title: 'Are you sure you want to delete this student?',
//             content: 'This action cannot be undone.',
//             okText: 'Yes, Delete',
//             okType: 'danger',
//             cancelText: 'Cancel',
//             onOk: async () => {
//                 setLoading(true);
//                 try {
//                     await axios.delete(`https://studygrid-backendmongo.onrender.com/students/${_id}`);
//                     setStudents(students.filter(student => student._id !== _id));
//                     message.success('Student deleted successfully!');
//                 } catch (error) {
//                     message.error('Failed to delete student');
//                 } finally {
//                     setLoading(false);
//                 }
//             },
//         });
//     };

//     return (
//         <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
//             <h1 style={{ textAlign: 'center', color: '#2C3E50' }}>Student Management</h1>

//             <Button
//                 type="primary"
//                 icon={loading ? <LoadingOutlined /> : <PlusOutlined />}
//                 onClick={() => setIsModalVisible(true)}
//                 disabled={loading}
//                 style={{ backgroundColor: '#2C3E50', marginBottom: '20px', width: screens.xs ? '100%' : 'auto' }}
//             >
//                 {loading ? 'Processing...' : 'Add Student'}
//             </Button>

//             <Modal
//                 title="Add New Student"
//                 open={isModalVisible}
//                 onCancel={() => setIsModalVisible(false)}
//                 footer={null}
//             >
//                 <Form form={form} layout="vertical" onFinish={handleAddStudent}>
//                     <Form.Item
//                         label="Full Name"
//                         name="fullName"
//                         rules={[{ required: true, message: 'Please enter full name' }]}
//                     >
//                         <Input placeholder="Enter full name" />
//                     </Form.Item>

//                     <Form.Item
//                         label="Class"
//                         name="class"
//                         rules={[{ required: true, message: 'Please enter class' }]}
//                     >
//                         <Input placeholder="Enter class" />
//                     </Form.Item>

//                     <Form.Item
//                         label="Password"
//                         name="password"
//                         rules={[{ required: true, message: 'Please enter password' }]}
//                     >
//                         <Input.Password placeholder="Enter password" />
//                     </Form.Item>

//                     <Form.Item>
//                         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                             <Button
//                                 type="primary"
//                                 htmlType="submit"
//                                 disabled={loading}
//                                 style={{ backgroundColor: '#2C3E50', flex: 1, marginRight: '10px' }}
//                             >
//                                 {loading ? <Spin indicator={<LoadingOutlined />} /> : 'Add Student'}
//                             </Button>
//                             <Button
//                                 onClick={() => setIsModalVisible(false)}
//                                 disabled={loading}
//                                 style={{ backgroundColor: 'red', color: '#FFFFFF', flex: 1 }}
//                             >
//                                 Cancel
//                             </Button>
//                         </div>
//                     </Form.Item>
//                 </Form>
//             </Modal>

//             <Table
//                 dataSource={students}
//                 rowKey="_id"
//                 bordered
//                 pagination={{ pageSize: 5 }}
//                 scroll={{ x: screens.xs ? 600 : 'auto' }}
//                 style={{ backgroundColor: '#EAF2F8' }}
//             >
//                 <Table.Column title="Id" dataIndex="_id" key="_id" />
//                 <Table.Column title="Full Name" dataIndex="fullName" key="fullName" />
//                 <Table.Column title="Class" dataIndex="class" key="class" />
//                 <Table.Column
//                     title="Action"
//                     key="actions"
//                     render={(_, record) => (
//                         <Button
//                             type="default"
//                             danger
//                             icon={loading ? <LoadingOutlined /> : <DeleteOutlined />}
//                             onClick={() => handleDeleteStudent(record._id)}
//                             disabled={loading}
//                         >
//                             {loading ? 'Deleting...' : 'Delete'}
//                         </Button>
//                     )}
//                 />
//             </Table>
//         </div>
//     );
// };

// export default AdminAddStudent;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Input, Modal, message, Grid, Spin } from 'antd';
import { DeleteOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';

const { useBreakpoint } = Grid;
const { confirm } = Modal;

const AdminAddStudent = () => {
    const [students, setStudents] = useState([]);
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
        } catch (error) {
            message.error('Failed to load students');
        } finally {
            setLoadingData(false);
        }
    };

    const handleAddStudent = async (values) => {
        setLoadingAction(true);
        try {
            const response = await axios.post('https://studygrid-backendmongo.onrender.com/students', values);
            setStudents([...students, { _id: response.data.student._id, ...values }]);
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
                    setStudents(students.filter(student => student._id !== _id));
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
            <h1 style={{ textAlign: 'center', color: '#2C3E50' }}>Student Management</h1>

            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
                disabled={loadingAction}
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
                        rules={[{ required: true, message: 'Please enter full name' }]}
                    >
                        <Input placeholder="Enter full name" />
                    </Form.Item>

                    <Form.Item
                        label="Class"
                        name="class"
                        rules={[{ required: true, message: 'Please enter class' }]}
                    >
                        <Input placeholder="Enter class" />
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
                                disabled={loadingAction}
                                style={{ backgroundColor: '#2C3E50', flex: 1, marginRight: '10px' }}
                            >
                                {loadingAction ? <Spin indicator={<LoadingOutlined />} /> : 'Add Student'}
                            </Button>
                            <Button
                                onClick={() => setIsModalVisible(false)}
                                disabled={loadingAction}
                                style={{ backgroundColor: 'red', color: '#FFFFFF', flex: 1 }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>

            {loadingData ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
                </div>
            ) : (
                <Table
                    dataSource={students}
                    rowKey="_id"
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
                        key="actions"
                        render={(_, record) => (
                            <Button
                                type="default"
                                danger
                                icon={loadingAction ? <LoadingOutlined /> : <DeleteOutlined />}
                                onClick={() => handleDeleteStudent(record._id)}
                                disabled={loadingAction}
                            >
                                {loadingAction ? 'Deleting...' : 'Delete'}
                            </Button>
                        )}
                    />
                </Table>
            )}
        </div>
    );
};

export default AdminAddStudent;
