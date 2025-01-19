
import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Login from "./Pages/LoginRegister/Login";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminLogin from "./Pages/LoginRegister/AdminLogin";
import AdminRegister from "./Pages/LoginRegister/AdminRegister";
import TeacherDashboard from "./Pages/TeacherDashboard";
import TeacherLogin from "./Pages/LoginRegister/TeacherLogin";
import StudentLogin from "./Pages/LoginRegister/StudentLogin";
import StudentDashboard from "./Pages/StudentDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/teacher/login" element={<TeacherLogin />} />
      <Route path="/student/login" element={<StudentLogin />} />
      <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
      <Route path="/teacher/dashboard/*" element={<TeacherDashboard />} />
      <Route path="/student/dashboard/*" element={<StudentDashboard />} />
    </Routes>
  );
}

export default App;

