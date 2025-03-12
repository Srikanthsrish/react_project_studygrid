

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Spin, Typography, Descriptions, Button,Grid } from "antd";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Title } = Typography;
const { useBreakpoint } = Grid;
const StudentProfile = () => {
  const { fullName } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const screens = useBreakpoint();
  const fetchProfileData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://studygrid-backendmongo.onrender.com/students/profile/${encodeURIComponent(fullName)}`
      );
      setProfileData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch student profile");
      toast.error("Unable to load profile. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fullName) fetchProfileData();
  }, [fullName]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
          color: "red",
        }}
      >
        <Title level={3}>{error}</Title>
        <Button type="primary" icon={<ReloadOutlined />} onClick={fetchProfileData}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <Card
      style={{
        maxWidth: screens.xs ? "95%" : 600, // ✅ Full width on mobile, 600px on laptop
        margin: "auto",
        padding: screens.xs ? 10 : 20, // ✅ Adjust padding based on screen size
        background: "#EAF2F8",
        border: "1px solid #2C3E50",
        borderRadius: 10,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        overflowX: screens.xs ? "auto" : "hidden", // ✅ Scroll only on mobile view
      }}
    >
      <Title level={screens.xs ? 3 : 2} style={{ color: "#2C3E50", textAlign: "center" }}>
        Student Profile
      </Title>

      {profileData && (
        <div style={{ overflowX: screens.xs ? "scroll" : "hidden", whiteSpace: "nowrap" }}>
          <Descriptions
            bordered
            column={1} // ✅ Ensures 1-column layout for correct spacing
            size="middle"
            style={{ marginTop: 20 }}
          >
            {/* Student Name */}
            <Descriptions.Item
              label="Student Name"
              labelStyle={{ fontWeight: "bold", color: "#2C3E50" }}
            >
              {profileData.fullName}
            </Descriptions.Item>

            {/* Class */}
            <Descriptions.Item
              label="Class"
              labelStyle={{ fontWeight: "bold", color: "#2C3E50" }}
            >
              {profileData.class || "N/A"}
            </Descriptions.Item>

            {/* Email */}
            <Descriptions.Item
              label="Email"
              labelStyle={{ fontWeight: "bold", color: "#2C3E50" }}
            >
              {profileData.email || "N/A"}
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}

      <ToastContainer />
    </Card>

  );
};

export default StudentProfile;
