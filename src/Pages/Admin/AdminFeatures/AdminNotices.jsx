import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Input, Space, Select, Table, Modal, Spin, message, Grid, } from "antd";
import { ExclamationCircleOutlined, EditOutlined, DeleteOutlined,PlusOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";

const { Option } = Select;
const { confirm } = Modal;
const { useBreakpoint } = Grid;

const AdminNotices = () => {
  const [form] = Form.useForm();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const screens = useBreakpoint();

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://studygrid-backendmongo.onrender.com/api/notices");
      setNotices(response.data);
    } catch (error) {
      message.error("Failed to load notices.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      await axios.post("https://studygrid-backendmongo.onrender.com/api/notices", values);
      message.success("Notice added successfully!");
      form.resetFields();
      setShowFormModal(false);
      fetchNotices();
    } catch (error) {
      message.error("Failed to add notice.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNotice = (_id) => {
    confirm({
      title: "Are you sure you want to delete this notice?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        setLoading(true);
        try {
          await axios.delete(`https://studygrid-backendmongo.onrender.com/api/notices/${_id}`);
          message.success("Notice deleted successfully.");
          fetchNotices();
        } catch (error) {
          message.error("Failed to delete notice.");
        } finally {
          setLoading(false);
        }
      },
    });
  };
  const handleEditSubmit = async (values) => {
    setLoading(true);
    try {
      await axios.put(`https://studygrid-backendmongo.onrender.com/api/notices/${selectedNotice._id}`, values);
      message.success("Notice updated successfully!");
      setShowEditModal(false);
      fetchNotices();
    } catch (error) {
      message.error("Failed to update notice.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#EAF2F8", borderRadius: 10 }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',flexWrap:"wrap" }}>
        <h1 style={{ color: '#2C3E50' }}>Announcements</h1>
        <Button
        icon={<PlusOutlined />}
          type="primary"
          onClick={() => setShowFormModal(true)}
          style={{
            marginBottom: "20px",
            backgroundColor: "#2C3E50",
            borderColor: "#2C3E50",
            width: screens.xs ? "100%" : "auto",
          }}
        >
          Add Notice
        </Button>

      </div>


      {/* Modal for adding notice */}
      <Modal
        title="Add Notice"
        visible={showFormModal}
        onCancel={() => setShowFormModal(false)}
        footer={null}
        width={screens.xs ? "90%" : 600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          style={{ background: "white", padding: "20px", borderRadius: "10px" }}
        >
          <Form.Item
            label="Select Audience"
            name="audience"
            rules={[{ required: true, message: "Please select an audience!" }]}
          >
            <Select placeholder="Select audience">
              <Option value="students">Students</Option>
              <Option value="teachers">Teachers</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter the title!" }]}
          >
            <Input placeholder="Enter title" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description!" }]}
          >
            <Input.TextArea rows={3} placeholder="Enter description" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "#2C3E50",
                borderColor: "#2C3E50",
              }}
            >
              Submit Notice
            </Button>
            <Button
              type="default"
              onClick={() => {
                form.resetFields();
                setShowFormModal(false);
              }}
              style={{ marginLeft: 10, color: "red" }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* Edit Notice Modal */}
      <Modal
        title="Edit Notice"
        visible={showEditModal}
        onCancel={() => setShowEditModal(false)}
        footer={null}
        width={screens.xs ? "90%" : 600}
      >
        <Form
          layout="vertical"
          onFinish={handleEditSubmit}
          initialValues={selectedNotice}
          key={selectedNotice?._id} // To reinitialize form when modal opens
        >
          <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please enter the title!" }]}>
            <Input placeholder="Enter title" />
          </Form.Item>

          <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please enter a description!" }]}>
            <Input.TextArea rows={3} placeholder="Enter description" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: "#2C3E50", borderColor: "#2C3E50" }}>
              Update Notice
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Spin size="large" />
        </div>
      ) : (
        <Table
          dataSource={notices}
          rowKey="_id"
          bordered
          scroll={{ x: screens.xs ? 600 : "auto" }}
        >
          <Table.Column
            title="Audience"
            dataIndex="audience"
            key="audience"
            onHeaderCell={() => ({ style: { backgroundColor: "#2C3E50", color: "white" } })}
          />
          <Table.Column
            title="Title"
            dataIndex="title"
            key="title"
            onHeaderCell={() => ({ style: { backgroundColor: "#2C3E50", color: "white" } })}
          />
          <Table.Column
            title="Description"
            dataIndex="description"
            key="description"
            onHeaderCell={() => ({ style: { backgroundColor: "#2C3E50", color: "white" } })}
          />
          <Table.Column
            title="Date of Announcement"
            dataIndex="created_at"
            key="created_at"
            render={(text) => new Date(text).toLocaleString()}
            onHeaderCell={() => ({ style: { backgroundColor: "#2C3E50", color: "white" } })}
          />
          <Table.Column
            title="Actions"
            key="actions"
            onHeaderCell={() => ({ style: { backgroundColor: "#2C3E50", color: "white" } })}
            render={(_, record) => (


              <>
                <Space size="middle">
                  <EditOutlined
                    style={{ color: "#28A745", fontSize: "16px", cursor: "pointer" }}
                    onClick={() => {
                      setSelectedNotice(record);
                      setShowEditModal(true);
                    }}
                  />
                  <Button
                    type="text"
                    icon={<DeleteOutlined style={{ color: "red" }} />}
                    onClick={() => handleDeleteNotice(record._id)}
                  />
                </Space>


              </>
            )}
          />
        </Table>
      )}
    </div>
  );
};

export default AdminNotices;
