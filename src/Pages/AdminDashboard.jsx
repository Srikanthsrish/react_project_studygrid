// import React, { useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import AdminSidebar from "../Components/Adminsidebar";
// import Home from "./Admin/Home";
// import Students from "./Admin/Students";
// import Teachers from "./Admin/Teachers";
// import Subjects from "./Admin/Subjects";
// import Classes from "./Admin/Classes";
// import Notices from "./Admin/Notices";
// import Complains from "./Admin/Complains";
// import Profile from "./Admin/Profile";
// import AccountMenu from "../Components/AccountMenu";

// const AdminDashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const styles = {
//     container: {
//       display: "flex",
//       flexDirection: "column",
//       height: "100vh",
//       fontFamily: "'Roboto', sans-serif",
//     },
//     header: {
//       position: "sticky",
//       top: 0,
//       width: "100%",
//       backgroundColor: "#2c3e50",
//       color: "#ecf0f1",
//       padding: "1rem 2rem",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//       zIndex: 10,
//     },
//     headerTitle: {
//       fontSize: "1.5rem",
//       margin: 0,
//       position: "absolute",
//       left: "50%",
//       transform: "translateX(-50%)",
//     },
//     main: {
//       display: "flex",
//       flex: 1,
//     },
//     sidebar: {
//       width: isSidebarOpen ? "250px" : "80px",
//       backgroundColor: "#34495e",
//       transition: "width 0.3s ease",
//       height: "100vh",
//     },
//     content: {
//       flex: 1,
//       padding: "2rem",
//       backgroundColor: "#f8f9fa",
//       overflowY: "auto",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <header style={styles.header}>
//         <h1 style={styles.headerTitle}>Admin Dashboard</h1>
//         <AccountMenu toggleSidebar={toggleSidebar} />
//       </header>

//       <div style={styles.main}>
//         <div style={styles.sidebar}>
//           <AdminSidebar isSidebarOpen={isSidebarOpen} />
//         </div>
//         <div style={styles.content}>
//           <Routes>
//             {/* Redirect the base route to the "Home" route */}
//             <Route path="/" element={<Navigate to="home" />} />
//             <Route path="home" element={<Home />} />
//             <Route path="students" element={<Students />} />
//             <Route path="teachers" element={<Teachers />} />
//             <Route path="subjects" element={<Subjects />} />
//             <Route path="classes" element={<Classes />} />
//             <Route path="notices" element={<Notices />} />
//             <Route path="complains" element={<Complains />} />
//             <Route path="profile" element={<Profile />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminSidebar from "../Components/Adminsidebar";
import Home from "./Admin/Home";
import Students from "./Admin/Students";
import Teachers from "./Admin/Teachers";
import Subjects from "./Admin/Subjects";
import Classes from "./Admin/Classes";
import Notices from "./Admin/Notices";
import Complains from "./Admin/Complains";
import Profile from "./Admin/Profile";
import AccountMenu from "../Components/AccountMenu";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      fontFamily: "'Roboto', sans-serif",
    },
    header: {
      position: "fixed",
      top: 0,
      left: isSidebarOpen ? "250px" : "80px", // Adjust for the sidebar width
      width: `calc(100% - ${isSidebarOpen ? "250px" : "80px"})`, // Adjust for the sidebar width
      backgroundColor: "#2c3e50",
      color: "#ecf0f1",
      padding: "1rem 2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      zIndex: 100,
      transition: "left 0.3s ease, width 0.3s ease",
    },
    headerTitle: {
      fontSize: "1.5rem",
      margin: 0,
      flex: 1,
      textAlign: "center",
    },
    main: {
      display: "flex",
      flex: 1,
      marginTop: "64px", // To account for the fixed header height
    },
    sidebar: {
      position: "fixed",
      top: 0,
      left: 0,
      width: isSidebarOpen ? "250px" : "80px", // Adjust the sidebar width dynamically
      height: "100vh",
      backgroundColor: "#34495e",
      transition: "width 0.3s ease",
      zIndex: 99, // Ensures sidebar is below header
    },
    content: {
      flex: 1,
      marginLeft: isSidebarOpen ? "250px" : "80px", // Adjust content's left margin
      padding: "2rem",
      backgroundColor: "#f8f9fa",
      overflowY: "auto",
      transition: "margin-left 0.3s ease",
    },
    responsiveSidebar: {
      "@media (max-width: 768px)": {
        position: "absolute",
        zIndex: 101,
        width: isSidebarOpen ? "250px" : "0", // On smaller screens, collapse sidebar to 0 width
      },
    },
    responsiveHeader: {
      "@media (max-width: 768px)": {
        left: 0, // Full width header on mobile/tablet
        width: "100%",
      },
    },
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={{ ...styles.sidebar, ...styles.responsiveSidebar }}>
        <AdminSidebar isSidebarOpen={isSidebarOpen} />
      </div>

      {/* Header */}
      <header style={{ ...styles.header, ...styles.responsiveHeader }}>
      <AccountMenu toggleSidebar={toggleSidebar} />
        <h1 style={styles.headerTitle}>Admin Dashboard</h1>
        
      </header>

      {/* Main Content */}
      <div style={styles.main}>
        <div style={styles.content}>
          <Routes>
            {/* Redirect default route to "Home" */}
            <Route path="/" element={<Navigate to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="students" element={<Students />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="subjects" element={<Subjects />} />
            <Route path="classes" element={<Classes />} />
            <Route path="notices" element={<Notices />} />
            <Route path="complains" element={<Complains />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;






   



