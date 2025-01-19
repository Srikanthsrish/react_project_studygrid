import React, { useState, useEffect } from "react";
import axios from "axios";


function Home() {
  const [dashboard, setDashboard] = useState({
    totalClasses: 0,
    totalTeachers: 0,
    totalStudents: 0,
    subjectsOffered: 0,
    pendingRequests: 0,
  });

  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  // Fetch dashboard data
  useEffect(() => {
    async function fetchData() {
      try {
        const dashboardData = await axios.get("http://localhost:3000/admin/dashboard");
        setDashboard(dashboardData.data);

        const classData = await axios.get("http://localhost:3000/admin/classes");
        setClasses(classData.data);

        const teacherData = await axios.get("http://localhost:3000/admin/teachers");
        setTeachers(teacherData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <header>
        <h1></h1>
      </header>

      <div className="dashboard">
        <div className="card">
          <h2>Total Classes</h2>
          <p>{dashboard.totalClasses}</p>
        </div>
        <div className="card">
          <h2>Total Teachers</h2>
          <p>{dashboard.totalTeachers}</p>
        </div>
        <div className="card">
          <h2>Total Students</h2>
          <p>{dashboard.totalStudents}</p>
        </div>
        <div className="card">
          <h2>Subjects Offered</h2>
          <p>{dashboard.subjectsOffered}</p>
        </div>
        <div className="card">
          <h2>Pending Requests</h2>
          <p>{dashboard.pendingRequests}</p>
        </div>
      </div>

      <div className="section">
        <h2>Class Management</h2>
        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>Students</th>
              <th>Class Teacher</th>
              <th>Subjects</th>
              <th>Timetable</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls.classId}>
                <td>{cls.classId}</td>
                <td>{cls.studentsCount}</td>
                <td>{cls.classTeacher}</td>
                <td>{cls.subjects.join(", ")}</td>
                <td><button>View/Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2>Teacher Management</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Classes</th>
              <th>Subjects</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.teacherId}>
                <td>{teacher.name}</td>
                <td>{teacher.teacherId}</td>
                <td>{teacher.classes.join(", ")}</td>
                <td>{teacher.subjects.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;