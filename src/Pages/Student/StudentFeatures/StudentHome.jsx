
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Styled components for card layout and styling
const Container = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #eaf2f8; // Light Blue Background
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column; /* Default to column for mobile */
  align-items: center;
  gap: 20px;
  
  @media (min-width: 768px) {
    flex-direction: row; /* Change to row for tablets and larger screens */
    justify-content: space-around;
  }
`;

const Card = styled.div`
  width: 250px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #fff;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const CardImg = styled.img`
  width: 70%;
  height: 120px;
  object-fit: contain; /* Keeps the image proportions */
  margin: 15px auto;
`;

const CardBody = styled.div`
  padding: 15px;
`;

const Heading = styled.h3`
  font-size: 18px;
  color: #2c3e50; // Dark Blue for heading
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  font-size: 16px;
  color: #3498db; // Light Blue for paragraph text
`;

const NoticesContainer = styled.div`
  margin-top: 40px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NoticeTitle = styled.h3`
  font-size: 18px;
  color: #2c3e50;
`;

const NoticeDescription = styled.p`
  color: #555;
  font-size: 16px;
`;

const NoticeDate = styled.p`
  font-size: 14px;
  color: #888;
`;

const StudentHome = () => {
  const { class: className, fullName } = useParams(); // Get class and fullName from URL parameters
  const [assignmentCount, setAssignmentCount] = useState(null);
  const [subjectCount, setSubjectCount] = useState(null);
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://studygrid-backendmongo.onrender.com/api/notices")
      .then((response) => {
        const studentNotices = response.data.filter((notice) => notice.audience === "students");
        setNotices(studentNotices);
      })
      .catch((error) => {
        setError("Error fetching notices");
        console.error("There was an error fetching the notices!", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://studygrid-backendmongo.onrender.com/api/assignment-count/${className}`)
      .then((response) => {
        setAssignmentCount(response.data.assignment_count);
      })
      .catch((error) => {
        console.error("Error fetching assignment count:", error);
      });

    axios
      .get(`https://studygrid-backendmongo.onrender.com/api/subject-count/${className}`)
      .then((response) => {
        setSubjectCount(response.data.subject_count);
      })
      .catch((error) => {
        console.error("Error fetching subject count:", error);
      });
  }, [className, fullName]);

  return (
    <>
      <Container>
        <h2 style={{ color: "#2C3E50" }}>Welcome {fullName}</h2>
        <CardContainer>
          <Card>
            <CardImg src="/assignments.png" alt="Assignments" />
            <CardBody>
              <Heading>Assignment Count</Heading>
              <Paragraph>{assignmentCount !== null ? assignmentCount : "Loading..."}</Paragraph>
            </CardBody>
          </Card>
          <Card>
            <CardImg src="/subject.png" alt="Subjects" />
            <CardBody>
              <Heading>Subjects Count</Heading>
              <Paragraph>{subjectCount !== null ? subjectCount : "Loading..."}</Paragraph>
            </CardBody>
          </Card>
        </CardContainer>
      </Container>
      

<NoticesContainer>
  <h1 style={{ color: "#2C3E50", textAlign: "center" }}>Notices for Students</h1>
  {error && <p style={{ color: "#e74c3c", textAlign: "center" }}>{error}</p>}

  {notices.length > 0 ? (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
      {notices.map((notice, index) => (
        <Card 
          key={index}
          style={{
            width: "90%", 
            maxWidth: "900px", 
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#FFFFFF"
          }}
        >
          <NoticeTitle style={{ fontSize: "18px", fontWeight: "bold", color: "#2C3E50" }}>
          <strong>Notice Title: </strong>{notice.title}
          </NoticeTitle>
          <NoticeDescription style={{ color: "#555", marginTop: "10px" }}>
          <strong>Description: </strong>{notice.description}
          </NoticeDescription>
          <NoticeDate style={{ color: "#888", fontSize: "14px", marginTop: "10px", display: "block" }}>
            <strong>Announcement Date: </strong> {new Date(notice.created_at).toLocaleString()}
          </NoticeDate>
        </Card>
      ))}
    </div>
  ) : (
    <p style={{ textAlign: "center" }}>No notices available for students at the moment.</p>
  )}
</NoticesContainer>

    </>
  );
};

export default StudentHome;

