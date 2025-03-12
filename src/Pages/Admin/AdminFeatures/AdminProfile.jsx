// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Card, Typography, Spin, message } from "antd";
// import { UserOutlined, MailOutlined, IdcardOutlined } from "@ant-design/icons";
// import "antd/dist/reset.css";

// const { Title, Text } = Typography;

// const AdminProfile = () => {
//   const { admin_id } = useParams();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAdminProfile = async () => {
//       try {
//         const response = await fetch(
//           `https://studygrid-backendmongo.onrender.com/admin/profile/${admin_id}`
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch profile.");
//         }

//         const data = await response.json();
//         setProfile(data);
//       } catch (error) {
//         message.error(error.message || "Server error. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAdminProfile();
//   }, [admin_id]);

//   return (
//     <div style={styles.container}>
//       <Title level={2} style={{ color: "#2C3E50", textAlign: "center" }}>
//         Admin Profile
//       </Title>

//       {loading ? (
//         <div style={styles.loader}>
//           <Spin size="large" />
//         </div>
//       ) : profile ? (
//         <Card style={styles.profileCard} bordered={false}>
//           <p>
//             <IdcardOutlined style={styles.icon} />
//             <Text strong>ID:</Text> {profile.admin_id}
//           </p>
//           <p>
//             <UserOutlined style={styles.icon} />
//             <Text strong>Name:</Text> {profile.admin_name}
//           </p>
//           <p>
//             <MailOutlined style={styles.icon} />
//             <Text strong>Email:</Text> {profile.emailid}
//           </p>
//         </Card>
//       ) : (
//         <Text type="danger">No profile found.</Text>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: "2rem",
//     fontFamily: "Arial, sans-serif",
//     backgroundColor: "#EAF2F8",
//     minHeight: "100vh",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     overflowX: "auto", // Ensures no content overflows horizontally
//   },
//   loader: {
//     display: "flex",
//     justifyContent: "center",
//     marginTop: "2rem",
//   },
//   profileCard: {
//     width: "100%", // Ensures card takes full width on mobile
//     maxWidth: 400, // Max width for larger screens
//     padding: "1.5rem",
//     backgroundColor: "#FFFFFF",
//     borderRadius: "10px",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//     overflowX: "auto", // In case of long text
//   },
//   icon: {
//     marginRight: 8,
//     color: "#3498DB",
//   },
// };

// export default AdminProfile;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography, Spin, message } from "antd";
import { UserOutlined, MailOutlined, IdcardOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";

const { Title, Text } = Typography;

const AdminProfile = () => {
  const { admin_id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (admin_id === "guest") {
      setProfile({
        admin_id: "GUEST123",
        admin_name: "Guest User",
        emailid: "guest@studygrid.com",
      });
      setLoading(false);
      return;
    }

    const fetchAdminProfile = async () => {
      try {
        const response = await fetch(
          `https://studygrid-backendmongo.onrender.com/admin/profile/${admin_id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile.");
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        message.error(error.message || "Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, [admin_id]);

  return (
    <div style={styles.container}>
      <Title level={2} style={{ color: "#2C3E50", textAlign: "center" }}>
        Admin Profile
      </Title>

      {loading ? (
        <div style={styles.loader}>
          <Spin size="large" />
        </div>
      ) : profile ? (
        <Card style={styles.profileCard} bordered={false}>
          <p>
            <IdcardOutlined style={styles.icon} />
            <Text strong>ID:</Text> {profile.admin_id}
          </p>
          <p>
            <UserOutlined style={styles.icon} />
            <Text strong>Name:</Text> {profile.admin_name}
          </p>
          <p>
            <MailOutlined style={styles.icon} />
            <Text strong>Email:</Text> {profile.emailid}
          </p>
        </Card>
      ) : (
        <Text type="danger">No profile found.</Text>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#EAF2F8",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowX: "auto", 
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
  },
  profileCard: {
    width: "100%",
    maxWidth: 400,
    padding: "1.5rem",
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    overflowX: "auto", 
  },
  icon: {
    marginRight: 8,
    color: "#3498DB",
  },
};

export default AdminProfile;
