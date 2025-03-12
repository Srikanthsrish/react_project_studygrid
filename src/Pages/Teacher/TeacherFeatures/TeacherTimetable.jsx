// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Table, Card, Typography, Spin, message } from "antd";
// import { LoadingOutlined } from "@ant-design/icons";

// const { Title } = Typography;

// const TeacherTimetable = () => {
//   const { teacherId } = useParams();
//   const [timetable, setTimetable] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (teacherId) {
//       fetchTimetable(teacherId);
//     }
//   }, [teacherId]);

//   const fetchTimetable = async (teacherId) => {
//     try {
//       const response = await axios.get(
//         `https://studygrid-backendmongo.onrender.com/teachertimetable/${teacherId}`
//       );
//       setTimetable(response.data);
//       setError(null);
//     } catch (err) {
//       if (err.response && err.response.status === 404) {
//         setError("No records found for the given Teacher ID.");
//         message.error("No records found for the given Teacher ID.");
//       } else {
//         setError("Failed to fetch data. Please try again.");
//         message.error("Failed to fetch data. Please try again.");
//       }
//       setTimetable([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const columns = [
//     {
//       title: "Class",
//       dataIndex: "class",
//       key: "class",
      
//     },
//     {
//       title: "Day",
//       dataIndex: "day",
//       key: "day",
      
//     },
//     {
//       title: "Period",
//       dataIndex: "period",
//       key: "period",
      
//     },
//     {
//       title: "Subject Details",
//       dataIndex: "subject_details",
//       key: "subject_details",
      
//     },
//   ];

//   return (
//     <div style={{ padding: "20px", minHeight: "100vh" }}>
     
//      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <h1 style={{ color: '#2C3E50' }}>Timetable for Teacher ID: {teacherId}</h1>
                
//             </div>
        

//         {loading ? (
//           <Spin
//             indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
//             style={{ display: "block", textAlign: "center", marginTop: 20 }}
//           />
//         ) : error ? (
//           <Title level={4} style={{ color: "red", textAlign: "center" }}>
//             {error}
//           </Title>
//         ) : (
//           <div style={{ overflowX: "auto" }}>
//             <Table
//               columns={columns}
//               dataSource={timetable}
//               rowKey="id"
//               bordered
//               pagination={{ pageSize: 5 }}
//               style={{ marginTop: 20 }}
//               rowClassName={(record, index) =>
//                 index % 2 === 0 ? "table-row-light" : "table-row-dark"
//               }
//             />
//           </div>
//         )}
     

//       <style>
//         {`
//           .table-row-light {
//             background-color: #f9f9f9;
//           }
//           .table-row-dark {
//             background-color: #ffffff;
//           }
//           .ant-table-thead > tr > th {
//             background-color: #2C3E50 !important;
//             color: white !important;
//             text-align: center;
//           }
//           .ant-table-row:hover {
//             background-color: #EAF2F8 !important;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default TeacherTimetable;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Table, Typography, Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Title } = Typography;

const TeacherTimetable = () => {
  const { teacherId } = useParams();
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (teacherId === "guest") {
      setLoading(false);
      setError("No timetable to show for guest.");
      return;
    }
    if (teacherId) {
      fetchTimetable(teacherId);
    }
  }, [teacherId]);

  const fetchTimetable = async (teacherId) => {
    try {
      const response = await axios.get(
        `https://studygrid-backendmongo.onrender.com/teachertimetable/${teacherId}`
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
    { title: "Class", dataIndex: "class", key: "class" },
    { title: "Day", dataIndex: "day", key: "day" },
    { title: "Period", dataIndex: "period", key: "period" },
    { title: "Subject Details", dataIndex: "subject_details", key: "subject_details" },
  ];

  return (
    <div style={{ padding: "20px", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ color: "#2C3E50" }}>Timetable for Teacher ID: {teacherId}</h1>
      </div>

      {loading ? (
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
          style={{ display: "block", textAlign: "center", marginTop: 20 }}
        />
      ) : error ? (
        <Title level={4} style={{ color: "black", textAlign: "center" }}>
          {error}
        </Title>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <Table
            columns={columns}
            dataSource={timetable}
            rowKey="id"
            overflow="hidden"
            overflowX="scroll"

            pagination={{ pageSize: 5 }}
            style={{ marginTop: 20 }}
            rowClassName={(record, index) => (index % 2 === 0 ? "table-row-light" : "table-row-dark")}
          />
        </div>
      )}

      <style>
        {`
          .table-row-light { background-color: #f9f9f9; }
          .table-row-dark { background-color: #ffffff; }
          .ant-table-thead > tr > th { background-color: #2C3E50 !important; color: white !important; text-align: center; }
          .ant-table-row:hover { background-color: #EAF2F8 !important; }
        `}
      </style>
    </div>
  );
};

export default TeacherTimetable;
