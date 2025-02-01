// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AdminLogin = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     admin_id: "",
//     emailid: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [loginMessage, setLoginMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.admin_id.trim()) {
//       newErrors.admin_id = "Admin ID is required.";
//     }

//     if (!formData.emailid.trim()) {
//       newErrors.email = "Email is required.";
//     } else if (!/\S+@\S+\.\S+/.test(formData.emailid)) {
//       newErrors.email = "Invalid email format.";
//     }

//     if (!formData.password.trim()) {
//       newErrors.password = "Password is required.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       try {
//         const response = await fetch("http://localhost:5000/api/admin/login", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(formData),
//         });

//         const data = await response.json();

//         if (response.ok) {
//           setLoginMessage(`Login successful! Welcome, ${data.admin_id}`);
//           setTimeout(() => {
//             navigate(`/admin/dashboard/${formData.admin_id}`);
//           }, 2000);
//         } else {
//           setLoginMessage("Invalid credentials. Please try again.");
//         }
//       } catch (error) {
//         console.error("Error during login:", error);
//         setLoginMessage("Server error. Please try again later.");
//       }
//     }
//   };

//   const handleForgotPassword = () => {
//     alert("Forgot Password? Please contact the administrator.");
//   };

//   const styles = {
//     container: {
//       backgroundColor: "#EAF2F8",
//       minHeight: "100vh",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       fontFamily: "Arial, sans-serif",
//     },
//     formWrapper: {
//       backgroundColor: "#FFFFFF",
//       padding: "2rem",
//       borderRadius: "8px",
//       boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//       width: "400px",
//       textAlign: "center",
//     },
//     title: {
//       color: "#2C3E50",
//       fontSize: "1.8rem",
//       marginBottom: "0.5rem",
//     },
//     subtitle: {
//       color: "#7F8C8D",
//       marginBottom: "2rem",
//       fontSize: "1rem",
//     },
//     formGroup: {
//       marginBottom: "1.5rem",
//       textAlign: "left",
//     },
//     label: {
//       color: "#2C3E50",
//       display: "block",
//       marginBottom: "0.5rem",
//       fontWeight: "bold",
//     },
//     input: {
//       width: "100%",
//       padding: "0.75rem",
//       border: "1px solid #BDC3C7",
//       borderRadius: "4px",
//       fontSize: "1rem",
//       outline: "none",
//       transition: "border-color 0.2s",
//     },
//     errorMessage: {
//       color: "#E74C3C",
//       fontSize: "0.9rem",
//       marginTop: "0.5rem",
//     },
//     loginMessage: {
//       color: "#2ECC71",
//       fontSize: "1rem",
//       margin: "1rem 0",
//     },
//     loginErrorMessage: {
//       color: "#E74C3C",
//       fontSize: "1rem",
//       margin: "1rem 0",
//     },
//     forgotPassword: {
//       color: "#3498DB",
//       background: "none",
//       border: "none",
//       cursor: "pointer",
//       textDecoration: "underline",
//       fontSize: "0.9rem",
//       marginBottom: "1.5rem",
//     },
//     loginButton: {
//       backgroundColor: "#2C3E50",
//       color: "#FFFFFF",
//       padding: "0.75rem 1.5rem",
//       border: "none",
//       borderRadius: "4px",
//       fontSize: "1rem",
//       cursor: "pointer",
//       transition: "background-color 0.3s",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.formWrapper}>
//         <h1 style={styles.title}>Admin Login</h1>
//         <p style={styles.subtitle}>Welcome back! Please enter your details.</p>
//         <form onSubmit={handleSubmit}>
//           <div style={styles.formGroup}>
//             <label htmlFor="admin_id" style={styles.label}>
//               Admin ID *
//             </label>
//             <input
//               type="text"
//               id="admin_id"
//               name="admin_id"
//               placeholder="Enter your Admin ID"
//               value={formData.admin_id}
//               onChange={handleChange}
//               style={styles.input}
//             />
//             {errors.admin_id && (
//               <p style={styles.errorMessage}>{errors.admin_id}</p>
//             )}
//           </div>

//           <div style={styles.formGroup}>
//             <label htmlFor="email" style={styles.label}>
//               Email *
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="emailid"
//               placeholder="Enter your Email"
//               value={formData.emailid}
//               onChange={handleChange}
//               style={styles.input}
//             />
//             {errors.email && <p style={styles.errorMessage}>{errors.email}</p>}
//           </div>

//           <div style={styles.formGroup}>
//             <label htmlFor="password" style={styles.label}>
//               Password *
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Enter your Password"
//               value={formData.password}
//               onChange={handleChange}
//               style={styles.input}
//             />
//             {errors.password && (
//               <p style={styles.errorMessage}>{errors.password}</p>
//             )}
//           </div>

//           {loginMessage && (
//             <p
//               style={
//                 loginMessage.startsWith("Login successful")
//                   ? styles.loginMessage
//                   : styles.loginErrorMessage
//               }
//             >
//               {loginMessage}
//             </p>
//           )}

//           <button
//             type="submit"
//             style={styles.loginButton}
//             onMouseOver={(e) => (e.target.style.backgroundColor = "#1A252F")}
//             onMouseOut={(e) => (e.target.style.backgroundColor = "#2C3E50")}
//           >
//             Login
//           </button>
//         </form>
//         <button
//           type="button"
//           style={styles.forgotPassword}
//           onClick={handleForgotPassword}
//         >
//           Forgot Password?
//         </button>
//       </div>
//     </div>
//   );
// };
// export default AdminLogin;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Typography, message, Spin } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";

const { Title, Paragraph } = Typography;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    message.loading("Logging in...");

    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
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
        <Title level={2} style={styles.title}>Admin Login</Title>
        <Paragraph style={styles.subtitle}>Enter your credentials below.</Paragraph>
        
        <Form name="admin_login" onFinish={onFinish} layout="vertical">
          <Form.Item
            name="admin_id"
            rules={[{ required: true, message: "Admin ID is required." }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Admin ID" />
          </Form.Item>

          <Form.Item
            name="emailid"
            rules={[{ required: true, message: "Email is required." }, { type: "email", message: "Invalid email format." }]}
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
            <Button type="primary" htmlType="submit" block loading={loading}>
              {loading ? <Spin /> : "Login"}
            </Button>
          </Form.Item>
        </Form>
        
        <Button type="link" onClick={() => message.info("Contact admin for password recovery.")}>Forgot Password?</Button>
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

export default AdminLogin;