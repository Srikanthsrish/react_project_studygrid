import React, { useState, useEffect } from "react";

const Complains = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [complains, setComplains] = useState([]);

  // Fetch Complaints from API
  const fetchComplains = async () => {
    try {
      const response = await fetch("http://localhost:3003/complains");
      const data = await response.json();
      setComplains(data);
    } catch (error) {
      console.error("Error fetching complaints:", error.message);
    }
  };

  useEffect(() => {
    fetchComplains();
  }, []);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3003/complains", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      const result = await response.json();
      console.log(result);
      fetchComplains(); // Refresh complaints after adding a new one
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding complaint:", error.message);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Admin Complaints</h1>

      {/* Complaint Form */}
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
          Add Complaint
        </button>
      </form>

      {/* Display Complaints */}
      <h2>All Complaints</h2>
      <ul>
        {complains.map((complain) => (
          <li key={complain.id} style={{ marginBottom: "10px" }}>
            <strong>{complain.title}:</strong> {complain.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Complains;