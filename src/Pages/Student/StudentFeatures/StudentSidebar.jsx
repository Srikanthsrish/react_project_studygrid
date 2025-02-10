
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
  const { fullName, class: className } = useParams();

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
      alignItems: 'center',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '0.75rem 1rem',
      width: '100%',
    },
    logo: {
      width: '60px', // Same as icon size
      height: '60px',
      borderRadius: '50px', // Rounded image
    },
    logoText: {
      marginLeft: '1rem',
      color: '#ecf0f1',
      fontSize: '1rem', // Same as nav link text
      display: isSidebarOpen ? 'block' : 'none',
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.75rem 1rem',
      color: '#ecf0f1',
      textDecoration: 'none',
      transition: 'background-color 0.3s ease',
      fontSize: '1rem',
      width: '100%',
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
      {/* Sidebar Logo with Text */}
      <div style={styles.logoContainer}>
        <img src="/studygrid9.png" alt="App Logo" style={styles.logo} />
        <span style={styles.logoText}>Study Grid</span>
      </div>

      {/* Navigation Links */}
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
