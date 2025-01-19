import React from 'react';
import { FaGraduationCap, FaChalkboardTeacher, FaUserShield } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLoginClick = (role) => {
    navigate(`/${role}/Login`); // Navigate based on the role
  };

  const styles = {
    loginContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#EAF2F8', // Light blue background
      color: '#2C3E50', // Dark blue text
      padding: '20px',
      textAlign: 'center',
      flexWrap: 'wrap',
    },
    buttonWithContent: {
      backgroundColor: 'white',
      border: '1px solid #BDC3C7', // Light gray border
      padding: '20px',
      width: '280px', // Uniform width
      height: '250px', // Uniform height
      margin: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonWithContentHover: {
      backgroundColor: '#3498DB', // Light blue hover effect
      color: 'white', // Text color on hover
      transform: 'translateY(-5px)',
    },
    buttonHeading: {
      fontSize: '20px',
      color: '#2C3E50', // Dark blue
      fontWeight: 'bold',
      marginTop: '10px',
    },
    buttonDescription: {
      fontSize: '14px',
      color: '#2C3E50', // Dark blue
      margin: '5px 0',
    },
    iconStyle: {
      color: '#3498DB', // Light blue for icons
      marginBottom: '15px',
      transition: 'color 0.3s ease',
    },
  };

  return (
    <div style={styles.loginContainer}>
      {/* Admin Login Button */}
      <button
        style={styles.buttonWithContent}
        onClick={() => handleLoginClick('admin')}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = styles.buttonWithContentHover.backgroundColor;
          e.target.style.color = styles.buttonWithContentHover.color;
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '';
          e.target.style.color = '';
        }}
      >
        <FaUserShield size={50} style={styles.iconStyle} />
        <h2 style={styles.buttonHeading}>Admin</h2>
        <p style={styles.buttonDescription}>Login as an administrator to manage app data.</p>
      </button>

      {/* Student Login Button */}
      <button
        style={styles.buttonWithContent}
        onClick={() => handleLoginClick('student')}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = styles.buttonWithContentHover.backgroundColor;
          e.target.style.color = styles.buttonWithContentHover.color;
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '';
          e.target.style.color = '';
        }}
      >
        <FaGraduationCap size={50} style={styles.iconStyle} />
        <h2 style={styles.buttonHeading}>Student</h2>
        <p style={styles.buttonDescription}>Login as a student to explore course materials and assignments.</p>
      </button>

      {/* Teacher Login Button */}
      <button
        style={styles.buttonWithContent}
        onClick={() => handleLoginClick('teacher')}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = styles.buttonWithContentHover.backgroundColor;
          e.target.style.color = styles.buttonWithContentHover.color;
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '';
          e.target.style.color = '';
        }}
      >
        <FaChalkboardTeacher size={50} style={styles.iconStyle} />
        <h2 style={styles.buttonHeading}>Teacher</h2>
        <p style={styles.buttonDescription}>Login as a teacher to manage courses and assignments.</p>
      </button>
    </div>
  );
};

export default Login;
