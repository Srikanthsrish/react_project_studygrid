// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, Row, Col, Spin, message, Grid } from "antd";

// const { useBreakpoint } = Grid;

// const AdminHome = () => {
//   const [stats, setStats] = useState({
//     totalTeachers: 0,
//     totalStudents: 0,
//     totalClasses: 0,
//     maleStudents:0,
//     femaleStudents:0,
//     maleTeachers:0,
//     femaleTeachers:0
//   });
//   const [loading, setLoading] = useState(true);
//   const screens = useBreakpoint();

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
//             <Col
//               xs={24}
//               sm={12}
//               md={8}
//               lg={6}
//               xl={4}
//               key={index}
//               style={{ marginBottom: screens.xs ? "20px" : "40px" }} // Add responsive margin
//             >
//               <Card
//                 hoverable
//                 style={{
//                   textAlign: "center",
//                   borderRadius: "10px",
//                   boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                 }}
//                 bodyStyle={{
//                   padding: "20px",
//                   backgroundColor: "#FFFFFF",
//                   borderRadius: "10px",
//                 }}
//               >
//                 <img
//                   src={card.img}
//                   alt={card.title}
//                   style={{
//                     width: "80px",
//                     height: "80px",
//                     marginBottom: "15px",
//                   }}
//                 />
//                 <h3 style={{ color: "#2C3E50" }}>{card.title}</h3>
//                 <p
//                   style={{
//                     fontSize: screens.xs ? "1.25rem" : "1.5rem",
//                     color: "#3498DB",
//                     fontWeight: "bold",
//                   }}
//                 >
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
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, Row, Col, Spin, message, Grid } from "antd";

// const { useBreakpoint } = Grid;

// const AdminHome = () => {
//   const [stats, setStats] = useState({
//     totalTeachers: 0,
//     totalStudents: 0,
//     totalClasses: 0,
//     maleStudents: 0,
//     femaleStudents: 0,
//     maleTeachers: 0,
//     femaleTeachers: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const screens = useBreakpoint();

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await axios.get(
//           "https://studygrid-backendmongo.onrender.com/api/stats"
//         );
//         setStats(response.data);
//       } catch (error) {
//         console.error("Error fetching stats:", error);
//         message.error("Failed to load stats. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStats();
//   }, []);

//   // Helper function to format numbers
//   const formatNumber = (num) => new Intl.NumberFormat().format(num);

//   const cardData = [
//     {
//       title: "Total Teachers",
//       title1: "Male Teachers",
//       title2: "Female Teachers",
//       value: stats.totalTeachers,
//       value1: stats.maleTeachers,
//       value2: stats.femaleTeachers,
//       img: "/img3.png",
//     },
//     {
//       title: "Total Students",
//       title1: "Male Students",
//       title2: "Female Students",
//       value: stats.totalStudents,
//       value1: stats.maleStudents,
//       value2: stats.femaleStudents,
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
//             <Col
//               xs={24}
//               sm={12}
//               md={8}
//               lg={6}
//               xl={4}
//               key={index}
//               style={{ marginBottom: screens.xs ? "20px" : "40px" }}
//             >
//               <Card
//                 hoverable
//                 style={{
//                   textAlign: "center",
//                   borderRadius: "10px",
//                   boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                 }}
//                 bodyStyle={{
//                   padding: "20px",
//                   backgroundColor: "#FFFFFF",
//                   borderRadius: "10px",
//                 }}
//               >
//                 {/* Image Section */}
//                 <div style={{ display: "flex", justifyContent: "center", marginBottom: "15px" }}>
//                   <img
//                     src={card.img}
//                     alt={card.title}
//                     style={{
//                       width: "80px",
//                       height: "80px",
//                     }}
//                   />
//                 </div>

//                 {/* Data Section */}
//                 <div>
//                   <h3 style={{ color: "#2C3E50", marginBottom: "8px" }}>{card.title}</h3>
//                   <p
//                     style={{
//                       fontSize: screens.xs ? "1.25rem" : "1.5rem",
//                       color: "#3498DB",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {formatNumber(card.value)}
//                   </p>
//                   {card.title1 && card.title2 && (
//                     <div style={{ fontSize: "14px", color: "#555", marginTop: "8px" }}>
//                       <p style={{ margin: "5px 0" }}>
//                         <strong> {card.title1}:</strong> {formatNumber(card.value1)}
//                       </p>
//                       <p style={{ margin: "5px 0" }}>
//                         <strong> {card.title2}:</strong> {formatNumber(card.value2)}
//                       </p>
//                     </div>
//                   )}
//                 </div>
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
    maleStudents: 0,
    femaleStudents: 0,
    maleTeachers: 0,
    femaleTeachers: 0,
  });
  const [loading, setLoading] = useState(true);
  const screens = useBreakpoint();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "https://studygrid-backendmongo.onrender.com/api/stats"
        );
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
        message.error("Failed to load stats. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Helper function to format numbers
  const formatNumber = (num) => new Intl.NumberFormat().format(num);

  const cardData = [
    {
      title: "Total Teachers",
      title1: "Male Teachers",
      title2: "Female Teachers",
      value: stats.totalTeachers,
      value1: stats.maleTeachers,
      value2: stats.femaleTeachers,
      img: "/img3.png",
    },
    {
      title: "Total Students",
      title1: "Male  ",
      title2: "Female ",
      value: stats.totalStudents,
      value1: stats.maleStudents,
      value2: stats.femaleStudents,
      img: "/img1.png",
    },
    {
      title: "Total Classes",
      title1: "Classes",
      value: stats.totalClasses,
      value1: "LKG-5th",
      img: "/img2.png",
    },
  ];

  return (
    <div style={{ padding: "20px", backgroundColor: "#EAF2F8", minHeight: "100vh" }}>
      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          {cardData.map((card, index) => (
            <Card
              key={index}
              hoverable
              style={{
                flex: "1 1 300px", // Each card will take minimum 300px, and grow
                maxWidth: "400px", // Prevents cards from becoming too wide
                borderRadius: "10px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
              bodyStyle={{
                padding: "20px",
                backgroundColor: "#FFFFFF",
                borderRadius: "10px",
              }}
            >
              {/* Flex Row for Image and Data */}
              <div
                style={{
                  display: "flex",
                  flexDirection: screens.xs ? "column" : "row",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                {/* Image Section */}
                <div>
                  <img
                    src={card.img}
                    alt={card.title}
                    style={{
                      width: "80px",
                      height: "80px",
                    }}
                  />
                </div>

                {/* Data Section */}
                <div
                  style={{
                    textAlign: screens.xs ? "center" : "left",
                    fontSize: screens.xs ? "1.25rem" : "1.5rem",
                    color: "#2C3E50",
                    fontWeight: "bold",
                    backgroundColor: "#f9f9f9", // Optional for contrast
                    padding: "10px", // Adjust for spacing
                    borderRadius: "8px", // Soft rounded edges
                  }}
                >
                  <p style={{ marginBottom: "8px" }}>
                    <strong>{card.title}:</strong> {formatNumber(card.value)}
                  </p>
                  {card.title1 && card.title2 && (
                    <>
                      <p style={{ fontSize: "14px", color: "#555", marginBottom: "5px" }}>
                        <strong>{card.title1}:</strong> {formatNumber(card.value1)}
                      </p>
                      <p style={{ fontSize: "14px", color: "#555", marginBottom: "5px" }}>
                        <strong>{card.title2}:</strong> {formatNumber(card.value2)}
                      </p>
                    </>
                  )}
                </div>

              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminHome;
