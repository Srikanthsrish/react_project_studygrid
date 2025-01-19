import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentTimetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedClass, setSelectedClass] = useState(""); // State for selected class
  const [classes, setClasses] = useState([]); // State for available classes
  
  const navigate = useNavigate();

  // Fetch the list of available classes (e.g., 10th, 11th, etc.)
  const fetchClasses = () => {
    fetch(`YOUR_API_ENDPOINT/classes`)
      .then((response) => response.json())
      .then((data) => setClasses(data))
      .catch((error) => console.error("Error fetching classes:", error));
  };

  // Fetch timetable based on selected class
  const fetchTimetable = () => {
    if (!selectedClass) return; // Prevent fetching if no class is selected
    setLoading(true);
    setError(null);

    // Fetch timetable data for the selected class
    fetch(`YOUR_API_ENDPOINT/timetable?class=${selectedClass}`)
      .then((response) => response.json())
      .then((data) => {
        setTimetable(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching timetable:", error);
        setError("Error fetching timetable.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchClasses(); // Fetch available classes when component mounts
  }, []);

  useEffect(() => {
    fetchTimetable(); // Fetch timetable whenever the class is selected or changed
  }, [selectedClass]);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Weekly Timetable</h1>

      {/* Class selection dropdown */}
      <div style={styles.selectContainer}>
        <label htmlFor="class" style={styles.selectLabel}>
          Select Class:
        </label>
        <select
          id="class"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          style={styles.select}
        >
          <option value="">--Select Class--</option>
          {classes.map((classItem, index) => (
            <option key={index} value={classItem.className}>
              {classItem.className}
            </option>
          ))}
        </select>
      </div>

      {/* Loading state */}
      {loading && <p>Loading timetable...</p>}

      {/* Error state */}
      {error && <p>{error}</p>}

      {/* Timetable display */}
      <div style={styles.timetable}>
        {timetable.length === 0 && !loading ? (
          <p>No timetable available for the selected class.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Day</th>
                <th>Subject Name</th>
                <th>Timings</th>
                <th>Teacher Name</th>
                <th>Subject Code</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.day}</td>
                  <td>{entry.subjectName}</td>
                  <td>{entry.timings}</td>
                  <td>{entry.teacherName}</td>
                  <td>{entry.subjectCode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "900px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    color: "#333",
  },
  selectContainer: {
    marginBottom: "20px",
  },
  selectLabel: {
    fontSize: "16px",
    marginRight: "10px",
  },
  select: {
    padding: "8px",
    fontSize: "16px",
    width: "200px",
  },
  timetable: {
    marginTop: "20px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "#fff",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    backgroundColor: "#f1f1f1",
    padding: "10px",
    textAlign: "left",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "center",
  },
};

export default StudentTimetable;