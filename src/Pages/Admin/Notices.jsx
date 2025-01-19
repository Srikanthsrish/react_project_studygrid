
import React, { useState, useEffect } from "react";

const Notices = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notices, setNotices] = useState([]);

  // Fetch Notices from API
  const fetchNotices = async () => {
    try {
      const response = await fetch("http://localhost:3003/notices");
      const data = await response.json();
      setNotices(data);
    } catch (error) {
      console.error("Error fetching notices:", error.message);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3003/notices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      const result = await response.json();
      console.log(result);
      fetchNotices(); // Refresh notices after adding a new one
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding notice:", error.message);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Admin Notices</h1>

      {/* Notice Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px", width: "300px", height: "100px" }}
            required
          ></textarea>
        </div>
        <button type="submit" style={{ padding: "10px 20px", background: "blue", color: "white", border: "none", cursor: "pointer" }}>
          Add Notice
        </button>
      </form>

      {/* Display Notices */}
      <h2>All Notices</h2>
      <ul>
        {notices.map((notice) => (
          <li key={notice.id} style={{ marginBottom: "10px" }}>
            <strong>{notice.title}:</strong> {notice.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notices;