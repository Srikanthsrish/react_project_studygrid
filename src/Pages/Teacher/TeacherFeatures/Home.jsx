

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Spin, Card, Row, Col, Grid } from 'antd';

const { useBreakpoint } = Grid;

const Teacherhome = () => {
  const { teacherId } = useParams();
  const screens = useBreakpoint();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('https://studygrid-backendmongo.onrender.com/api/notices');
        const teacherNotices = response.data.filter(notice => notice.audience === 'teachers');
        setNotices(teacherNotices);
      } catch (err) {
        setError('Error fetching notices');
        console.error('Error fetching notices:', err);
      }
    };
    fetchNotices();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://studygrid-backendmongo.onrender.com/api/teacher-timetable?teacherId=${teacherId}`);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [teacherId]);

  if (loading) return (<div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}> <Spin tip="Loading..." size="large" />;</div>)
 
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Row gutter={[16, 16]} justify="center" style={styles.container}>
        {[
          { title: "Total Classes", value: data.totalClasses, img: "/classes.png" },
          { title: "Total Assignments", value: data.totalAssignments, img: "/assignments.png" },
          { title: "Subjects Taught", value: data.subjects, img: "/subjects.png", isList: true }
        ].map((item, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6} style={{ display: 'flex' }}>
            <Card style={styles.card}>
              <div style={styles.cardContent}>
                <img alt={item.title} src={item.img} style={styles.img} />
                <h3 style={styles.header}>{item.title}</h3>
                {item.isList ? (
                  <ul style={styles.list}>
                    {data.subjects.map((subject, i) => (
                      <li key={i} style={styles.listItem}>{subject}</li>
                    ))}
                  </ul>
                ) : (
                  <p style={styles.text}>{item.value}</p>
                )}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      

<div style={styles.noticesContainer}>
  <h1 style={styles.noticesHeader}>Notices for Teachers</h1>
  {notices.length > 0 ? (
    <div style={styles.cardsContainer}>
      {notices.map((notice, index) => (
        <Card key={index} style={styles.noticeCard} hoverable>
          <h3 style={styles.noticeTitle}><strong>Title: </strong>{notice.title}</h3>
          <p><strong>Description: </strong>{notice.description}</p>
          <p style={styles.noticeDate}><strong>Announcement Date: </strong> {new Date(notice.created_at).toLocaleString()}</p>
        </Card>
      ))}
    </div>
  ) : (
    <p>No notices available for teachers at the moment.</p>
  )}
</div>

    </>
  );
};

// ✅ Updated Styles for Equal Card Width & Height
const styles = {
  container: {
    padding: '20px',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    height: '100%', // Ensures all cards take full height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    flexGrow: 1, // Makes all cards equal height
  },
  img: {
    width: '50px',
    height: '50px',
    objectFit: 'contain',
  },
  header: {
    color: '#2C3E50',
    fontSize: '18px',
    marginBottom: '10px',
  },
  text: {
    color: '#3498DB',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    fontSize: '14px',
    flexGrow: 1,
  },
  listItem: {
    color: '#3498DB',
  },
  noticesContainer: {
    marginTop: '30px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  noticesHeader: {
    color: '#2C3E50',
    fontSize: '24px',
    marginBottom: '20px',
  },
  noticesList: {
    listStyleType: 'none',
    padding: 0,
  },
  noticeItem: {
    marginBottom: '15px',
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  noticeTitle: {
    color: '#2C3E50',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  noticeDate: {
    color: '#95A5A6',
    fontSize: '14px',
  },
};

export default Teacherhome;
