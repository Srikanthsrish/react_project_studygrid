import React from "react";

const Classes = () => {
  const classes = [
    { id: 1, name: "Mathematics - Grade 10", time: "9:00 AM - 10:00 AM" },
    { id: 2, name: "Science - Grade 9", time: "10:15 AM - 11:15 AM" },
    { id: 3, name: "English - Grade 8", time: "11:30 AM - 12:30 PM" },
    { id: 4, name: "History - Grade 11", time: "1:30 PM - 2:30 PM" },
  ];

  return (
    <div>
      <h1>My Classes</h1>
      <table border="1" style={{ width: "80%", margin: "20px auto", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Class ID</th>
            <th>Class Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem) => (
            <tr key={classItem.id}>
              <td>{classItem.id}</td>
              <td>{classItem.name}</td>
              <td>{classItem.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Classes;