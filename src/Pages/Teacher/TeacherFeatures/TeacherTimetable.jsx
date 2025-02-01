
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Table, Card, Typography, Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Title } = Typography;

const TeacherTimetable = () => {
  const { teacherId } = useParams();
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (teacherId) {
      fetchTimetable(teacherId);
    }
  }, [teacherId]);

  const fetchTimetable = async (teacherId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/teachertimetable/${teacherId}`
      );
      setTimetable(response.data);
      setError(null);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("No records found for the given Teacher ID.");
        message.error("No records found for the given Teacher ID.");
      } else {
        setError("Failed to fetch data. Please try again.");
        message.error("Failed to fetch data. Please try again.");
      }
      setTimetable([]);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
    },
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "Period",
      dataIndex: "period",
      key: "period",
    },
    {
      title: "Subject Details",
      dataIndex: "subject_details",
      key: "subject_details",
    },
  ];

  return (
    <div style={{ padding: "20px", background: "#EAF2F8", minHeight: "100vh" }}>
      <Card
        style={{
          maxWidth: 800,
          margin: "auto",
          padding: 20,
          background: "#FFFFFF",
          border: "1px solid #2C3E50",
          borderRadius: 10,
        }}
      >
        <Title level={2} style={{ color: "#2C3E50", textAlign: "center" }}>
          Timetable for Teacher ID: {teacherId}
        </Title>
        {loading ? (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
        ) : error ? (
          <Title level={4} style={{ color: "red", textAlign: "center" }}>
            {error}
          </Title>
        ) : (
          <Table
            columns={columns}
            dataSource={timetable}
            rowKey="id"
            bordered
            pagination={{ pageSize: 5 }}
            style={{ marginTop: 20 }}
          />
        )}
      </Card>
    </div>
  );
};

export default TeacherTimetable;