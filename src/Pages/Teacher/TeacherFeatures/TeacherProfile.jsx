import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Spin, Typography, Descriptions } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Title } = Typography;

const TeacherProfile = () => {
  const { teacherId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/teacher/profile/${teacherId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch teacher profile");
        }
        return response.json();
      })
      .then((data) => {
        setProfile(data.profile);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [teacherId]);

  if (loading) {
    return <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />;
  }

  if (error) {
    return <Title level={3} style={{ color: "red", textAlign: "center" }}>Error: {error}</Title>;
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
      <Title level={2} style={{ color: "#2C3E50", textAlign: "center" }}>
        Teacher Profile
      </Title>
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

