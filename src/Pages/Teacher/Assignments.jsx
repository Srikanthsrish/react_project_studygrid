import React, { useEffect, useState } from "react";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data for classes and assignments
    const fetchData = async () => {
      try {
        // Fetch teacher's classes
        const classRes = await fetch("https://api.example.com/teacher/classes");
        if (!classRes.ok) throw new Error("Failed to fetch classes");
        const classData = await classRes.json();

        // Fetch assignments for the classes
        const assignmentsRes = await fetch(
          "https://api.example.com/teacher/assignments"
        );
        if (!assignmentsRes.ok) throw new Error("Failed to fetch assignments");
        const assignmentsData = await assignmentsRes.json();

        setClasses(classData);
        setAssignments(assignmentsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div>
      <h1>Assignments by Class</h1>
      {classes.map((classItem) => (
        <div key={classItem.id} style={{ marginBottom: "20px" }}>
          <h2>{classItem.name}</h2>
          <ul>
            {assignments
              .filter((assignment) => assignment.classId === classItem.id)
              .map((assignment) => (
                <li key={assignment.id}>
                  <strong>{assignment.title}</strong>: {assignment.description}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Assignments;