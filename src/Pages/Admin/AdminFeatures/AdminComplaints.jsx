// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, Button, Tag, message, Spin, Grid } from 'antd';
// import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons';
// import 'antd/dist/reset.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const { useBreakpoint } = Grid;

// const AdminComplaints = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const screens = useBreakpoint();

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   const fetchComplaints = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('https://studygrid-backendmongo.onrender.com/complains');
//       setComplaints(response.data);
//     } catch (error) {
//       message.error('Failed to fetch complaints');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusChange = async (_id, newStatus) => {
//     try {
//       await axios.put(`https://studygrid-backendmongo.onrender.com/complains/${_id}/status`, { status: newStatus });
//       toast.success(`Complaint status updated to ${newStatus}`);
//       fetchComplaints();
//     } catch (error) {
//       toast.error('Failed to update status');
//     }
//   };

//   const columns = [
//     {
//       title: 'Complaint ID',
//       dataIndex: '_id',
//       key: '_id',
//     },
//     {
//       title: 'Teacher ID',
//       dataIndex: 'teacherId',
//       key: 'teacherId',
//     },
//     {
//       title: 'Class',
//       dataIndex: 'class',
//       key: 'class',
//       render: (text) => text || 'N/A',
//     },
//     {
//       title: 'Full Name',
//       dataIndex: 'fullname',
//       key: 'fullname',
//       render: (text) => text || 'N/A',
//     },
//     {
//       title: 'Description',
//       dataIndex: 'description',
//       key: 'description',
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: (status) => (
//         <Tag color={status === 'pending' ? 'orange' : status === 'resolved' ? 'green' : 'red'}>
//           {status.toUpperCase()}
//         </Tag>
//       ),
//     },
//     {
//       title: 'Created At',
//       dataIndex: 'created_at',
//       key: 'created_at',
//       render: (date) => new Date(date).toLocaleString(),
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (record) => (
//         record.status === 'pending' && (
//           <>
//             <Button
//               type="primary"
//               icon={<CheckCircleOutlined />}
//               onClick={() => handleStatusChange(record._id, 'resolved')}
//               style={{ marginRight: '10px', backgroundColor: '#27AE60', border: 'none', width: screens.xs ? '100%' : 'auto' }}
//             >
//               Resolve
//             </Button>
//             <Button
//               type="primary"
//               danger
//               icon={<CloseCircleOutlined />}
//               onClick={() => handleStatusChange(record._id, 'rejected')}
//               style={{ width: screens.xs ? '100%' : 'auto' }}
//             >
//               Reject
//             </Button>
//           </>
//         )
//       ),
//     },
//   ];

//   return (
//     <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
//       <h1 style={{ textAlign: 'center', color: '#2C3E50' }}>Complaint Management</h1>
//       <ToastContainer position="top-right" autoClose={3000} />

//       {loading ? (
//         <div style={{ textAlign: 'center', margin: '20px' }}>
//           <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#2C3E50' }} spin />} />
//         </div>
//       ) : (
//         <Table
//           dataSource={complaints}
//           columns={columns}
//           rowKey="_id"
//           bordered
//           pagination={{ pageSize: 5 }}
//           style={{
//             backgroundColor: '#EAF2F8',
//             overflowX: screens.xs ? 'scroll' : 'auto', // Adding horizontal scroll on small screens
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminComplaints;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Tag, message, Spin, Grid } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { useBreakpoint } = Grid;

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const screens = useBreakpoint();

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://studygrid-backendmongo.onrender.com/complains');
      setComplaints(response.data);
    } catch (error) {
      message.error('Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (_id, newStatus) => {
    try {
      await axios.put(`https://studygrid-backendmongo.onrender.com/complains/${_id}/status`, { status: newStatus });
      toast.success(`Complaint status updated to ${newStatus}`);
      fetchComplaints();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const columns = [
    {
      title: 'Complaint ID',
      dataIndex: '_id',
      key: '_id',
      onHeaderCell: () => ({
        style: { backgroundColor: "#2C3E50", color: "white" },
      }),
    },
    {
      title: 'Teacher ID',
      dataIndex: 'teacherId',
      key: 'teacherId',
      onHeaderCell: () => ({
        style: { backgroundColor: "#2C3E50", color: "white" },
      }),
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'class',
      render: (text) => text || 'N/A',
      onHeaderCell: () => ({
        style: { backgroundColor: "#2C3E50", color: "white" },
      }),
    },
    {
      title: 'Full Name',
      dataIndex: 'fullname',
      key: 'fullname',
      render: (text) => text || 'N/A',
      onHeaderCell: () => ({
        style: { backgroundColor: "#2C3E50", color: "white" },
      }),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      onHeaderCell: () => ({
        style: { backgroundColor: "#2C3E50", color: "white" },
      }),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'pending' ? 'orange' : status === 'resolved' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
      onHeaderCell: () => ({
        style: { backgroundColor: "#2C3E50", color: "white" },
      }),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => new Date(date).toLocaleString(),
      onHeaderCell: () => ({
        style: { backgroundColor: "#2C3E50", color: "white" },
      }),
    },
    {
      title: 'Actions',
      key: 'actions',
      onHeaderCell: () => ({
        style: { backgroundColor: "#2C3E50", color: "white" },
      }),
      render: (record) =>
        record.status === 'pending' && (
          <>
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={() => handleStatusChange(record._id, 'resolved')}
              style={{
                marginRight: '10px',
                backgroundColor: '#27AE60',
                border: 'none',
                width: screens.xs ? '100%' : 'auto',
              }}
            >
              Resolve
            </Button>
            <Button
              type="primary"
              danger
              icon={<CloseCircleOutlined />}
              onClick={() => handleStatusChange(record._id, 'rejected')}
              style={{ width: screens.xs ? '100%' : 'auto' }}
            >
              Reject
            </Button>
          </>
        ),
    },
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#2C3E50' }}>Complaint Management</h1>
      <ToastContainer position="top-right" autoClose={3000} />

      {loading ? (
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#2C3E50' }} spin />} />
        </div>
      ) : (
        <Table
          dataSource={complaints}
          columns={columns}
          rowKey="_id"
          bordered
          pagination={{ pageSize: 5 }}
          style={{
            backgroundColor: '#EAF2F8',
            overflowX: screens.xs ? 'scroll' : 'auto',
          }}
        />
      )}
    </div>
  );
};

export default AdminComplaints;
