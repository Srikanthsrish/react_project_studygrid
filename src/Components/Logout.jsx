// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Modal, Button,  } from 'antd';

// const Logout = () => {
//   const navigate = useNavigate();
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleLogout = () => {
//     // Clear session or authentication data
//     localStorage.removeItem('adminToken');
//     localStorage.removeItem('userData'); // Clear any additional data if needed

//     // Redirect to the landing page or login page
//     navigate('/'); // Landing page or Login page
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false); // Close the modal
//   };

//   return (
//     <div style={styles.container}>
      

//       {/* Logout Button to Trigger Modal */}
//       <Button
//         type="primary"
//         danger
//         onClick={showModal}
//         style={styles.logoutButton}
//       >
//         Log Out
//       </Button>

//       {/* Ant Design Modal for Confirmation */}
//       <Modal
//         title="Log Out Confirmation"
//         visible={isModalVisible}
//         onOk={handleLogout}
//         onCancel={handleCancel}
//         okText="Log Out"
//         cancelText="Cancel"
//       >
//         <p>Are you sure you want to log out? </p>
//       </Modal>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: '2rem',
//     textAlign: 'center',
//     backgroundColor: '#f8f9fa',
//     borderRadius: '8px',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//   },
//   logoutButton: {
//     padding: '0.5rem 1rem',
//     backgroundColor: '#e74c3c',
//     color: '#fff',
//     border: 'none',
//     cursor: 'pointer',
//     borderRadius: '4px',
//   },
// };

// export default Logout;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'antd';

const Logout = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Modal
        title="Log Out Confirmation"
        open={isModalVisible}
        onOk={handleLogout}
        onCancel={() => setIsModalVisible(false)}
        okButtonProps={{ style: { backgroundColor: '#2C3E50', borderColor: '#2C3E50' } }}
        okText="Log Out"
        cancelText="Cancel"
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </div>
  );
};

export default Logout;
