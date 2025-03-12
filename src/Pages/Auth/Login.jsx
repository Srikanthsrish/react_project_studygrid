
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Typography, Spin, message } from "antd";
import { FaGraduationCap, FaChalkboardTeacher, FaUserShield } from "react-icons/fa";

const { Title, Paragraph } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);

  const handleLoginClick = (role) => {
    setLoading(role);
    message.loading({ content: "Redirecting...", duration: 1 });

    setTimeout(() => {
      navigate(`/${role}/Login`);
      setLoading(null);
    }, 1200);
  };

  const handleGuestLogin = (role) => {
    setLoading(`guest-${role}`);
    message.loading({ content: "Redirecting...", duration: 1 });
    setTimeout(() => {
      const guestPath = role === "student" ? "/student/dashboard/guest/guest" : `/${role}/dashboard/guest`;
      navigate(guestPath);
      setLoading(null);
    }, 1200);
  };

  return (
    <div style={styles.loginContainer}>
      <Title level={2} style={styles.heading}>Choose Your Role</Title>

      <div style={styles.cardContainer}>
        {/* Admin Card */}
        <Card hoverable style={styles.card}>
          {loading === "admin" ? <Spin size="large" /> : <FaUserShield size={50} style={styles.iconStyle} />}
          <Title level={3} style={styles.title}>Admin</Title>
          <Paragraph>Login as an administrator to manage the platform.</Paragraph>
          <div style={styles.buttonContainer}>
            <Button type="primary" style={styles.button} onClick={() => handleLoginClick("admin")} disabled={loading}>
              Login
            </Button>
            <Button type="primary" style={{ ...styles.button }} 
              onClick={() => handleGuestLogin("admin")} disabled={loading}>
              Guest Login
            </Button>
          </div>
        </Card>

        {/* Student Card */}
        <Card hoverable style={styles.card}>
          {loading === "student" ? <Spin size="large" /> : <FaGraduationCap size={50} style={styles.iconStyle} />}
          <Title level={3} style={styles.title}>Student</Title>
          <Paragraph>Access courses, assignments, and progress tracking.</Paragraph>
          <div style={styles.buttonContainer}>
            <Button type="primary" style={styles.button} onClick={() => handleLoginClick("student")} disabled={loading}>
              Login
            </Button>
            <Button type="primary" style={styles.button} onClick={() => handleGuestLogin("student")} disabled={loading}>
              Guest Login
            </Button>
          </div>
        </Card>

        {/* Teacher Card */}
        <Card hoverable style={styles.card}>
          {loading === "teacher" ? <Spin size="large" /> : <FaChalkboardTeacher size={50} style={styles.iconStyle} />}
          <Title level={3} style={styles.title}>Teacher</Title>
          <Paragraph>Manage students, assignments, and courses.</Paragraph>
          <div style={styles.buttonContainer}>
            <Button type="primary" style={styles.button} onClick={() => handleLoginClick("teacher")} disabled={loading}>
              Login
            </Button>
            <Button type="primary" style={styles.button} onClick={() => handleGuestLogin("teacher")} disabled={loading}>
              Guest Login
            </Button>
          </div>
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
    minHeight: "100vh",
    width: "100%",
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
    width: "300px",
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
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "10px",
  },
  button: {
    width: "150px",
    textAlign: "center",
  },
};

export default Login;
