import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../../firebase-config";
import { signInWithPopup } from "firebase/auth";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle Email/Password Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (email === "admin@example.com" && password === "admin123") {
      setError("");
      alert("Login Successful!");
      navigate("/admin/dashboard/");
    } else {
      setError("Invalid email or password.");
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google User:", result.user);
      alert("Google Sign-In Successful!");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      setError(
        "Failed to sign in with Google. Please ensure your Firebase configuration is correct."
      );
    }
  };

  // Styles
  const styles = {
    container: {
    //   maxWidth: "450px",
    //   minHeight: "100vh",
      width:"400px",
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
    paragraph: {
      fontSize: "14px",
      color: "#7F8C8D", // Neutral tone
      marginBottom: "20px",
      textAlign: "center",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      fontSize: "14px",
      color: "#2C3E50", // Primary Color
      marginBottom: "5px",
      display: "block",
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      padding: "12px",
      fontSize: "14px",
      border: "1px solid #BDC3C7", // Light gray border
      borderRadius: "4px",
      marginBottom: "5px",
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
    error: {
      color: "#E74C3C", // Error red color
      fontSize: "14px",
      marginBottom: "15px",
    },
    footer: {
      marginTop: "20px",
      textAlign: "center",
    },
    linkButton: {
      background: "none",
      border: "none",
      color: "#3498DB", // Secondary Color
      cursor: "pointer",
      textDecoration: "underline",
    },
  };

  return (
    <div style={{ backgroundColor: "#EAF2F8", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <div style={styles.container}>
        <h1 style={styles.header}>Admin Login</h1>
        <p style={styles.paragraph}>Welcome back! Please enter your details.</p>
        <form onSubmit={handleLogin}>
          {error && <p style={styles.error}>{error}</p>}
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email *
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password *
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Login
          </button>
        </form>
        <button
          onClick={handleGoogleSignIn}
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Sign in with Google
        </button>
        <div style={styles.footer}>
          <button
            style={styles.linkButton}
            onClick={() => navigate("/forgotPassword")}
          >
            Forgot password?
          </button>
          <p>
            Don't have an account?{" "}
            <button
              style={styles.linkButton}
              onClick={() => navigate("/admin/register")}
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

