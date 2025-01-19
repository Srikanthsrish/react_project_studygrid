import React, { useState, useEffect } from "react";

const StudentAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace this URL with your actual API endpoint
    fetch("YOUR_API_ENDPOINT")
      .then((response) => response.json())
      .then((data) => {
        setAttendanceData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading attendance data...</p>;
  }

  if (!attendanceData || attendanceData.length === 0) {
    return <p>No attendance records available.</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Attendance Summary</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Total Classes</th>
            <th>Classes Attended</th>
            <th>Attendance %</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((record, index) => {
            const percentage = ((record.classesAttended / record.totalClasses) * 100).toFixed(2);
            const status = percentage >= 75 ? "Good" : "Detain";
            return (
              <tr key={index}>
                <td>{record.totalClasses}</td>
                <td>{record.classesAttended}</td>
                <td>{percentage}%</td>
                <td style={{ color: status === "Detain" ? "red" : "green" }}>{status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

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
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    border: "1px solid #ddd",
  },
  td: {
    textAlign: "center",
    padding: "10px",
    border: "1px solid #ddd",
  },
};

export default StudentAttendance;