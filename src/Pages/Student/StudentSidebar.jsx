// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
//   Home as HomeIcon,
//   EventNote as TimetableIcon,
//   AssignmentTurnedIn as AttendanceIcon,
//   ReportProblem as ComplainsIcon,
//   AccountCircleOutlined as ProfileIcon,
//   ExitToApp as LogoutIcon,
// } from "@mui/icons-material";

// const StudentSidebar = () => {
//   const navLinks = [
//     { path: "/student/dashboard/home", icon: <HomeIcon />, name: "Home" },
//     { path: "/student/dashboard/timetable", icon: <TimetableIcon />, name: "Timetable" },
//     { path: "/student/dashboard/attendance", icon: <AttendanceIcon />, name: "Attendance" },
//     { path: "/student/dashboard/complains", icon: <ComplainsIcon />, name: "Complains" },
//     { path: "/student/dashboard/profile", icon: <ProfileIcon />, name: "Profile" },
//     { path: "/student/logout", icon: <LogoutIcon />, name: "Logout" },
//   ];

//   const styles = {
//     sidebar: {
//       width: "250px",
//       backgroundColor: "#2C3E50",
//       color: "#FFFFFF",
//       height: "100vh",
//       position: "fixed",
//       left: 0,
//       transition: "width 0.3s ease",
//     },
//     navList: {
//       listStyle: "none",
//       padding: 0,
//       margin: 0,
//     },
//     navItem: {
//       padding: "1rem",
//       borderBottom: "1px solid #34495e",
//       display: "flex",
//       alignItems: "center",
//     },
//     navLink: {
//       textDecoration: "none",
//       color: "#ecf0f1",
//       display: "flex",
//       alignItems: "center",
//       width: "100%",
//     },
//     navIcon: {
//       marginRight: "0.5rem",
//     },
//   };

//   return (
//     <div style={styles.sidebar}>
//       <ul style={styles.navList}>
//         {navLinks.map((link) => (
//           <li key={link.path} style={styles.navItem}>
//             <NavLink
//               to={link.path}
//               style={styles.navLink}
//               activeStyle={{ backgroundColor: "#1abc9c" }}
//             >
//               <span style={styles.navIcon}>{link.icon}</span>
//               {link.name}
//             </NavLink>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default StudentSidebar;

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
