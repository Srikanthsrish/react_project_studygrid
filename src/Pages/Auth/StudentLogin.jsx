import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Typography, message, Spin } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";

const { Title, Paragraph } = Typography;

const StudentLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    message.loading("Logging in...");

    try {
      const response = await fetch("https://studygrid-backendmongo.onrender.com/api/student/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (response.ok) {
        message.success(`Login successful! Welcome, ${data.fullName}`);
        setTimeout(() => {
          navigate(`/student/dashboard/${encodeURIComponent(values.fullName)}/${values.class}`);
        }, 1500);
      } else {
        message.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      message.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Title level={2} style={styles.title}>Student Login</Title>
        <Paragraph style={styles.subtitle}>Enter your credentials below.</Paragraph>
        
        <Form name="student_login" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="fullName"
            rules={[{ required: true, message: "Full Name is required." }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Full Name" />
          </Form.Item>

          <Form.Item
            name="class"
            rules={[{ required: true, message: "Class is required." }]}
          >
            <Input placeholder="Class" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Password is required." }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {loading ? <Spin /> : "Login"}
            </Button>
          </Form.Item>
        </Form>

        <Button type="link" onClick={() => message.info("Contact admin for password recovery.")}>
          Forgot Password?
        </Button>
      </Card>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#EAF2F8",
    padding: "20px",
  },
  card: {
    width: 400,
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    color: "#2C3E50",
    textAlign: "center",
  },
  subtitle: {
    color: "#7F8C8D",
    textAlign: "center",
    marginBottom: "20px",
  },
};

export default StudentLogin;



