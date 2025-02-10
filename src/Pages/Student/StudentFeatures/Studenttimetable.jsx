import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Table, Typography, Spin, Alert, Button, Grid } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/reset.css";

const { Title } = Typography;
const { useBreakpoint } = Grid;

const StudentTimetable = () => {
  const { class: className } = useParams();
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const screens = useBreakpoint();

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

  return (
    <div style={{ padding: "2rem", backgroundColor: "#EAF2F8", minHeight: "100vh" }}>
      <Title level={2} style={{ color: "#2C3E50", textAlign: "center" }}>
        Timetable for Class {className}
      </Title>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
      <Button 
  type="primary" 
  icon={<ReloadOutlined />} 
  onClick={fetchTimetable} 
  style={{ 
    backgroundColor: "#2C3E50", 
    color: "white", 
    border: "none", 
    fontWeight: "bold" 
  }}
>
  Refresh Timetable
</Button>

      </div>

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "auto" }} />
      ) : error ? (
        <Alert message={error} type="error" showIcon />
      ) : (
        <Table
          dataSource={timetable}
          rowKey="id"
          bordered
          pagination={{ pageSize: 5 }}
          scroll={{ x: screens.xs ? 600 : 'auto' }}
          style={{ backgroundColor: "#FFFFFF", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}
        >
          <Table.Column 
            title="Day" 
            dataIndex="day" 
            key="day" 
            sorter={(a, b) => a.day.localeCompare(b.day)}
            onHeaderCell={() => ({
              style: { backgroundColor: "#2C3E50", color: "white" },
            })}
          />
          <Table.Column 
            title="Period" 
            dataIndex="period" 
            key="period" 
            sorter={(a, b) => a.period - b.period}
            onHeaderCell={() => ({
              style: { backgroundColor: "#2C3E50", color: "white" },
            })}
          />
          <Table.Column 
            title="Subject Details" 
            dataIndex="subject_details" 
            key="subject_details"
            onHeaderCell={() => ({
              style: { backgroundColor: "#2C3E50", color: "white" },
            })}
          />
        </Table>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default StudentTimetable;

