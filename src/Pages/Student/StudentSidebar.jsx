import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home as HomeIcon,
  Schedule as TimetableIcon,
  CheckCircle as AttendanceIcon,
  ReportProblem as ComplainsIcon,
  AccountCircle as ProfileIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';

const navLinks = [
  { path: '/student/dashboard/home', icon: <HomeIcon />, name: 'Home' },
  { path: '/student/dashboard/timetable', icon: <TimetableIcon />, name: 'Timetable' },
  { path: '/student/dashboard/attendance', icon: <AttendanceIcon />, name: 'Attendance' },
  { path: '/student/dashboard/complains', icon: <ComplainsIcon />, name: 'Complains' },
  { path: '/student/dashboard/profile', icon: <ProfileIcon />, name: 'Profile' },
  { path: '/student/logout', icon: <LogoutIcon />, name: 'Logout' },
];

const StudentSidebar = ({ isSidebarOpen }) => {
  const styles = {
    sidebar: {
      width: isSidebarOpen ? '250px' : '80px',
      backgroundColor: '#34495e',
      transition: 'width 0.3s ease',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '1rem 0',
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.75rem 1rem',
      color: '#ecf0f1',
      textDecoration: 'none',
      transition: 'background-color 0.3s ease',
    },
    linkText: {
      marginLeft: '1rem',
      display: isSidebarOpen ? 'inline' : 'none',
    },
    activeLink: {
      backgroundColor: '#2c3e50',
    },
  };

  return (
    <div style={styles.sidebar}>
      {navLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          style={({ isActive }) =>
            isActive ? { ...styles.link, ...styles.activeLink } : styles.link
          }
        >
          {link.icon}
          <span style={styles.linkText}>{link.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default StudentSidebar;
