import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rollNumber: "",
    name: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = "Roll Number is required.";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Student Login Data: ", formData);
      navigate("/student/dashboard");
      setFormData({
        rollNumber: "",
        name: "",
        password: "",
      });
    }
  };

  const handleForgotPassword = () => {
    alert(
      "Forgot Password? Please contact your administrator or check your email for instructions."
    );
  };

  const styles = {
    container: {
      backgroundColor: "#EAF2F8",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial, sans-serif",
    },
    formWrapper: {
      backgroundColor: "#FFFFFF",
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      width: "400px",
      textAlign: "center",
    },
    title: {
      color: "#2C3E50",
      fontSize: "1.8rem",
      marginBottom: "0.5rem",
    },
    subtitle: {
      color: "#7F8C8D",
      marginBottom: "2rem",
      fontSize: "1rem",
    },
    formGroup: {
      marginBottom: "1.5rem",
      textAlign: "left",
    },
    label: {
      color: "#2C3E50",
      display: "block",
      marginBottom: "0.5rem",
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #BDC3C7",
      borderRadius: "4px",
      fontSize: "1rem",
      outline: "none",
      transition: "border-color 0.2s",
    },
    inputFocus: {
      borderColor: "#3498DB",
    },
    errorMessage: {
      color: "#E74C3C",
      fontSize: "0.9rem",
      marginTop: "0.5rem",
    },
    formOptions: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "0.9rem",
      marginBottom: "1.5rem",
    },
    forgotPassword: {
      color: "#3498DB",
      background: "none",
      border: "none",
      cursor: "pointer",
      textDecoration: "underline",
    },
    loginButton: {
      backgroundColor: "#2C3E50",
      color: "#FFFFFF",
      padding: "0.75rem 1.5rem",
      border: "none",
      borderRadius: "4px",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    loginButtonHover: {
      backgroundColor: "#1A252F",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h1 style={styles.title}>Student Login</h1>
        <p style={styles.subtitle}>Welcome back! Please enter your details.</p>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="rollNumber" style={styles.label}>
              Roll Number *
            </label>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              placeholder="Enter your Roll Number"
              value={formData.rollNumber}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.rollNumber && (
              <p style={styles.errorMessage}>{errors.rollNumber}</p>
            )}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your Name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.name && <p style={styles.errorMessage}>{errors.name}</p>}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.password && (
              <p style={styles.errorMessage}>{errors.password}</p>
            )}
          </div>

          <div style={styles.formOptions}>
            <label>
              <input type="checkbox" name="rememberMe" /> Remember me
            </label>
            <button
              type="button"
              style={styles.forgotPassword}
              onClick={handleForgotPassword}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            style={styles.loginButton}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1A252F")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#2C3E50")}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;


