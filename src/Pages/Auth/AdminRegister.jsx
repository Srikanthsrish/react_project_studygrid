import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setSuccessMessage("Registration successful! Redirecting to login...");
      console.log("Registered Data: ", formData);

      // Reset form fields
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Delay navigation to login page for user to see the success message
      setTimeout(() => {
        navigate("/adminLogin"); // Navigate to login page
      }, 2000);
    }
  };

  return (
    <div style={{ backgroundColor: "#EAF2F8", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={styles.container}>
        <h1 style={styles.header}>Admin Registration</h1>
        {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.name && <p style={styles.errorMessage}>{errors.name}</p>}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.email && <p style={styles.errorMessage}>{errors.email}</p>}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.password && <p style={styles.errorMessage}>{errors.password}</p>}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>
              Confirm Password *
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.confirmPassword && (
              <p style={styles.errorMessage}>{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "400px",
    margin: "50px auto",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#FFFFFF", // White background for the form
    fontFamily: "'Roboto', sans-serif",
  },
  header: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#2C3E50", // Primary Color
    textAlign: "center",
  },
  successMessage: {
    color: "#27AE60", // Green for success
    fontSize: "16px",
    textAlign: "center",
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    fontSize: "14px",
    color: "#2C3E50", // Dark Blue color
    marginBottom: "8px",
  },
  input: {
    padding: "12px",
    fontSize: "14px",
    border: "1px solid #BDC3C7", // Light gray border
    borderRadius: "4px",
    width: "100%",
  },
  button: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#2C3E50", // Secondary Color
    color: "#FFFFFF", // White text
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#1A252F", // Dark Blue hover effect
  },
  errorMessage: {
    color: "#E74C3C", // Red for error messages
    fontSize: "12px",
    marginTop: "5px",
  },
};

export default AdminRegister;

