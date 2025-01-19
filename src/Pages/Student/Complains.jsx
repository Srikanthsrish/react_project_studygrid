import React, { useState, useEffect } from "react";

const Complains = () => {
  const [complaints, setComplaints] = useState([]);
  const [newComplaint, setNewComplaint] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch complaints data from the API
  useEffect(() => {
    // Replace this URL with your actual API endpoint
    fetch("YOUR_API_ENDPOINT/complaints")
      .then((response) => response.json())
      .then((data) => {
        setComplaints(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching complaints:", error);
        setError("Error fetching complaints.");
        setLoading(false);
      });
  }, []);

  // Handle new complaint submission
  const handleSubmitComplaint = () => {
    if (newComplaint.trim() === "") {
      alert("Please enter a complaint description.");
      return;
    }

    // Replace with actual API endpoint to submit complaint
    fetch("YOUR_API_ENDPOINT/submit-complaint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: newComplaint,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Complaint submitted successfully!");
        setComplaints([...complaints, data]); // Add new complaint to list
        setNewComplaint(""); // Clear input field
      })
      .catch((error) => {
        console.error("Error submitting complaint:", error);
        alert("Failed to submit the complaint.");
      });
  };

  if (loading) {
    return <p>Loading complaints...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Complaints</h1>

      <div style={styles.complaintForm}>
        <h2 style={styles.subHeader}>Submit a New Complaint</h2>
        <textarea
          style={styles.textArea}
          value={newComplaint}
          onChange={(e) => setNewComplaint(e.target.value)}
          placeholder="Describe your complaint..."
        ></textarea>
        <button style={styles.submitButton} onClick={handleSubmitComplaint}>
          Submit Complaint
        </button>
      </div>

      <h2 style={styles.subHeader}>Your Complaints</h2>
      <div style={styles.complaintList}>
        {complaints.length === 0 ? (
          <p>No complaints submitted yet.</p>
        ) : (
          complaints.map((complaint, index) => (
            <div key={index} style={styles.complaintItem}>
              <p><strong>Description:</strong> {complaint.description}</p>
              <p><strong>Status:</strong> {complaint.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Inline styling for the components
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    color: "#333",
  },
  subHeader: {
    color: "#333",
    marginBottom: "10px",
  },
  complaintForm: {
    marginBottom: "30px",
  },
  textArea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  complaintList: {
    marginTop: "20px",
  },
  complaintItem: {
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
  },
};

export default Complains;