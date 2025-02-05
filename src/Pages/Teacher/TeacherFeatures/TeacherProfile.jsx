

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Spin, Typography, Descriptions, Button } from "antd";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";

const { Title } = Typography;

const TeacherProfile = () => {
  const { teacherId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://studygrid-backendmongo.onrender.com/api/teacher/profile/${teacherId}`);
      setProfile(response.data.profile);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch teacher profile");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (teacherId) fetchProfile();
  }, [teacherId]);

  if (loading) {
    return <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", color: "red" }}>
        <Title level={3}>{error}</Title>
        <Button type="primary" icon={<ReloadOutlined />} onClick={fetchProfile}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <Card
      style={{
        maxWidth: 600,
        margin: "auto",
        padding: 20,
        background: "#EAF2F8",
        border: "1px solid #2C3E50",
        borderRadius: 10,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Title level={2} style={{ color: "#2C3E50", textAlign: "center" }}>Teacher Profile</Title>

      {profile && (
        <Descriptions bordered column={1} size="middle" style={{ marginTop: 20 }}>
          <Descriptions.Item label="Teacher ID" labelStyle={{ fontWeight: "bold", color: "#2C3E50" }}>
            {profile.teacherId}
          </Descriptions.Item>
          <Descriptions.Item label="Name" labelStyle={{ fontWeight: "bold", color: "#2C3E50" }}>
            {profile.name}
          </Descriptions.Item>
          <Descriptions.Item label="Email" labelStyle={{ fontWeight: "bold", color: "#2C3E50" }}>
            {profile.email}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Card>
  );
};

export default TeacherProfile;
