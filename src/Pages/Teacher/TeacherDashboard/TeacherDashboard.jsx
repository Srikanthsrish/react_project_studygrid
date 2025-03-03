import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TeacherSidebar from '../TeacherFeatures/TeacherSidebar';
import AccountMenu from '../TeacherFeatures/AccountMenu';
import Teacherhome from '../TeacherFeatures/Home';
import TeacherTimetable from '../TeacherFeatures/TeacherTimetable';
import TeacherAssignments from '../TeacherFeatures/TeacherAssignments';
import Complaints from '../TeacherFeatures/complains';
import TeacherProfile from '../TeacherFeatures/TeacherProfile';
import Logout from '../../../Components/Logout';
// import { Logout } from '@mui/icons-material';

const TeacherDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
            left: isSidebarOpen ? '250px' : '80px',  // Adjusting left based on sidebar state
            width: `calc(100% - ${isSidebarOpen ? '250px' : '80px'})`,  // Dynamically set header width
            backgroundColor: '#2c3e50',
            color: '#ecf0f1',
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
            marginTop: '64px', // To match the height of the header
        },
        sidebar: {
            position: 'fixed',
            top: 0,  // Keep sidebar on top
            left: 0,
            width: isSidebarOpen ? '250px' : '80px',
            height: '100vh',
            backgroundColor: '#34495e',
            transition: 'width 0.3s ease',
            zIndex: 99, // Sidebar should be below the header
        },
        content: {
            flex: 1,
            marginLeft: isSidebarOpen ? '250px' : '80px',  // Offset content based on sidebar width
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            overflowY: 'auto',
            transition: 'margin-left 0.3s ease',
        },
        responsiveSidebar: {
            '@media (max-width: 768px)': {
                position: 'absolute',
                zIndex: 101,
                width: isSidebarOpen ? '250px' : '0',
            },
        },
    };

    return (
        <div style={styles.container}>
            {/* Sidebar */}
            <div style={{ ...styles.sidebar, ...styles.responsiveSidebar }}>
                <TeacherSidebar isSidebarOpen={isSidebarOpen} />
            </div>

            {/* Header */}
            <header style={styles.header}>
                <AccountMenu toggleSidebar={toggleSidebar} />
                <h1 style={styles.headerTitle}>Teacher Dashboard</h1>
                <div style={{ width: '48px' }} /> {/* Placeholder for balance */}
            </header>

            {/* Main Content */}
            <div style={styles.main}>
                <div style={styles.content}>
                    <Routes>
                        {/* Redirect default route to "home" */}
                        <Route path="/" element={<Navigate to="home" />} />
                        <Route path="home" element={<Teacherhome />} />
                        <Route path="classes" element={<TeacherTimetable />} />
                        <Route path="assignments" element={<TeacherAssignments />} />
                        <Route path="complains" element={<Complaints />} />
                        <Route path="profile" element={<TeacherProfile />} />
                        <Route path="logout" element={<Logout />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
