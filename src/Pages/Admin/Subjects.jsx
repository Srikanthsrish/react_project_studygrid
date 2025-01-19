import React, { useState, useEffect } from "react";

const Subjects = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    subjectName: "",
  });
  const [subjects, setSubjects] = useState([]);

  // Fetch subjects from API
  const fetchSubjects = async (className) => {
    try {
      const response = await fetch(`http://localhost:3003/subjects?class=${className}`);
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error("Error fetching subjects:", error.message);
    }
  };

  // Handle Add Subject Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3003/subjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, class: selectedClass }),
      });
      const result = await response.json();
      console.log(result);
      fetchSubjects(selectedClass); // Refresh subjects list
      setShowForm(false); // Hide form after submission
    } catch (error) {
      console.error("Error adding subject:", error.message);
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Edit Subject
  const editSubject = async (id, updatedSubject) => {
    try {
      await fetch(`http://localhost:3003/subjects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSubject),
      });
      fetchSubjects(selectedClass); // Refresh the list after editing
    } catch (error) {
      console.error("Error editing subject:", error.message);
    }
  };

  // View Subject
  const viewSubject = (subject) => {
    alert(`Subject Details:\nName: ${subject.subjectName}\nClass: ${subject.class}`);
  };

  // Delete Subject
  const deleteSubject = async (id) => {
    try {
      await fetch(`http://localhost:3003/subjects/${id}`, { method: "DELETE" });
      fetchSubjects(selectedClass); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting subject:", error.message);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Admin - Subjects</h1>

      {/* Class Selection Dropdown */}
      <div style={{ marginBottom: "20px" }}>
        <label>Select Class:</label>
        <select onChange={(e) => setSelectedClass(e.target.value)} value={selectedClass}>
          <option value="">--Select--</option>
          {[...Array(10).keys()].map((i) => (
            <option key={i + 1} value={i + 1}>
              Class {i + 1}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            if (selectedClass) setShowForm(true);
            else alert("Please select a class first!");
          }}
          style={{ marginLeft: "10px" }}
        >
          Add Subject
        </button>
      </div>

      {/* Add Subject Form */}
      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "20px" }}>
          <h3>Add Subject</h3>
          <div>
            <label>Subject Name:</label>
            <input type="text" name="subjectName" value={formData.subjectName} onChange={handleChange} required />
          </div>
          <button type="submit">Save Subject</button>
        </form>
      )}

      {/* Display Subjects */}
      {selectedClass && (
        <>
          <h2>Subjects in Class {selectedClass}</h2>
          <table border="1" style={{ width: "100%", textAlign: "left", marginTop: "20px" }}>
            <thead>
              <tr>
                <th>Subject Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.id}>
                  <td>{subject.subjectName}</td>
                  <td>
                    <button onClick={() => viewSubject(subject)}>View</button>
                    <button
                      onClick={() =>
                        editSubject(subject.id, { ...subject, subjectName: prompt("Edit Subject Name:", subject.subjectName) })
                      }
                    >
                      Edit
                    </button>
                    <button onClick={() => deleteSubject(subject.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Subjects;