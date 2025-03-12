
import React from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./Pages/Landing/Landing";
import Login from "./Pages/Auth/Login";
import AdminDashboard from "./Pages/Admin/Admindashboard/AdminDashboard";
import AdminLogin from "./Pages/Auth/AdminLogin";
import AdminRegister from "./Pages/Auth/AdminRegister";
import TeacherDashboard from "./Pages/Teacher/TeacherDashboard/TeacherDashboard";
import TeacherLogin from "./Pages/Auth/TeacherLogin";
import StudentLogin from "./Pages/Auth/StudentLogin";
import StudentDashboard from "./Pages/Student/StudentDashboard/StudentDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/role/login" element={<Login />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/teacher/login" element={<TeacherLogin />} />
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
      <Route path="/teacher/dashboard/*" element={<TeacherDashboard />} />
      <Route path="/teacher/dashboard/:teacherId/*" element={<TeacherDashboard />} />
      <Route path="/student/dashboard/*" element={<StudentDashboard />} />
      <Route path="/admin/dashboard/:admin_id/*" element={<AdminDashboard />} />
      <Route path="/student/dashboard/:fullName/:class/*" element={<StudentDashboard />} />
    </Routes>
  );
}

export default App;

