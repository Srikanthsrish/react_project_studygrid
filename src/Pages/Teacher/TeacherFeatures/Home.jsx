// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Spin, Button, notification, Card } from 'antd';

// const Teacherhome = () => {
//   const { teacherId } = useParams();  // Get teacherId from URL params
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [notices, setNotices] = useState([]);

//   useEffect(() => {
//     axios.get('https://studygrid-backendmongo.onrender.com/api/notices')
//       .then(response => {
//         // Filter out notices that aren't for teachers
//         const teacherNotices = response.data.filter(notice => notice.audience === 'teachers');
//         setNotices(teacherNotices);
//       })
//       .catch(error => {
//         setError('Error fetching notices');
//         console.error('There was an error fetching the notices!', error);
//       });
//   }, []);

//   // Fetch data from the backend
//   useEffect(() => {
//     axios.get(`https://studygrid-backendmongo.onrender.com/api/teacher-timetable?teacherId=${teacherId}`)
//       .then((response) => {
//         setData(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error.message);
//         setLoading(false);
//       });
//   }, [teacherId]);

//   if (loading) {
//     return <Spin tip="Loading..." size="large" />;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <>
//       <div style={styles.container}>
//         <Card style={styles.card}>
//           <div style={styles.cardContent}>
//             <img
//               alt="Classes Icon"
//               src="/classes.png" // Image path for Total Classes
//               style={styles.img}
//             />
            
//               <h3 style={styles.header}>Total Classes</h3>
//               <p style={styles.text}>{data.totalClasses}</p>
            
//           </div>
//         </Card>

//         <Card style={styles.card}>
//           <div style={styles.cardContent}>
//             <img
//               alt="Assignments Icon"
//               src="/assignments.png" // Image path for Total Assignments
//               style={styles.img}
//             />
            
//               <h3 style={styles.header}>Total Assignments</h3>
//               <p style={styles.text}>{data.totalAssignments}</p>
            
//           </div>
//         </Card>

//         <Card style={styles.card}>
//           <div style={styles.cardContent}>
//             <img
//               alt="Subjects Icon"
//               src="/subjects.png" // Image path for Subjects Taught
//               style={styles.img}
//             />
            
//               <h3 style={styles.header}>Subjects Taught</h3>
//               <ul style={styles.list}>
//                 {data.subjects.map((subject, index) => (
//                   <li key={index} style={styles.listItem}>{subject}</li>
//                 ))}
//               </ul>
            
//           </div>
//         </Card>
//       </div>

//       <div style={styles.noticesContainer}>
//         <h1 style={styles.noticesHeader}>Notices for Teachers</h1>
//         {error && <p>{error}</p>}
//         <ul style={styles.noticesList}>
//           {notices.length > 0 ? (
//             notices.map((notice, index) => (
//               <li key={index} style={styles.noticeItem}>
//                 <h3 style={styles.noticeTitle}>{notice.title}</h3>
//                 <p>{notice.description}</p>
//                 <p style={styles.noticeDate}><strong>Created At:</strong> {new Date(notice.created_at).toLocaleString()}</p>
//               </li>
//             ))
//           ) : (
//             <p>No notices available for teachers at the moment.</p>
//           )}
//         </ul>
//       </div>
//     </>
//   );
// };

// // Inline styles
// const styles = {
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     gap: '20px',
//     backgroundColor: '#EAF2F8', // Light Blue background for the section
//     padding: '20px',
//     borderRadius: '10px',
//     justifyContent: 'space-evenly',
//   },
//   card: {
//     backgroundColor: '#FFFFFF', // White background for cards
//     border: '1px solid #ddd',
//     borderRadius: '10px',
//     padding: '20px',
//     width: '250px', // Slightly wider card
//     textAlign: 'center',
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//     transition: 'transform 0.3s ease-in-out',
//   },
//   cardContent: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     gap: '15px',
//   },
//   img: {
//     width: '50px', // Image size
//     height: '50px',
//     objectFit: 'contain',
//   },
//   header: {
//     color: '#2C3E50', // Dark Blue for header
//     fontSize: '18px',
//     marginBottom: '10px',
//   },
//   text: {
//     color: '#3498DB', // Light Blue for text
//   },
//   list: {
//     listStyleType: 'none',
//     padding: 0,
//     fontSize: '14px',
//   },
//   listItem: {
//     color: '#3498DB', // Light Blue for list items
//   },
//   noticesContainer: {
//     marginTop: '30px',
//     backgroundColor: '#fff',
//     padding: '20px',
//     borderRadius: '10px',
//     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//   },
//   noticesHeader: {
//     color: '#2C3E50',
//     fontSize: '24px',
//     marginBottom: '20px',
//   },
//   noticesList: {
//     listStyleType: 'none',
//     padding: 0,
//   },
//   noticeItem: {
//     marginBottom: '15px',
//     padding: '10px',
//     borderBottom: '1px solid #ddd',
//   },
//   noticeTitle: {
//     color: '#2C3E50',
//     fontSize: '18px',
//     fontWeight: 'bold',
//   },
//   noticeDate: {
//     color: '#95A5A6', // Greyish color for date
//     fontSize: '14px',
//   },
// };

// export default Teacherhome;

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

  if (loading) return <Spin tip="Loading..." size="large" />;
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
          <ul style={styles.noticesList}>
            {notices.map((notice, index) => (
              <li key={index} style={styles.noticeItem}>
                <h3 style={styles.noticeTitle}>{notice.title}</h3>
                <p>{notice.description}</p>
                <p style={styles.noticeDate}><strong>Created At:</strong> {new Date(notice.created_at).toLocaleString()}</p>
              </li>
            ))}
          </ul>
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
