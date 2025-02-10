
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Typography, message, Spin } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";

const { Title, Paragraph } = Typography;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const onFinish = async (values) => {
    setLoading(true);
    message.loading("Logging in...");

    try {
      const response = await fetch("https://studygrid-backendmongo.onrender.com/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        message.success(`Welcome, ${data.admin_id}`);
        setTimeout(() => navigate(`/admin/dashboard/${data.admin_id}`), 1500);
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
        <Title level={2} style={styles.title}>
          Admin Login
        </Title>
        <Paragraph style={styles.subtitle}>
          Enter your credentials below.
        </Paragraph>

        <Form name="admin_login" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="admin_id"
            rules={[{ required: true, message: "Admin ID is required." }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Admin ID" />
          </Form.Item>

          <Form.Item
            name="emailid"
            rules={[
              { required: true, message: "Email is required." },
              { type: "email", message: "Invalid email format." },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Password is required." }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={styles.submitButton}
            >
              {loading ? <Spin /> : "Login"}
            </Button>
          </Form.Item>
        </Form>

        <Button
          type="link"
          onClick={() => message.info("Contact admin for password recovery.")}
          style={styles.forgotPassword}
        >
          Forgot Password?
        </Button>
      </Card>
    </div>
  );
};

// Styling
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
  submitButton: {
    marginTop: "20px",
  },
  forgotPassword: {
    display: "block",
    marginTop: "10px",
    textAlign: "center",
  },
};

export default AdminLogin;
