// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Card, Spin, Avatar } from "antd";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { UserOutlined } from "@ant-design/icons";

// const StudentProfile = () => {
//   const { fullName } = useParams();
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await fetch(`https://studygrid-backendmongo.onrender.com/students/profile/${fullName}`);

//         if (!response.ok) {
//           throw new Error("Profile not found");
//         }

//         const data = await response.json();
//         setProfileData(data);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         toast.error("Unable to load profile. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfileData();
//   }, [fullName]);

//   if (loading) {
//     return <Spin size="large" tip="Loading Profile..." style={styles.spinner} />;
//   }

//   if (!profileData) {
//     return <p style={styles.errorMessage}>Profile not found.</p>;
//   }

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.header}>Student Profile</h1>
//       <Card style={styles.profileCard}>
//         <div style={styles.avatarContainer}>
//           <Avatar size={100} icon={<UserOutlined />} />
//         </div>
//         <div style={styles.infoContainer}>
//           <p><strong>Full Name:</strong> {profileData.fullName}</p>
//           <p><strong>Class:</strong> {profileData.class || "N/A"}</p>
//           <p><strong>Email:</strong> {profileData.email || "N/A"}</p>
//           <p><strong>Phone:</strong> {profileData.phone || "N/A"}</p>
//         </div>
//       </Card>
//       <ToastContainer />
//     </div>
//   );
// };

// const styles = {
//   container: {
//     padding: "20px",
//     fontFamily: "Arial, sans-serif",
//     maxWidth: "600px",
//     margin: "0 auto",
//     backgroundColor: "#EAF2F8",
//     borderRadius: "8px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//   },
//   header: {
//     textAlign: "center",
//     color: "#2C3E50",
//     marginBottom: "20px",
//   },
//   profileCard: {
//     backgroundColor: "#fff",
//     borderRadius: "8px",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//     padding: "20px",
//     textAlign: "center",
//   },
//   avatarContainer: {
//     marginBottom: "20px",
//   },
//   infoContainer: {
//     fontSize: "16px",
//     lineHeight: "1.5",
//     color: "#333",
//     textAlign: "left",
//   },
//   errorMessage: {
//     textAlign: "center",
//     color: "red",
//     fontSize: "18px",
//     fontWeight: "bold",
//   },
//   spinner: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100vh",
//   },
// };

// export default StudentProfile;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Spin } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentProfile = () => {
  const { fullName } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`https://studygrid-backendmongo.onrender.com/students/profile/${fullName}`);
        if (!response.ok) {
          throw new Error("Profile not found");
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Unable to load profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [fullName]);

  if (loading) {
    return <Spin size="large" tip="Loading Profile..." style={styles.spinner} />;
  }

  if (!profileData) {
    return <p style={styles.errorMessage}>Profile not found.</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Student Profile</h2>
      <Card style={styles.profileCard}>
        <p><strong>Name:</strong> {profileData.fullName}</p>
        <p><strong>Class:</strong> {profileData.class || "N/A"}</p>
        <p><strong>Email:</strong> {profileData.email || "N/A"}</p>
      </Card>
      <ToastContainer />
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "400px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    color: "#333",
    marginBottom: "15px",
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "15px",
    textAlign: "left",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  errorMessage: {
    textAlign: "center",
    color: "red",
    fontSize: "16px",
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};

export default StudentProfile;
