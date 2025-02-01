import React, { useState } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import StudentSidebar from '../StudentFeatures/StudentSidebar';
import AccountMenu from '../StudentFeatures/AccountMenu';
import SubmitComplaint from '../StudentFeatures/StudentComplaints';
import StudentHome from '../StudentFeatures/StudentHome';
import StudentTimetable from '../StudentFeatures/Studenttimetable';
import StudentAssignments from '../StudentFeatures/StudentAssignments';
import Logout from '../../../Components/Logout';
import StudentProfile from '../StudentFeatures/StudentProfile';
import { Button, Modal, Form, Input, Select, Space, Spin } from 'antd';
import { SendOutlined, DeleteOutlined } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Option } = Select;

const StudentDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { fullName } = useParams();
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen((prevState) => !prevState);
    };

    const styles = {
        container: {
            display: 'flex',
            height: '100vh',
            fontFamily: "'Roboto', sans-serif",
        },
        header: {
            position: 'fixed',
            top: 0,
            left: isSidebarOpen ? '250px' : '80px',
            width: `calc(100% - ${isSidebarOpen ? '250px' : '80px'})`,
            backgroundColor: '#2C3E50',
            color: '#FFFFFF',
            padding: '1rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            zIndex: 100,
            transition: 'left 0.3s ease, width 0.3s ease',
        },
        headerTitle: {
            fontSize: '1.5rem',
            margin: 0,
            flex: 1,
            textAlign: 'center',
        },
        main: {
            display: 'flex',
            flex: 1,
            marginTop: '64px',
        },
        sidebar: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: isSidebarOpen ? '250px' : '80px',
            height: '100vh',
            backgroundColor: '#34495e',
            transition: 'width 0.3s ease',
            zIndex: 99,
        },
        content: {
            flex: 1,
            marginLeft: isSidebarOpen ? '250px' : '80px',
            padding: '2rem',
            backgroundColor: '#EAF2F8',
            overflowY: 'auto',
            transition: 'margin-left 0.3s ease',
        },
    };

    // Handle Submit Form
    const handleSubmitComplaint = async (values) => {
        setLoading(true);
        try {
            // Make an API call to submit complaint data
            // Example API call - replace with actual API URL
            console.log('Form values:', values);
            toast.success("Complaint submitted successfully!");
            setModalVisible(false); // Close the modal on success
        } catch (error) {
            toast.error("Error submitting complaint.");
        }
        setLoading(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.sidebar}>
                <StudentSidebar isSidebarOpen={isSidebarOpen} />
            </div>

            <header style={styles.header}>
                <AccountMenu toggleSidebar={toggleSidebar} />
                <h1 style={styles.headerTitle}>Student Dashboard</h1>
                <div style={{ width: '48px' }} />
            </header>

            <div style={styles.main}>
                <div style={styles.content}>
                    <Routes>
                        <Route path="/" element={<Navigate to="home" />} />
                        <Route path="home" element={<StudentHome />} />
                        <Route path="complains" element={<SubmitComplaint />} />
                        <Route path="assignments" element={<StudentAssignments />} />
                        <Route path="timetable" element={<StudentTimetable />} />
                        <Route path="profile" element={<StudentProfile fullName={fullName} />} />
                        <Route path="logout" element={<Logout />} />
                    </Routes>
                </div>
            </div>

            {/* Modal for Adding Complaint */}
            <Modal
                title="Submit a Complaint"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
                width={600}
            >
                <Form
                    onFinish={handleSubmitComplaint}
                    layout="vertical"
                    style={{
                        backgroundColor: '#FFFFFF',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Form.Item
                        label="Complaint Description"
                        name="description"
                        rules={[{ required: true, message: 'Please provide a complaint description!' }]}
                    >
                        <Input.TextArea placeholder="Enter your complaint details here" />
                    </Form.Item>

                    <Form.Item label="Status" name="status" initialValue="pending">
                        <Select>
                            <Option value="pending">Pending</Option>
                            <Option value="resolved">Resolved</Option>
                            <Option value="in-progress">In Progress</Option>
                        </Select>
                    </Form.Item>

                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<SendOutlined />}
                            style={{
                                backgroundColor: '#3498DB',
                                borderColor: '#3498DB',
                            }}
                        >
                            Submit Complaint
                        </Button>

                        <Button
                            type="default"
                            onClick={() => setModalVisible(false)}
                            style={{
                                backgroundColor: '#E4E4E4',
                                borderColor: '#E4E4E4',
                            }}
                        >
                            Cancel
                        </Button>
                    </Space>
                </Form>
            </Modal>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default StudentDashboard;