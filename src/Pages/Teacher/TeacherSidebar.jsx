
// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { Home as HomeIcon, Class as ClassesIcon, Assessment as ReportsIcon, Assignment as AssignmentsIcon, AccountCircle as ProfileIcon, ExitToApp as LogoutIcon } from '@mui/icons-material';
// import { motion } from 'framer-motion';

// const navLinks = [
//   { path: '/teacher/dashboard/home', icon: <HomeIcon />, name: 'Home' },
//   { path: '/teacher/dashboard/classes', icon: <ClassesIcon />, name: 'Classes' },
//   { path: '/teacher/dashboard/reports', icon: <ReportsIcon />, name: 'Reports' },
//   { path: '/teacher/dashboard/assignments', icon: <AssignmentsIcon />, name: 'Assignments' },
//   { path: '/teacher/dashboard/profile', icon: <ProfileIcon />, name: 'Profile' },
//   { path: '/teacher/logout', icon: <LogoutIcon />, name: 'Logout' },
// ];

// const TeacherSidebar = ({ isSidebarOpen }) => {
//   const styles = {
//     sidebar: {
//       width: isSidebarOpen ? '250px' : '80px',
//       backgroundColor: '#34495e',
//       transition: 'width 0.3s ease',
//       height: '100vh',
//       overflow: 'hidden',
//     },
//     list: {
//       listStyle: 'none',
//       padding: 0,
//     },
//     listItem: {
//       display: 'flex',
//       alignItems: 'center',
//       padding: '10px 20px',
//       color: '#ecf0f1',
//       textDecoration: 'none',
//       transition: 'background-color 0.3s',
//     },
//     listItemIcon: {
//       marginRight: isSidebarOpen ? '10px' : '0',
//     },
//     listItemText: {
//       display: isSidebarOpen ? 'inline' : 'none',
//     },
//   };

//   return (
//     <motion.div
//       style={styles.sidebar}
//       initial={{ width: 0 }}
//       animate={{ width: isSidebarOpen ? '250px' : '80px' }}
//       transition={{ duration: 0.3 }}
//     >
//       <ul style={styles.list}>
//         {navLinks.map((link) => (
//           <motion.li key={link.path} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//             <NavLink
//               to={link.path}
//               style={styles.listItem}
//               activeStyle={{ backgroundColor: '#2c3e50' }}
//             >
//               <div style={styles.listItemIcon}>{link.icon}</div>
//               <span style={styles.listItemText}>{link.name}</span>
//             </NavLink>
//           </motion.li>
//         ))}
//       </ul>
//     </motion.div>
//   );
// };

// export default TeacherSidebar;
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home as HomeIcon,
  Class as ClassesIcon,
  Assignment as AssignmentsIcon,
  Assessment as ReportsIcon,
  AccountCircle as ProfileIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';

const navLinks = [
  { path: '/teacher/dashboard/home', icon: <HomeIcon />, name: 'Home' },
  { path: '/teacher/dashboard/classes', icon: <ClassesIcon />, name: 'Classes' },
  { path: '/teacher/dashboard/assignments', icon: <AssignmentsIcon />, name: 'Assignments' },
  { path: '/teacher/dashboard/reports', icon: <ReportsIcon />, name: 'Reports' },
  { path: '/teacher/dashboard/profile', icon: <ProfileIcon />, name: 'Profile' },
  { path: '/teacher/logout', icon: <LogoutIcon />, name: 'Logout' },
];

const TeacherSidebar = ({ isSidebarOpen }) => {
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




