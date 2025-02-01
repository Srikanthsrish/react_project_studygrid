import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, Spin, message } from "antd";

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalTeachers: 0,
    totalStudents: 0,
    totalClasses: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/stats");
        setStats(response.data);
      } catch (error) {
        message.error("Failed to load stats.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cardData = [
    {
      title: "Total Teachers",
      value: stats.totalTeachers,
      img: "/img3.png",
    },
    {
      title: "Total Students",
      value: stats.totalStudents,
      img: "/img1.png",
    },
    {
      title: "Total Classes",
      value: stats.totalClasses,
      img: "/img2.png",
    },
  ];

  return (
    <div style={{ padding: "20px", backgroundColor: "#EAF2F8", minHeight: "100vh" }}>
      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
      ) : (
        <Row gutter={[16, 16]} justify="center">
          {cardData.map((card, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                hoverable
                style={{ textAlign: "center", borderRadius: "10px" }}
                bodyStyle={{ padding: "20px" }}
              >
                <img
                  src={card.img}
                  alt={card.title}
                  style={{ width: "80px", height: "80px", marginBottom: "15px" }}
                />
                <h3 style={{ color: "#2C3E50" }}>{card.title}</h3>
                <p style={{ fontSize: "1.5rem", color: "#3498DB", fontWeight: "bold" }}>
                  {card.value}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default AdminHome;
