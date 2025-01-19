import React, { useState, useEffect } from "react";

const StudentProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace this URL with your actual API endpoint
    fetch("YOUR_API_ENDPOINT")
      .then((response) => response.json())
      .then((data) => {
        setProfileData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (!profileData) {
    return <p>Unable to load profile data. Please try again later.</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Student Profile</h1>
      <div style={styles.profileCard}>
        <div style={styles.imageContainer}>
          <img
            src={profileData.profilePicture || "https://via.placeholder.com/150"}
            alt="Profile"
            style={styles.profileImage}
          />
        </div>
        <div style={styles.infoContainer}>
          <p>
            <strong>Full Name:</strong> {profileData.fullName}
          </p>
          <p>
            <strong>Class:</strong> {profileData.class}
          </p>
          <p>
            <strong>Roll Number:</strong> {profileData.rollNumber}
          </p>
          <p>
            <strong>Date of Birth:</strong> {profileData.dateOfBirth}
          </p>
          <p>
            <strong>Gender:</strong> {profileData.gender}
          </p>
          <p>
            <strong>Address:</strong> {profileData.address}
          </p>
          <p>
            <strong>Phone Number:</strong> {profileData.phoneNumber}
          </p>
        </div>
      </div>
      <div style={styles.achievementsContainer}>
        <h2>Achievements</h2>
        {profileData.achievements && profileData.achievements.length > 0 ? (
          <ul>
            {profileData.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        ) : (
          <p>No achievements listed.</p>
        )}
      </div>
    </div>
  );
};

// Inline styles for the UI
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    color: "#333",
  },
  profileCard: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  imageContainer: {
    flex: "0 0 auto",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    border: "2px solid #ddd",
  },
  infoContainer: {
    flex: "1 1 auto",
  },
  achievementsContainer: {
    marginTop: "20px",
  },
};

export default StudentProfile;