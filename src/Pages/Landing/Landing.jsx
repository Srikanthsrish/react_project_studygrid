
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, Typography } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { Spin } from "antd";

const { Title, Paragraph } = Typography;

const Landing = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLoginClick = () => {
    setLoading(true); // Show loading icon
    setTimeout(() => {
      navigate('/role/login');
    }, 1000);
  };

  return (
    <div style={styles.landingContainer}>
      <Row gutter={[16, 16]} align="middle" justify="center" style={styles.rowStyle}>
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
            disabled={loading}
            style={styles.loginButton}
          >
            {loading ? <Spin size="small" /> : "Login"}
          </Button>
          
        </Col>

      </Row>
      

    </div>
  );
};

const styles = {
  landingContainer: {
    display: 'flex',
    alignItems: 'center', // Centers vertically
    justifyContent: 'center', // Centers horizontally
    height: '100vh', // Ensures full viewport height
    backgroundColor: '#EAF2F8',
    padding: '20px',
  },
  rowStyle: {
    width: '100%',
    maxWidth: '1200px', // Limits the content width for better design
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

