// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, Row, Col, Spin, message } from "antd";

// const AdminHome = () => {
//   const [stats, setStats] = useState({
//     totalTeachers: 0,
//     totalStudents: 0,
//     totalClasses: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await axios.get("https://studygrid-backendmongo.onrender.com/api/stats");
//         setStats(response.data);
//       } catch (error) {
//         message.error("Failed to load stats.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStats();
//   }, []);

//   const cardData = [
//     {
//       title: "Total Teachers",
//       value: stats.totalTeachers,
//       img: "/img3.png",
//     },
//     {
//       title: "Total Students",
//       value: stats.totalStudents,
//       img: "/img1.png",
//     },
//     {
//       title: "Total Classes",
//       value: stats.totalClasses,
//       img: "/img2.png",
//     },
//   ];

//   return (
//     <div style={{ padding: "20px", backgroundColor: "#EAF2F8", minHeight: "100vh" }}>
//       {loading ? (
//         <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
//       ) : (
//         <Row gutter={[16, 16]} justify="center">
//           {cardData.map((card, index) => (
//             <Col xs={24} sm={12} md={8} key={index}>
//               <Card
//                 hoverable
//                 style={{ textAlign: "center", borderRadius: "10px" }}
//                 bodyStyle={{ padding: "20px" }}
//               >
//                 <img
//                   src={card.img}
//                   alt={card.title}
//                   style={{ width: "80px", height: "80px", marginBottom: "15px" }}
//                 />
//                 <h3 style={{ color: "#2C3E50" }}>{card.title}</h3>
//                 <p style={{ fontSize: "1.5rem", color: "#3498DB", fontWeight: "bold" }}>
//                   {card.value}
//                 </p>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       )}
//     </div>
//   );
// };

// export default AdminHome;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, Spin, message, Grid } from "antd";

const { useBreakpoint } = Grid;

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalTeachers: 0,
    totalStudents: 0,
    totalClasses: 0,
  });
  const [loading, setLoading] = useState(true);
  const screens = useBreakpoint();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("https://studygrid-backendmongo.onrender.com/api/stats");
        setStats(response.data);
      } catch (error) {
        message.error("Failed to load stats.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cardData = [
    {
      title: "Total Teachers",
      value: stats.totalTeachers,
      img: "/img3.png",
    },
    {
      title: "Total Students",
      value: stats.totalStudents,
      img: "/img1.png",
    },
    {
      title: "Total Classes",
      value: stats.totalClasses,
      img: "/img2.png",
    },
  ];

  return (
    <div style={{ padding: "20px", backgroundColor: "#EAF2F8", minHeight: "100vh" }}>
      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
      ) : (
        <Row gutter={[16, 16]} justify="center">
          {cardData.map((card, index) => (
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={4}
              key={index}
              style={{ marginBottom: screens.xs ? "20px" : "40px" }} // Add responsive margin
            >
              <Card
                hoverable
                style={{
                  textAlign: "center",
                  borderRadius: "10px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
                bodyStyle={{
                  padding: "20px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "10px",
                }}
              >
                <img
                  src={card.img}
                  alt={card.title}
                  style={{
                    width: "80px",
                    height: "80px",
                    marginBottom: "15px",
                  }}
                />
                <h3 style={{ color: "#2C3E50" }}>{card.title}</h3>
                <p
                  style={{
                    fontSize: screens.xs ? "1.25rem" : "1.5rem",
                    color: "#3498DB",
                    fontWeight: "bold",
                  }}
                >
                  {card.value}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default AdminHome;
