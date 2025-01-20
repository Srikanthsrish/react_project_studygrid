import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home as HomeIcon,
  People as StudentsIcon,
  Person as TeachersIcon,
  Class as ClassesIcon,
  Book as SubjectsIcon,
  Notifications as NoticesIcon,
  Report as ComplainsIcon,
  AccountCircle as ProfileIcon,
} from "@mui/icons-material";

const AdminSidebar = ({ isSidebarOpen }) => {
  const links = [
    { path: "/admin/dashboard/home", icon: <HomeIcon />, label: "Home" },
    { path: "/admin/dashboard/students", icon: <StudentsIcon />, label: "Students" },
    { path: "/admin/dashboard/teachers", icon: <TeachersIcon />, label: "Teachers" },
    { path: "/admin/dashboard/subjects", icon: <SubjectsIcon />, label: "Subjects" },
    { path: "/admin/dashboard/classes", icon: <ClassesIcon />, label: "Classes" },
    { path: "/admin/dashboard/notices", icon: <NoticesIcon />, label: "Notices" },
    { path: "/admin/dashboard/complains", icon: <ComplainsIcon />, label: "Complains" },
    { path: "/admin/dashboard/profile", icon: <ProfileIcon />, label: "Profile" },
  ];

  const styles = {
    list: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      width: "100%",
    },
    listItem: {
      marginBottom: "1rem",
    },
    link: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      color: "#ecf0f1",
      padding: "0.75rem",
      borderRadius: "50%",
      transition: "background-color 0.3s ease",
    },
    label: {
      marginLeft: "1rem",
      display: isSidebarOpen ? "inline" : "none",
      transition: "opacity 0.3s ease",
    },
    activeLink: {
      backgroundColor: "#34495e",
    },
  };

  return (
    <ul style={styles.list}>
      {links.map((link) => (
        <li key={link.path} style={styles.listItem}>
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
  );
};

export default AdminSidebar;




