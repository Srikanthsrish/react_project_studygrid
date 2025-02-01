import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
  Home as HomeIcon,
  Class as ClassesIcon,
  Assignment as AssignmentsIcon,
  Assessment as ReportsIcon,
  AccountCircle as ProfileIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';

const TeacherSidebar = ({ isSidebarOpen }) => {
  const { teacherId } = useParams(); // Correctly use useParams to access teacherId

  const navLinks = [
    { path: `/teacher/dashboard/${teacherId}/home`, icon: <HomeIcon />, name: 'Home' },
    { path: `/teacher/dashboard/${teacherId}/classes`, icon: <ClassesIcon />, name: 'Classes' },
    { path: `/teacher/dashboard/${teacherId}/assignments`, icon: <AssignmentsIcon />, name: 'Assignments' },
    { path: `/teacher/dashboard/${teacherId}/complains`, icon: <ReportsIcon />, name: 'complains' },
    { path: `/teacher/dashboard/${teacherId}/profile`, icon: <ProfileIcon />, name: 'Profile' },
    { path: `/teacher/dashboard/${teacherId}/logout`, icon: <LogoutIcon />, name: 'Logout' },
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

export default TeacherSidebar;





