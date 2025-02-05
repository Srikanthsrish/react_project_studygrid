import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Table, Typography, Spin, Alert, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/reset.css";

const { Title } = Typography;

const StudentAssignments = () => {
  const { class: className } = useParams(); // Get the class name from the URL
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAssignments = () => {
    if (!className) {
      setError("Class name is required.");
      return;
    }

    setLoading(true);
    axios
      .get(`https://studygrid-backendmongo.onrender.com/students/assignments/${className}`)
      .then((response) => {
        setAssignments(response.data);
        setError(null);
        toast.success("Assignments loaded successfully!");
      })
      .catch((error) => {
        setError("Error fetching assignments.");
        console.error("Error fetching assignments:", error);
        toast.error("Failed to load assignments.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAssignments();
  }, [className]); // Fetch new data when className changes

  // Table Columns Definition
  const columns = [
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      sorter: (a, b) => a.subject.localeCompare(b.subject),
    },
    {
      title: "Teacher ID",
      dataIndex: "teacherId",
      key: "teacherId",
      sorter: (a, b) => a.teacherId - b.teacherId,
    },
    {
      title: "Assignment",
      dataIndex: "assignment",
      key: "assignment",
      ellipsis: true,
    },
  ];

  return (
    <div style={{ padding: "2rem", backgroundColor: "#EAF2F8", minHeight: "100vh" }}>
      <Title level={2} style={{ color: "#2C3E50", textAlign: "center" }}>
        Assignments for {className}
      </Title>

      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: "1rem" }} />}

      <Button
        type="primary"
        icon={<ReloadOutlined />}
        onClick={fetchAssignments}
        style={{
          backgroundColor: "#3498DB",
          borderColor: "#3498DB",
          marginBottom: "1rem",
        }}
      >
        Refresh
      </Button>

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "auto" }} />
      ) : (
        <Table
          columns={columns}
          dataSource={assignments}
          rowKey="assignment"
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

export default StudentAssignments;


