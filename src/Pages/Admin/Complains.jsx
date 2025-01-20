import React, { useState, useEffect } from "react";

const Complains = () => {
  const [category, setCategory] = useState("Student"); // Default to 'Student' complaints
  const [complains, setComplains] = useState([]);

  // Fetch Complaints based on category (Student or Teacher)
  const fetchComplains = async (category) => {
    try {
      const response = await fetch(`http://localhost:3003/complains?category=${category}`);
      const data = await response.json();
      setComplains(data);
    } catch (error) {
      console.error("Error fetching complaints:", error.message);
    }
  };

  // Fetch complaints when the component mounts or category changes
  useEffect(() => {
    fetchComplains(category);
  }, [category]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Admin Complaints</h1>

      {/* Category Selection Dropdown */}
      <div style={{ marginBottom: "20px" }}>
        <label>Select Category:</label>
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="Student">Student Complaints</option>
          <option value="Teacher">Teacher Complaints</option>
        </select>
      </div>

      {/* Display Complaints */}
      <h2>{category} Complaints</h2>
      {complains.length > 0 ? (
        <ul>
          {complains.map((complain) => (
            <li key={complain.id} style={{ marginBottom: "10px" }}>
              <strong>{complain.title}:</strong> {complain.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No complaints found for {category}.</p>
      )}
    </div>
  );
};

export default Complains;

