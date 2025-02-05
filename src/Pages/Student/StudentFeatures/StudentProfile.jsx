// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom"; 
// import { Card, Spin, notification } from "antd"; 
// import { ToastContainer, toast } from "react-toastify"; 
// import "react-toastify/dist/ReactToastify.css"; 

// const StudentProfile = () => {
//   const { fullName } = useParams();
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch profile data
//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await fetch(`http://localhost:3006/students/profile?fullName=${fullName}`);
        
//         if (!response.ok) {
//           throw new Error("Profile not found");
//         }

//         const data = await response.json();
//         setProfileData(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         setLoading(false);
//         toast.error("Unable to load profile. Please try again later.");
//       }
//     };

//     fetchProfileData();
//   }, [fullName]);

//   if (loading) {
//     return <Spin size="large" tip="Loading Profile..." />;
//   }

//   if (!profileData) {
//     return <p>Unable to load profile data. Please try again later.</p>;
//   }

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.header}>Student Profile</h1>
//       <Card style={styles.profileCard}>
//         <div style={styles.infoContainer}>
//           <p><strong>ID:</strong> {profileData.id}</p>
//           <p><strong>Full Name:</strong> {profileData.fullName}</p>
//           <p><strong>Class:</strong> {profileData.class}</p>
//           <p><strong>Password:</strong> {profileData.password}</p>
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
//     backgroundColor: "#EAF2F8", // Light pastel blue background
//     borderRadius: "8px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//   },
//   header: {
//     textAlign: "center",
//     color: "#2C3E50", // Dark blue color for header
//   },
//   profileCard: {
//     backgroundColor: "#fff",
//     borderRadius: "8px",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//     padding: "20px",
//   },
//   infoContainer: {
//     fontSize: "16px",
//     lineHeight: "1.5",
//     color: "#333",
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
    return <Spin size="large" tip="Loading Profile..." />;
  }

  if (!profileData) {
    return <p style={{ textAlign: "center", color: "red" }}>Profile not found.</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Student Profile</h1>
      <Card style={styles.profileCard}>
        <div style={styles.infoContainer}>
          
          <p><strong>Full Name:</strong> {profileData.fullName}</p>
          <p><strong>Class:</strong> {profileData.class || "N/A"}</p>
          <p><strong>Password:</strong> {profileData.password}</p>
        </div>
      </Card>
      <ToastContainer />
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#EAF2F8",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    color: "#2C3E50",
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px",
  },
  infoContainer: {
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#333",
  },
};

export default StudentProfile;
