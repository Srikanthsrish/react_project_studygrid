import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
  Home as HomeIcon,
  Schedule as TimetableIcon,
  CheckCircle as AttendanceIcon,
  ReportProblem as ComplainsIcon,
  AccountCircle as ProfileIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';

const StudentSidebar = ({ isSidebarOpen }) => {
  const { fullName, class: className } = useParams(); // Destructure class from useParams

  const navLinks = [
    { path: `/student/dashboard/${fullName}/${className}/home`, icon: <HomeIcon />, name: 'Home' },
    { path: `/student/dashboard/${fullName}/${className}/timetable`, icon: <TimetableIcon />, name: 'Timetable' },
    { path: `/student/dashboard/${fullName}/${className}/assignments`, icon: <AttendanceIcon />, name: 'Assignments' },
    { path: `/student/dashboard/${fullName}/${className}/complaints`, icon: <ComplainsIcon />, name: 'Complains' },
    { path: `/student/dashboard/${fullName}/${className}/profile`, icon: <ProfileIcon />, name: 'Profile' },
    { path: `/student/dashboard/${fullName}/${className}/logout`, icon: <LogoutIcon />, name: 'Logout' },
  ];

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
      fontSize: '1rem',
    },
    linkText: {
      marginLeft: '1rem',
      display: isSidebarOpen ? 'inline' : 'none',
    },
    activeLink: {
      backgroundColor: '#2c3e50',
      borderRadius: '4px',
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
