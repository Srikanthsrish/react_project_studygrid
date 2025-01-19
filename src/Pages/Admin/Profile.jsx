import React, { useEffect, useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating an API call
    const fetchProfile = async () => {
      const response = await fetch("https://api.example.com/admin/profile");
      const data = await response.json();
      setProfile(data);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <h2>Loading profile...</h2>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Admin Profile</h1>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <img
          src={profile.profilePicture || "https://via.placeholder.com/150"}
          alt="Profile"
          style={{ borderRadius: "50%", width: "150px", height: "150px" }}
        />
        <div>
          <p><strong>Full Name:</strong> {profile.name}</p>
          <p><strong>Email Address:</strong> {profile.email}</p>
          <p><strong>Phone Number:</strong> {profile.phone}</p>
          <p><strong>Date of Birth:</strong> {profile.dob}</p>
          <p><strong>Gender:</strong> {profile.gender}</p>
          <p><strong>Position:</strong> {profile.position}</p>
          <p><strong>Employee ID:</strong> {profile.employeeId}</p>
          <p><strong>Joined Date:</strong> {profile.joinedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;