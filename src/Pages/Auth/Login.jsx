
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
