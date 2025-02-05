import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Input, Table, Spin, message, Modal } from "antd";
import "antd/dist/reset.css";

const TeacherSubjectAllocation = () => {
  const [allocations, setAllocations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllocations();
  }, []);

  const fetchAllocations = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://studygrid-backendmongo.onrender.com/api/teacher_subject_allocation");
      setAllocations(response.data);
    } catch (error) {
      console.error("Error fetching allocations", error);
      message.error("Failed to fetch allocations.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post("https://studygrid-backendmongo.onrender.com/api/teacher_subject_allocation", values, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        message.success("Allocation added successfully.");
        fetchAllocations();
        setShowForm(false);
      }
    } catch (error) {
      console.error("Error adding allocation", error);
      message.error("Failed to add allocation.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (teacher_id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this allocation?",
      onOk: async () => {
        setLoading(true);
        try {
          await axios.delete(`https://studygrid-backendmongo.onrender.com/api/teacher_subject_allocation/${teacher_id}`);
          message.success("Allocation deleted successfully.");
          fetchAllocations();
        } catch (error) {
          console.error("Error deleting allocation", error);
          message.error("Failed to delete allocation.");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <div style={{ background: "#EAF2F8", padding: "20px", borderRadius: "8px" }}>
      <h2 style={{ color: "#2C3E50", textAlign: "center" }}>Teacher-Subject Scheduling</h2>

      {/* Add Allocation Button */}
      <Button
        type="primary"
        onClick={() => setShowForm(true)}
        style={{ marginBottom: "20px" }}
      >
        Add Allocation
      </Button>

      {/* Modal for Adding Allocation */}
      <Modal
        title="Add New Allocation"
        visible={showForm}
        onCancel={() => setShowForm(false)}
        footer={null}
        centered
        width={600}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="teacher_name" label="Teacher Name" rules={[{ required: true, message: "Teacher Name is required" }]}>
            <Input placeholder="Enter Teacher Name" />
          </Form.Item>
          <Form.Item name="subject_code" label="Subject Code" rules={[{ required: true, message: "Subject Code is required" }]}>
            <Input placeholder="Enter Subject Code" />
          </Form.Item>
          <Form.Item name="subject_name" label="Subject Name" rules={[{ required: true, message: "Subject Name is required" }]}>
            <Input placeholder="Enter Subject Name" />
          </Form.Item>
          <Form.Item name="class" label="Class" rules={[{ required: true, message: "Class is required" }]}>
            <Input placeholder="Enter Class" />
          </Form.Item>
          <Form.Item name="teacher_id" label="Teacher ID" rules={[{ required: true, message: "Teacher ID is required" }]}>
            <Input placeholder="Enter Teacher ID" />
          </Form.Item>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Add Allocation
            </Button>
            <Button type="default" danger onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Allocation Table */}
      <Spin spinning={loading} tip="Loading...">
        <Table
          dataSource={allocations}
          bordered
          rowKey="teacher_id"
          style={{ marginTop: "20px" }}
        >
          <Table.Column title="Teacher Name" dataIndex="teacher_name" key="teacher_name" />
          <Table.Column title="Subject Code" dataIndex="subject_code" key="subject_code" />
          <Table.Column title="Subject Name" dataIndex="subject_name" key="subject_name" />
          <Table.Column title="Class" dataIndex="class" key="class" />
          <Table.Column title="Teacher ID" dataIndex="teacher_id" key="teacher_id" />
          <Table.Column
            title="Actions"
            key="actions"
            render={(_, record) => (
              <Button type="default" danger onClick={() => handleDelete(record.teacher_id)}>
                Delete
              </Button>
            )}
          />
        </Table>
      </Spin>
    </div>
  );
};

export default TeacherSubjectAllocation;




