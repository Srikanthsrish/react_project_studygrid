// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Card, Spin, Typography, Descriptions, Button } from "antd";
// import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const { Title } = Typography;

// const StudentProfile = () => {
//   const { fullName } = useParams();
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchProfileData = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       const response = await axios.get(
//         `https://studygrid-backendmongo.onrender.com/students/profile/${encodeURIComponent(fullName)}`
//       );
//       setProfileData(response.data);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to fetch student profile");
//       toast.error("Unable to load profile. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (fullName) fetchProfileData();
//   }, [fullName]);

//   if (loading) {
//     return <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />;
//   }

//   if (error) {
//     return (
//       <div style={{ textAlign: "center", color: "red" }}>
//         <Title level={3}>{error}</Title>
//         <Button type="primary" icon={<ReloadOutlined />} onClick={fetchProfileData}>
//           Retry
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <Card
//       style={{
//         maxWidth: 600,
//         margin: "auto",
//         padding: 20,
//         background: "#EAF2F8",
//         border: "1px solid #2C3E50",
//         borderRadius: 10,
//         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       <Title level={2} style={{ color: "#2C3E50", textAlign: "center" }}>Student Profile</Title>

//       {profileData && (
//         <Descriptions bordered column={1} size="middle" style={{ marginTop: 20 }}>
//           <Descriptions.Item label="Student Name" labelStyle={{ fontWeight: "bold", color: "#2C3E50" }}>
//             {profileData.fullName}
//           </Descriptions.Item>
//           <Descriptions.Item label="Class" labelStyle={{ fontWeight: "bold", color: "#2C3E50" }}>
//             {profileData.class || "N/A"}
//           </Descriptions.Item>
//           <Descriptions.Item label="Email" labelStyle={{ fontWeight: "bold", color: "#2C3E50" }}>
//             {profileData.email || "N/A"}
//           </Descriptions.Item>
//         </Descriptions>
//       )}

//       <ToastContainer />
//     </Card>
//   );
// };

// export default StudentProfile;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Spin, Typography, Descriptions, Button } from "antd";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Title } = Typography;

const StudentProfile = () => {
  const { fullName } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfileData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://studygrid-backendmongo.onrender.com/students/profile/${encodeURIComponent(fullName)}`
      );
      setProfileData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch student profile");
      toast.error("Unable to load profile. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fullName) fetchProfileData();
  }, [fullName]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          textAlign: "center",
          color: "red",
        }}
      >
        <Title level={3}>{error}</Title>
        <Button type="primary" icon={<ReloadOutlined />} onClick={fetchProfileData}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <Card
      style={{
        maxWidth: 600,
        margin: "auto",
        padding: 20,
        background: "#EAF2F8",
        border: "1px solid #2C3E50",
        borderRadius: 10,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Title level={2} style={{ color: "#2C3E50", textAlign: "center" }}>Student Profile</Title>

      {profileData && (
        <Descriptions bordered column={1} size="middle" style={{ marginTop: 20 }}>
          <Descriptions.Item label="Student Name" labelStyle={{ fontWeight: "bold", color: "#2C3E50" }}>
            {profileData.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Class" labelStyle={{ fontWeight: "bold", color: "#2C3E50" }}>
            {profileData.class || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Email" labelStyle={{ fontWeight: "bold", color: "#2C3E50" }}>
            {profileData.email || "N/A"}
          </Descriptions.Item>
        </Descriptions>
      )}

      <ToastContainer />
    </Card>
  );
};

export default StudentProfile;
