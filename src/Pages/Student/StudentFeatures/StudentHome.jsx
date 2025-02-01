import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Styled components for card layout and styling
const Container = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #EAF2F8;  // Light Blue Background
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
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
  color: #2C3E50;  // Dark Blue for heading
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  font-size: 16px;
  color: #3498DB;  // Light Blue for paragraph text
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
  color: #2C3E50;
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
    axios.get('http://localhost:5000/api/notices')
      .then(response => {
        // Filter out notices that are for students
        const studentNotices = response.data.filter(notice => notice.audience === 'students');
        setNotices(studentNotices);
      })
      .catch(error => {
        setError('Error fetching notices');
        console.error('There was an error fetching the notices!', error);
      });
  }, []);

  useEffect(() => {
    // Fetch the assignment count
    axios.get(`http://localhost:5000/api/assignment-count/${className}`)
      .then((response) => {
        setAssignmentCount(response.data.assignment_count);
      })
      .catch((error) => {
        console.error('Error fetching assignment count:', error);
      });

    // Fetch the subject count
    axios.get(`http://localhost:5000/api/subject-count/${className}`)
      .then((response) => {
        setSubjectCount(response.data.subject_count);
      })
      .catch((error) => {
        console.error('Error fetching subject count:', error);
      });
  }, [className, fullName]);

  return (
    <>
      <Container>
        <h2 style={{ color: '#2C3E50' }}>Welcome {fullName}</h2>
        <CardContainer>
          <Card>
            <CardImg src="/assignments.png" alt="Assignments" />
            <CardBody>
              <Heading>Assignment Count</Heading>
              <Paragraph>{assignmentCount !== null ? assignmentCount : 'Loading...'}</Paragraph>
            </CardBody>
          </Card>
          <Card>
            <CardImg src="/subject.png" alt="Subjects" />
            <CardBody>
              <Heading>Subjects Count</Heading>
              <Paragraph>{subjectCount !== null ? subjectCount : 'Loading...'}</Paragraph>
            </CardBody>
          </Card>
        </CardContainer>
      </Container>
      <NoticesContainer>
        <h1 style={{ color: '#2C3E50' }}>Notices for Students</h1>
        {error && <p style={{ color: '#e74c3c' }}>{error}</p>}
        {notices.length > 0 ? (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {notices.map((notice, index) => (
              <li key={index} style={{ marginBottom: '20px' }}>
                <NoticeTitle>{notice.title}</NoticeTitle>
                <NoticeDescription>{notice.description}</NoticeDescription>
                <NoticeDate><strong>Created At:</strong> {new Date(notice.created_at).toLocaleString()}</NoticeDate>
              </li>
            ))}
          </ul>
        ) : (
          <p>No notices available for students at the moment.</p>
        )}
      </NoticesContainer>
    </>
  );
};

export default StudentHome;

