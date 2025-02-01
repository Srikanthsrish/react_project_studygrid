// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Landing = () => {
//   const navigate = useNavigate(); // Hook to programmatically navigate

//   const handleLoginClick = () => {
//     navigate('/login'); // Navigate to Login page
//   };

//   const styles = {
//     landingContainer: {
//       display: 'flex',
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'center',
//       padding: '20px',
//       backgroundColor: '#EAF2F8',
//       minHeight: '100vh',
//     },
//     imageSection: {
//       flex: 1,
//       textAlign: 'center',
//     },
//     landingImage: {
//       maxWidth: '100%',
//       height: 'auto',
//       borderRadius: '8px',
//     },
//     introSection: {
//       flex: 1,
//       textAlign: 'left',
//       padding: '20px',
//     },
//     heading: {
//       color: '#2C3E50',
//       fontSize: '2.5rem',
//       marginBottom: '10px',
//     },
//     paragraph: {
//       color: '#2C3E50',
//       fontSize: '1.2rem',
//       marginBottom: '20px',
//     },
//     strongText: {
//       color: '#3498DB',
//     },
//     actionButtons: {
//       display: 'flex',
//       justifyContent: 'flex-start',
//     },
//     loginButton: {
//       backgroundColor: '#2C3E50',
//       color: '#FFFFFF',
//       border: 'none',
//       borderRadius: '5px',
//       padding: '10px 20px',
//       fontSize: '1rem',
//       cursor: 'pointer',
//       transition: 'background-color 0.3s ease',
//     },
//     loginButtonHover: {
//       backgroundColor: '#3498DB',
//     },
//   };

//   return (
//     <div style={styles.landingContainer}>
//       {/* Image Section */}
//       <div style={styles.imageSection}>
//         <img
//           src="https://miro.medium.com/v2/resize:fit:540/0*9jWHiWUCJD63ZMl7"
//           alt="landing page illustration"
//           style={styles.landingImage}
//         />
//       </div>

//       {/* Intro Section */}
//       <div style={styles.introSection}>
//         <h1 style={styles.heading}>Welcome to StudyGrid!</h1>
//         <p style={{ ...styles.paragraph, ...styles.strongText }}>
//           <strong>Empowering Education Through Technology</strong>
//         </p>
//         <p style={styles.paragraph}>
//           Our platform simplifies educational management for students, teachers, and administrators.
//           Whether you're tracking progress, managing schedules, or accessing resources, we've got you covered.
//         </p>

//         {/* Action Buttons */}
//         <div style={styles.actionButtons}>
//           <button
//             style={styles.loginButton}
//             onMouseEnter={(e) => (e.target.style.backgroundColor = styles.loginButtonHover.backgroundColor)}
//             onMouseLeave={(e) => (e.target.style.backgroundColor = styles.loginButton.backgroundColor)}
//             onClick={handleLoginClick}
//           >
//             Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Landing;
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Button, Typography } from "antd";
// import { LoginOutlined } from "@ant-design/icons";

// const { Title, Paragraph } = Typography;

// const Landing = () => {
//   const navigate = useNavigate();

//   const handleLoginClick = () => {
//     navigate("/login");
//   };

//   return (
//     <div style={styles.landingContainer}>
//       {/* Image Section */}
//       <div style={styles.imageSection}>
//         <img
//           src="https://miro.medium.com/v2/resize:fit:540/0*9jWHiWUCJD63ZMl7"
//           alt="landing page illustration"
//           style={styles.landingImage}
//         />
//       </div>

//       {/* Intro Section */}
//       <div style={styles.introSection}>
//         <Title level={1} style={styles.heading}>
//           Welcome to <span style={styles.highlight}>StudyGrid!</span>
//         </Title>
//         <Paragraph style={styles.subHeading}>
//           <strong>Empowering Education Through Technology</strong>
//         </Paragraph>
//         <Paragraph style={styles.paragraph}>
//           Our platform simplifies educational management for students, teachers, and administrators.
//           Whether you're tracking progress, managing schedules, or accessing resources, we've got you covered.
//         </Paragraph>

//         {/* Action Buttons */}
//         <Button
//           type="primary"
//           size="large"
//           icon={<LoginOutlined />}
//           onClick={handleLoginClick}
//           style={styles.loginButton}
//         >
//           Login
//         </Button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   landingContainer: {
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "20px",
//     backgroundColor: "#EAF2F8",
//     minHeight: "100vh",
//     flexWrap: "wrap",
//   },
//   imageSection: {
//     flex: 1,
//     textAlign: "center",
//   },
//   landingImage: {
//     maxWidth: "100%",
//     height: "auto",
//     borderRadius: "8px",
//   },
//   introSection: {
//     flex: 1,
//     textAlign: "left",
//     padding: "20px",
//     maxWidth: "500px",
//   },
//   heading: {
//     color: "#2C3E50",
//   },
//   highlight: {
//     color: "#3498DB",
//   },
//   subHeading: {
//     color: "#3498DB",
//     fontSize: "18px",
//   },
//   paragraph: {
//     color: "#2C3E50",
//     fontSize: "16px",
//     marginBottom: "20px",
//   },
//   loginButton: {
//     backgroundColor: "#2C3E50",
//     borderColor: "#2C3E50",
//     borderRadius: "5px",
//     padding: "10px 20px",
//     fontSize: "16px",
//     transition: "all 0.3s ease",
//   },
// };

// export default Landing;
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Button, Typography, Row, Col } from "antd";
// import { LoginOutlined } from "@ant-design/icons";

// const { Title, Paragraph } = Typography;

// const Landing = () => {
//   const navigate = useNavigate();

//   const handleLoginClick = () => {
//     navigate("/login");
//   };

//   return (
//     <div style={styles.landingContainer}>
//       <Row gutter={[16, 16]} align="middle" justify="center">
//         {/* Image Section */}
//         <Col xs={24} md={12} style={styles.imageSection}>
//           <img
//             src="https://miro.medium.com/v2/resize:fit:540/0*9jWHiWUCJD63ZMl7"
//             alt="landing page illustration"
//             style={styles.landingImage}
//           />
//         </Col>

//         {/* Intro Section */}
//         <Col xs={24} md={12} style={styles.introSection}>
//           <Title level={1} style={styles.heading}>
//             Welcome to <span style={styles.highlight}>StudyGrid!</span>
//           </Title>
//           <Paragraph style={styles.subHeading}>
//             <strong>Empowering Education Through Technology</strong>
//           </Paragraph>
//           <Paragraph style={styles.paragraph}>
//             Our platform simplifies educational management for students,
//             teachers, and administrators. Whether you're tracking progress,
//             managing schedules, or accessing resources, we've got you covered.
//           </Paragraph>

//           {/* Action Button */}
//           <Button
//             type="primary"
//             size="large"
//             icon={<LoginOutlined />}
//             onClick={handleLoginClick}
//             style={styles.loginButton}
//           >
//             Login
//           </Button>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// const styles = {
//   landingContainer: {
//     padding: "20px",
//     backgroundColor: "#EAF2F8",
//     minHeight: "100vh",
//   },
//   imageSection: {
//     textAlign: "center",
//   },
//   landingImage: {
//     maxWidth: "100%",
//     height: "auto",
//     borderRadius: "8px",
//   },
//   introSection: {
//     textAlign: "left",
//     padding: "20px",
//   },
//   heading: {
//     color: "#2C3E50",
//   },
//   highlight: {
//     color: "#3498DB",
//   },
//   subHeading: {
//     color: "#3498DB",
//     fontSize: "18px",
//   },
//   paragraph: {
//     color: "#2C3E50",
//     fontSize: "16px",
//     marginBottom: "20px",
//   },
//   loginButton: {
//     backgroundColor: "#2C3E50",
//     borderColor: "#2C3E50",
//     borderRadius: "5px",
//     padding: "10px 20px",
//     fontSize: "16px",
//     transition: "all 0.3s ease",
//   },
// };

// export default Landing;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, Typography } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Landing = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div style={styles.landingContainer}>
      <Row gutter={[16, 16]} align="middle" justify="center">
        {/* Image Section */}
        <Col xs={24} md={12} style={styles.imageSection}>
          <img
            src="https://miro.medium.com/v2/resize:fit:540/0*9jWHiWUCJD63ZMl7"
            alt="landing page illustration"
            style={styles.landingImage}
          />
        </Col>

        {/* Intro Section */}
        <Col xs={24} md={12} style={styles.introSection}>
          <Title level={1} style={styles.heading}>
            Welcome to <span style={styles.highlight}>StudyGrid!</span>
          </Title>
          <Paragraph style={styles.subHeading}>
            <strong>Empowering Education Through Technology</strong>
          </Paragraph>
          <Paragraph style={styles.paragraph}>
            Our platform simplifies educational management for students,
            teachers, and administrators. Whether you're tracking progress,
            managing schedules, or accessing resources, we've got you covered.
          </Paragraph>

          {/* Action Button */}
          <Button
            type="primary"
            size="large"
            icon={<LoginOutlined />}
            onClick={handleLoginClick}
            style={styles.loginButton}
          >
            Login
          </Button>
        </Col>
      </Row>
    </div>
  );
};

const styles = {
  landingContainer: {
    padding: '20px',
    backgroundColor: '#EAF2F8',
    minHeight: '100vh',
  },
  imageSection: {
    textAlign: 'center',
  },
  landingImage: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  introSection: {
    textAlign: 'left',
    padding: '20px',
  },
  heading: {
    color: '#2C3E50',
  },
  highlight: {
    color: '#3498DB',
  },
  subHeading: {
    color: '#3498DB',
    fontSize: '18px',
  },
  paragraph: {
    color: '#2C3E50',
    fontSize: '16px',
    marginBottom: '20px',
  },
  loginButton: {
    backgroundColor: '#2C3E50',
    borderColor: '#2C3E50',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '16px',
    transition: 'all 0.3s ease',
  },
};

export default Landing;

