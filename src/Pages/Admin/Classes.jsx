import React, { useState, useEffect } from "react";
import axios from "axios";

function Classes() {
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [subject, setSubject] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [selectedClassId, setSelectedClassId] = useState(null);

  // Fetch classes data
  const fetchClasses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/classes");
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // Create or Update class data
  const saveClass = async () => {
    try {
      if (selectedClassId) {
        // Update
        await axios.put(`http://localhost:3000/admin/classes/${selectedClassId}`, {
          classId,
          teacherId,
          subjects: [{ name: subject, timeSlot }],
        });
        alert("Class updated successfully!");
      } else {
        // Create
        await axios.post("http://localhost:3000/admin/classes", {
          classId,
          teacherId,
          subjects: [{ name: subject, timeSlot }],
        });
        alert("Class created successfully!");
      }
      setClassId("");
      setTeacherId("");
      setSubject("");
      setTimeSlot("");
      setSelectedClassId(null);
      fetchClasses();
    } catch (error) {
      console.error("Error saving class:", error);
    }
  };

  // Delete class
  const deleteClass = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/admin/classes/${id}`);
      alert("Class deleted successfully!");
      fetchClasses();
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  // Edit class (Prefill form with existing data)
  const editClass = (cls) => {
    setSelectedClassId(cls.classId);
    setClassId(cls.classId);
    setTeacherId(cls.teacherId);
    if (cls.subjects.length > 0) {
      setSubject(cls.subjects[0].name);
      setTimeSlot(cls.subjects[0].timeSlot);
    }
  };

  return (
    <div className="App">
      <h1>Admin Classes Management</h1>

      {/* Create / Update Class Form */}
      <div>
        <h2>{selectedClassId ? "Edit Class" : "Add Class"}</h2>
        <input
          type="text"
          placeholder="Class ID"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Teacher ID"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="text"
          placeholder="Time Slot"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
        />
        <button onClick={saveClass}>
          {selectedClassId ? "Update Class" : "Add Class"}
        </button>
      </div>

      {/* Display Classes */}
      <div>
        <h2>Classes Data</h2>
        <ul>
          {classes.map((cls) => (
            <li key={cls.classId}>
              <b>Class ID:</b> {cls.classId}, <b>Teacher ID:</b> {cls.teacherId}
              <ul>
                {cls.subjects.map((sub, idx) => (
                  <li key={idx}>
                    <b>Subject:</b> {sub.name}, <b>Time Slot:</b> {sub.timeSlot}
                  </li>
                ))}
              </ul>
              <button onClick={() => editClass(cls)}>Edit</button>
              <button onClick={() => deleteClass(cls.classId)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Classes;