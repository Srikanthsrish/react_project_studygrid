// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, Button, Form, Input, Modal, message } from 'antd';
// import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
// import 'react-toastify/dist/ReactToastify.css';

// const AdminAddStudent = () => {
//     const [students, setStudents] = useState([]);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [form] = Form.useForm();

//     // Fetch students when component loads
//     useEffect(() => {
//         fetchStudents();
//     }, []);

//     // GET: Fetch students from backend
//     const fetchStudents = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/students');
//             const formattedData = response.data.map(student => ({
//                 ...student,
//                 studentClass: student.class || student.studentClass, // Ensure correct key usage
//             }));
//             setStudents(formattedData);
//         } catch (error) {
//             console.error('Error fetching students:', error);
//             message.error('Failed to load students');
//         }
//     };

//     // POST: Add new student
//     const handleAddStudent = async (values) => {
//         try {
//             const response = await axios.post('http://localhost:5000/students', values);
//             setStudents([...students, { id: response.data.id, ...values }]);
//             message.success('Student added successfully!');
//             form.resetFields();
//             setIsModalVisible(false);
//         } catch (error) {
//             console.error('Error adding student:', error);
//             message.error('Failed to add student');
//         }
//     };

//     // DELETE: Remove student by ID
//     const handleDeleteStudent = async (id) => {
//         if (!window.confirm('Are you sure you want to delete this student?')) return;
//         try {
//             await axios.delete(`http://localhost:5000/students/${id}`);
//             setStudents(students.filter(student => student.id !== id));
//             message.success('Student deleted successfully!');
//         } catch (error) {
//             console.error('Error deleting student:', error);
//             message.error('Failed to delete student');
//         }
//     };

//     return (
//         <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
//             <h1 style={{ textAlign: 'center', color: '#2C3E50' }}>Student Management</h1>

//             {/* Add Student Button */}
//             <Button 
//                 type="primary" 
//                 icon={<PlusOutlined />} 
//                 onClick={() => setIsModalVisible(true)}
//                 style={{ backgroundColor: '#2C3E50', marginBottom: '20px' }}
//             >
//                 Add Student
//             </Button>

//             {/* Add Student Modal */}
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
//                         name="studentClass"
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
//                         <Button type="primary" htmlType="submit" style={{ backgroundColor: '#2C3E50' }}>
//                             Add Student
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

//             {/* Student List Table */}
//             <Table 
//                 dataSource={students} 
//                 rowKey="id" 
//                 bordered 
//                 pagination={{ pageSize: 5 }}
//                 style={{ backgroundColor: '#EAF2F8' }}
//             >
//                 <Table.Column title="ID" dataIndex="id" key="id" />
//                 <Table.Column title="Full Name" dataIndex="fullName" key="fullName" />
//                 <Table.Column title="Class" dataIndex="studentClass" key="studentClass" />
//                 <Table.Column 
//                     title="Action" 
//                     key="action" 
//                     render={(text, record) => (
//                         <Button 
//                             type="primary" 
//                             danger 
//                             icon={<DeleteOutlined />} 
//                             onClick={() => handleDeleteStudent(record.id)}
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
            const response = await axios.get('http://localhost:5000/students');
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
            message.error('Failed to load students');
        }
    };

    const handleAddStudent = async (values) => {
        try {
            const response = await axios.post('http://localhost:5000/students', values);
            setStudents([...students, { id: response.data.id, ...values }]);
            message.success('Student added successfully!');
            form.resetFields();
            setIsModalVisible(false);
        } catch (error) {
            console.error('Error adding student:', error);
            message.error('Failed to add student');
        }
    };

    const handleDeleteStudent = async (id) => {
        if (!window.confirm('Are you sure you want to delete this student?')) return;
        try {
            await axios.delete(`http://localhost:5000/students/${id}`);
            setStudents(students.filter(student => student.id !== id));
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
                        rules={[{ required: true, message: 'Please enter full name' }]}
                    >
                        <Input placeholder="Enter full name" />
                    </Form.Item>

                    <Form.Item 
                        label="Class" 
                        name="studentClass"
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
                rowKey="id" 
                bordered 
                pagination={{ pageSize: 5 }}
                scroll={{ x: screens.xs ? 600 : 'auto' }}
                style={{ backgroundColor: '#EAF2F8' }}
            >
                <Table.Column title="ID" dataIndex="id" key="id" />
                <Table.Column title="Full Name" dataIndex="fullName" key="fullName" />
                <Table.Column title="Class" dataIndex="studentClass" key="studentClass" />
                <Table.Column 
                    title="Action" 
                    key="action" 
                    render={(text, record) => (
                        <Button 
                            type="primary" 
                            danger 
                            icon={<DeleteOutlined />} 
                            onClick={() => handleDeleteStudent(record.id)}
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