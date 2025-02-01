// import React from 'react';
// import { FaGraduationCap, FaChalkboardTeacher, FaUserShield } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();

//   const handleLoginClick = (role) => {
//     navigate(`/${role}/Login`); // Navigate based on the role
//   };

//   const styles = {
//     loginContainer: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: '100vh',
//       backgroundColor: '#EAF2F8', // Light blue background
//       color: '#2C3E50', // Dark blue text
//       padding: '20px',
//       textAlign: 'center',
//       flexWrap: 'wrap',
//     },
//     buttonWithContent: {
//       backgroundColor: 'white',
//       border: '1px solid #BDC3C7', // Light gray border
//       padding: '20px',
//       width: '280px', // Uniform width
//       height: '250px', // Uniform height
//       margin: '20px',
//       borderRadius: '8px',
//       boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//       textAlign: 'center',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     buttonWithContentHover: {
//       backgroundColor: '#3498DB', // Light blue hover effect
//       color: 'white', // Text color on hover
//       transform: 'translateY(-5px)',
//     },
//     buttonHeading: {
//       fontSize: '20px',
//       color: '#2C3E50', // Dark blue
//       fontWeight: 'bold',
//       marginTop: '10px',
//     },
//     buttonDescription: {
//       fontSize: '14px',
//       color: '#2C3E50', // Dark blue
//       margin: '5px 0',
//     },
//     iconStyle: {
//       color: '#3498DB', // Light blue for icons
//       marginBottom: '15px',
//       transition: 'color 0.3s ease',
//     },
//   };

//   return (
//     <div style={styles.loginContainer}>
//       {/* Admin Login Button */}
//       <button
//         style={styles.buttonWithContent}
//         onClick={() => handleLoginClick('admin')}
//         onMouseEnter={(e) => {
//           e.target.style.backgroundColor = styles.buttonWithContentHover.backgroundColor;
//           e.target.style.color = styles.buttonWithContentHover.color;
//         }}
//         onMouseLeave={(e) => {
//           e.target.style.backgroundColor = '';
//           e.target.style.color = '';
//         }}
//       >
//         <FaUserShield size={50} style={styles.iconStyle} />
//         <h2 style={styles.buttonHeading}>Admin</h2>
//         <p style={styles.buttonDescription}>Login as an administrator to manage app data.</p>
//       </button>

//       {/* Student Login Button */}
//       <button
//         style={styles.buttonWithContent}
//         onClick={() => handleLoginClick('student')}
//         onMouseEnter={(e) => {
//           e.target.style.backgroundColor = styles.buttonWithContentHover.backgroundColor;
//           e.target.style.color = styles.buttonWithContentHover.color;
//         }}
//         onMouseLeave={(e) => {
//           e.target.style.backgroundColor = '';
//           e.target.style.color = '';
//         }}
//       >
//         <FaGraduationCap size={50} style={styles.iconStyle} />
//         <h2 style={styles.buttonHeading}>Student</h2>
//         <p style={styles.buttonDescription}>Login as a student to explore course materials and assignments.</p>
//       </button>

//       {/* Teacher Login Button */}
//       <button
//         style={styles.buttonWithContent}
//         onClick={() => handleLoginClick('teacher')}
//         onMouseEnter={(e) => {
//           e.target.style.backgroundColor = styles.buttonWithContentHover.backgroundColor;
//           e.target.style.color = styles.buttonWithContentHover.color;
//         }}
//         onMouseLeave={(e) => {
//           e.target.style.backgroundColor = '';
//           e.target.style.color = '';
//         }}
//       >
//         <FaChalkboardTeacher size={50} style={styles.iconStyle} />
//         <h2 style={styles.buttonHeading}>Teacher</h2>
//         <p style={styles.buttonDescription}>Login as a teacher to manage courses and assignments.</p>
//       </button>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Typography, Spin, message } from "antd";
import { FaGraduationCap, FaChalkboardTeacher, FaUserShield } from "react-icons/fa";

const { Title, Paragraph } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLoginClick = (role) => {
    setLoading(true);
    message.loading({ content: "Redirecting...", duration: 1 });

    setTimeout(() => {
      navigate(`/${role}/Login`);
      setLoading(false);
    }, 1200);
  };

  return (
    <div style={styles.loginContainer}>
      <Title level={2} style={styles.heading}>Choose Your Role</Title>

      <div style={styles.cardContainer}>
        {/* Admin Card */}
        <Card
          hoverable
          style={styles.card}
          onClick={() => handleLoginClick("admin")}
        >
          {loading ? <Spin size="large" /> : <FaUserShield size={50} style={styles.iconStyle} />}
          <Title level={3} style={styles.title}>Admin</Title>
          <Paragraph>Login as an administrator to manage the platform.</Paragraph>
          <Button type="primary" block>Login</Button>
        </Card>

        {/* Student Card */}
        <Card
          hoverable
          style={styles.card}
          onClick={() => handleLoginClick("student")}
        >
          {loading ? <Spin size="large" /> : <FaGraduationCap size={50} style={styles.iconStyle} />}
          <Title level={3} style={styles.title}>Student</Title>
          <Paragraph>Access courses, assignments, and progress tracking.</Paragraph>
          <Button type="primary" block>Login</Button>
        </Card>

        {/* Teacher Card */}
        <Card
          hoverable
          style={styles.card}
          onClick={() => handleLoginClick("teacher")}
        >
          {loading ? <Spin size="large" /> : <FaChalkboardTeacher size={50} style={styles.iconStyle} />}
          <Title level={3} style={styles.title}>Teacher</Title>
          <Paragraph>Manage students, assignments, and courses.</Paragraph>
          <Button type="primary" block>Login</Button>
        </Card>
      </div>
    </div>
  );
};

const styles = {
  loginContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#EAF2F8",
    padding: "20px",
    textAlign: "center",
  },
  heading: {
    color: "#2C3E50",
    marginBottom: "20px",
  },
  cardContainer: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    width: "280px",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    cursor: "pointer",
  },
  iconStyle: {
    color: "#3498DB",
    marginBottom: "15px",
  },
  title: {
    color: "#2C3E50",
  },
};

export default Login;
