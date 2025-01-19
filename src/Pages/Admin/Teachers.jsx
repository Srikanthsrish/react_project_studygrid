import React, { useState, useEffect } from "react";

const Teachers = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "Male",
    dob: "",
    address: "",
    department: "",
    teacherId: "",
    position: "",
    joiningDate: "",
    profilePicture: "",
    password: "",
  });

  const [teachers, setTeachers] = useState([]);
  const [showForm, setShowForm] = useState(false); // Toggle form visibility

  // Fetch teachers from API
  const fetchTeachers = async () => {
    try {
      const response = await fetch("http://localhost:3003/teachers");
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error("Error fetching teachers:", error.message);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3003/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      fetchTeachers(); // Refresh teachers list
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        gender: "Male",
        dob: "",
        address: "",
        department: "",
        teacherId: "",
        position: "",
        joiningDate: "",
        profilePicture: "",
        password: "",
      });
      setShowForm(false); // Hide form after submission
    } catch (error) {
      console.error("Error adding teacher:", error.message);
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Delete Teacher
  const deleteTeacher = async (id) => {
    try {
      await fetch(`http://localhost:3003/teachers/${id}`, { method: "DELETE" });
      fetchTeachers(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting teacher:", error.message);
    }
  };

  // View Teacher Details
  const viewTeacher = (teacher) => {
    alert(`Teacher Details:\nName: ${teacher.full_name}\nEmail: ${teacher.email}`);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Admin - Teachers</h1>

      {/* Add Teacher Button */}
      <button onClick={() => setShowForm(!showForm)} style={{ marginBottom: "20px" }}>
        {showForm ? "Close Form" : "Add Teacher"}
      </button>

      {/* Teacher Form */}
      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "20px" }}>
          <div>
            <label>Full Name:</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>
          <div>
            <label>Email Address:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label>Phone Number:</label>
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
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
            <label>Date of Birth:</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
          </div>
          <div>
            <label>Address:</label>
            <textarea name="address" value={formData.address} onChange={handleChange} required></textarea>
          </div>
          <div>
            <label>Department:</label>
            <input type="text" name="department" value={formData.department} onChange={handleChange} required />
          </div>
          <div>
            <label>Teacher ID:</label>
            <input type="text" name="teacherId" value={formData.teacherId} onChange={handleChange} required />
          </div>
          <div>
            <label>Position:</label>
            <input type="text" name="position" value={formData.position} onChange={handleChange} required />
          </div>
          <div>
            <label>Joining Date:</label>
            <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} required />
          </div>
          <div>
            <label>Profile Picture (URL):</label>
            <input type="text" name="profilePicture" value={formData.profilePicture} onChange={handleChange} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit">Save Teacher</button>
        </form>
      )}

      {/* Display Teachers */}
      <h2>All Teachers</h2>
      <table border="1" style={{ width: "100%", textAlign: "left", marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Teacher ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td>{teacher.teacher_id}</td>
              <td>{teacher.full_name}</td>
              <td>{teacher.email}</td>
              <td>{teacher.phone_number}</td>
              <td>
                <button onClick={() => viewTeacher(teacher)}>View</button>
                <button onClick={() => deleteTeacher(teacher.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teachers;