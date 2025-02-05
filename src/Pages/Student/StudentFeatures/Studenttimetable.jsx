import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Table, Typography, Spin, Alert, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/reset.css";

const { Title } = Typography;

const StudentTimetable = () => {
  const { class: className } = useParams();
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTimetable = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://studygrid-backendmongo.onrender.com/timetable/${className}`);
      setTimetable(response.data);
      setError("");
      toast.success("Timetable loaded successfully!");
    } catch (err) {
      setError("Failed to load timetable.");
      toast.error("Error fetching timetable.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTimetable();
  }, [className]);

  const columns = [
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
      sorter: (a, b) => a.day.localeCompare(b.day),
    },
    {
      title: "Period",
      dataIndex: "period",
      key: "period",
      sorter: (a, b) => a.period - b.period,
    },
    {
      title: "Subject Details",
      dataIndex: "subject_details",
      key: "subject_details",
    },
  ];

  return (
    <div style={{ padding: "2rem", backgroundColor: "#EAF2F8", minHeight: "100vh" }}>
      <Title level={2} style={{ color: "#2C3E50", textAlign: "center" }}>
        Timetable for Class {className}
      </Title>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
        <Button type="primary" icon={<ReloadOutlined />} onClick={fetchTimetable}>
          Refresh Timetable
        </Button>
      </div>

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "auto" }} />
      ) : error ? (
        <Alert message={error} type="error" showIcon />
      ) : (
        <Table
          columns={columns}
          dataSource={timetable}
          rowKey="id"
          bordered
          pagination={{ pageSize: 5 }}
          style={{
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default StudentTimetable;
