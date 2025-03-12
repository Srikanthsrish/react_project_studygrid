

import React from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  Home as HomeIcon,
  People as StudentsIcon,
  Person as TeachersIcon,
  Class as ClassesIcon,
  Book as SubjectsIcon,
  Notifications as NoticesIcon,
  Report as ComplainsIcon,
  AccountCircle as ProfileIcon,
  ExitToApp as LogoutIcon,
} from "@mui/icons-material";

const AdminSidebar = ({ isSidebarOpen }) => {
  const { admin_id } = useParams();

  const links = [
    { path: `/admin/dashboard/${admin_id}/home`, icon: <HomeIcon />, label: "Home" },
    { path: `/admin/dashboard/${admin_id}/students`, icon: <StudentsIcon />, label: "Students" },
    { path: `/admin/dashboard/${admin_id}/teachers`, icon: <TeachersIcon />, label: "Teachers" },
    { path: `/admin/dashboard/${admin_id}/subjects`, icon: <SubjectsIcon />, label: "Subjects" },
    { path: `/admin/dashboard/${admin_id}/classes`, icon: <ClassesIcon />, label: "Classes" },
    { path: `/admin/dashboard/${admin_id}/announcement`, icon: <NoticesIcon />, label: "Announcement" },
    { path: `/admin/dashboard/${admin_id}/complains`, icon: <ComplainsIcon />, label: "Complains" },
    { path: `/admin/dashboard/${admin_id}/profile`, icon: <ProfileIcon />, label: "Profile" },
    { path: `/admin/dashboard/${admin_id}/logout`, icon: <LogoutIcon />, label: "Logout" },
  ];

  const styles = {
    sidebar: {
      width: isSidebarOpen ? "250px" : "80px",
      backgroundColor: "#34495e",
      transition: "width 0.3s ease",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      padding: "1rem 0",
      alignItems: "center",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "0.75rem 1rem",
      width: "100%",
    },
    logo: {
      width: "60px",
      height: "60px",
      borderRadius: "50px",
    },
    logoText: {
      marginLeft: "1rem",
      color: "#ecf0f1",
      fontSize: "1rem",
      display: isSidebarOpen ? "block" : "none",
    },
    list: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      width: "100%",
    },
    link: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      color: "#ecf0f1",
      padding: "0.75rem",
      borderRadius: "8px",
      transition: "background-color 0.3s ease",
      width: "100%",
    },
    label: {
      marginLeft: "1rem",
      display: isSidebarOpen ? "inline" : "none",
      transition: "opacity 0.3s ease",
    },
    activeLink: {
      backgroundColor: "#2c3e50",
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
      <ul style={styles.list}>
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              style={({ isActive }) =>
                isActive ? { ...styles.link, ...styles.activeLink } : styles.link
              }
            >
              {link.icon}
              <span style={styles.label}>{link.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;