import React, { useState, useEffect } from "react";
import axios from "axios";


function Home() {
  const [studentDetails, setStudentDetails] = useState({
    name: "",
    assignedClasses: [],
    grades: [],
    assignments: [],
    performance: { totalSubjects: 0, completedAssignments: 0, gradePointAverage: 0 },
  });

  // Fetch student data
  useEffect(() => {
    async function fetchData() {
      try {
        const studentData = await axios.get("http://localhost:3000/student/dashboard");
        setStudentDetails(studentData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Welcome, {studentDetails.name}</h1>
      </header>

      <div className="dashboard">
        <div className="card">
          <h2>Total Subjects</h2>
          <p>{studentDetails.performance.totalSubjects}</p>
        </div>
        <div className="card">
          <h2>Completed Assignments</h2>
          <p>{studentDetails.performance.completedAssignments}</p>
        </div>
        <div className="card">
          <h2>GPA</h2>
          <p>{studentDetails.performance.gradePointAverage}</p>
        </div>
      </div>

      <div className="section">
        <h2>Assigned Classes</h2>
        <ul>
          {studentDetails.assignedClasses.map((cls, index) => (
            <li key={index}>
              <b>Class:</b> {cls.className}, <b>Subject:</b> {cls.subjectName}
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>Grades</h2>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {studentDetails.grades.map((grade, index) => (
              <tr key={index}>
                <td>{grade.subject}</td>
                <td>{grade.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2>Upcoming Assignments</h2>
        <ul>
          {studentDetails.assignments.map((assignment, index) => (
            <li key={index}>
              <b>Assignment:</b> {assignment.name} <b>Due:</b> {assignment.dueDate}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;