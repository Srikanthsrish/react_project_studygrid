import React, { useState, useEffect } from "react";
import axios from "axios";



    function Home() {
  const [teacherDetails, setTeacherDetails] = useState({
    name: "",
    assignedClasses: [],
    subjects: [],
    timetable: [],
    performance: { totalClasses: 0, classesAttended: 0, attendanceRate: 0 },
  });

  // Fetch teacher's data
  useEffect(() => {
    async function fetchData() {
      try {
        const teacherData = await axios.get("http://localhost:3000/teacher/dashboard");
        setTeacherDetails(teacherData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Welcome, {teacherDetails.name}</h1>
      </header>

      <div className="dashboard">
        <div className="card">
          <h2>Total Classes</h2>
          <p>{teacherDetails.performance.totalClasses}</p>
        </div>
        <div className="card">
          <h2>Classes Attended</h2>
          <p>{teacherDetails.performance.classesAttended}</p>
        </div>
        <div className="card">
          <h2>Attendance Rate</h2>
          <p>{teacherDetails.performance.attendanceRate}%</p>
        </div>
      </div>

      <div className="section">
        <h2>Assigned Classes</h2>
        <ul>
          {teacherDetails.assignedClasses.map((cls, index) => (
            <li key={index}>
              <b>Class:</b> {cls.className}, <b>Subject:</b> {cls.subjectName}
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>Timetable</h2>
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Time</th>
              <th>Subject</th>
            </tr>
          </thead>
          <tbody>
            {teacherDetails.timetable.map((entry, index) => (
              <tr key={index}>
                <td>{entry.day}</td>
                <td>{entry.time}</td>
                <td>{entry.subject}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;