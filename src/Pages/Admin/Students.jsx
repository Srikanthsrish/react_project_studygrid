import React, { useState, useEffect } from "react";

const Students = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    rollNo: "",
    class: "",
    dob: "",
    gender: "Male",
    address: "",
    profilePicture: "",
    achievements: "",
    email: "",
    parentPhoneNumber: "",
    fatherName: "",
    motherName: "",
  });
  const [students, setStudents] = useState([]);

  // Fetch students from API
  const fetchStudents = async (className) => {
    try {
      const response = await fetch(`http://localhost:3003/students?class=${className}`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error.message);
    }
  };

  // Handle Add Student Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3003/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, class: selectedClass }),
      });
      const result = await response.json();
      console.log(result);
      fetchStudents(selectedClass); // Refresh students list
      setShowForm(false); // Hide form after submission
    } catch (error) {
      console.error("Error adding student:", error.message);
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Delete Student
  const deleteStudent = async (id) => {
    try {
      await fetch(`http://localhost:3003/students/${id}`, { method: "DELETE" });
      fetchStudents(selectedClass); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting student:", error.message);
    }
  };

  // View Student Details
  const viewStudent = (student) => {
    alert(
      `Student Details:\nName: ${student.fullName}\nRoll No: ${student.rollNo}\nClass: ${student.class}\nAchievements: ${student.achievements}`
    );
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Admin - Students</h1>

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
          Add Student
        </button>
      </div>

      {/* Add Student Form */}
      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "20px" }}>
          <h3>Add Student</h3>
          <div>
            <label>Full Name:</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>
          <div>
            <label>Roll No:</label>
            <input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} required />
          </div>
          <div>
            <label>Date of Birth:</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
          </div>
          <div>
            <label>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label>Address:</label>
            <textarea name="address" value={formData.address} onChange={handleChange} required></textarea>
          </div>
          <div>
            <label>Profile Picture (URL):</label>
            <input type="text" name="profilePicture" value={formData.profilePicture} onChange={handleChange} />
          </div>
          <div>
            <label>Achievements:</label>
            <input type="text" name="achievements" value={formData.achievements} onChange={handleChange} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label>Parent Phone Number:</label>
            <input type="text" name="parentPhoneNumber" value={formData.parentPhoneNumber} onChange={handleChange} required />
          </div>
          <div>
            <label>Father's Name:</label>
            <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} />
          </div>
          <div>
            <label>Mother's Name:</label>
            <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} />
          </div>
          <button type="submit">Save Student</button>
        </form>
      )}

      {/* Display Students */}
      {selectedClass && (
        <>
          <h2>Students in Class {selectedClass}</h2>
          <table border="1" style={{ width: "100%", textAlign: "left", marginTop: "20px" }}>
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.rollNo}</td>
                  <td>{student.fullName}</td>
                  <td>{student.email}</td>
                  <td>
                    <button onClick={() => viewStudent(student)}>View</button>
                    <button onClick={() => deleteStudent(student.id)}>Delete</button>
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

export default Students;