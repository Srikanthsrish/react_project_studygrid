import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Table, Typography,Upload, Spin, Button, Grid } from "antd";
import {UploadOutlined } from "@ant-design/icons";
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/reset.css";

const { Title } = Typography;
const { useBreakpoint } = Grid; // Import Grid from Ant Design to handle breakpoints

const StudentAssignments = () => {
  const { class: className } = useParams(); // Get the class name from the URL
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const screens = useBreakpoint(); // Accessing screen breakpoints for responsiveness

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
   // ✅ Handle File Upload for Each Assignment
   const handleFileUpload = async (file, record) => {
    const formData = new FormData();
    formData.append("assignment_file", file); // ✅ Append the file
    formData.append("assignment_id", record.assignment_id); // ✅ Unique Assignment ID

    try {
      setUploading(true);
      const response = await axios.post(
        "http://localhost:5000/students/assignments",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("File Uploaded Successfully", response.data);
    } catch (error) {
      console.error("File Upload Failed", error);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [className]); // Fetch new data when className changes

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#EAF2F8",
        minHeight: "100vh",
        margin: screens.xs ? "1rem" : "2rem", // Adjust margin for smaller screens
      }}
    >
      <Title level={2} style={{ color: "#2C3E50",marginBottom:"20px" }}>
        Assignments for {className}
      </Title>

      

      

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "auto" }} />
      ) : (<div style={{ overflowX: "auto", overflow: "hidden" }}>
        <Table
          columns={[
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
            {
              title: "Upload File",
              key: "upload",
              render: (_, record) => (
                <Upload
                  beforeUpload={(file) => {
                    handleFileUpload(file, record);
                    return false; // Prevent auto upload
                  }}
                  showUploadList={false}
                >
                  <Button icon={<UploadOutlined />} loading={uploading}>
                    Upload
                  </Button>
                </Upload>
              ),
            },
          ]}
          dataSource={assignments}
          rowKey="assignment"
          bordered
          pagination={{ pageSize: 5 }}
          scroll={{ x: screens.xs ? 600 : "auto" }} // Horizontal scroll for small screens
          style={{
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
          components={{
            header: {
              cell: (props) => (
                <th
                  {...props}
                  style={{
                    backgroundColor: "#2C3E50",
                    color: "white",
                    padding: "12px",
                    fontSize: "16px",
                  }}
                />
              ),
            },
          }}
        />
      </div>
      
              
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default StudentAssignments;
