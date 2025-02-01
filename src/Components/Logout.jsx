// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Landing from '../Pages/Landing';
// const Logout = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear any session or authentication data
//     localStorage.removeItem("adminToken");

//     // Redirect to the landing page or login page
//     navigate('/'); // Landing page or Login page
//   };

//   const handleCancel = () => {
//     // Redirect back to the previous page
//     navigate(-1); // Go back to the previous page
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Are you sure you want to log out?</h2>
//       <div style={styles.buttonContainer}>
//         <button style={styles.logoutButton} onClick={handleLogout}>
//           Log Out
//         </button>
//         <button style={styles.cancelButton} onClick={handleCancel}>
//           Cancel
//         </button>
//       </div>
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
//   buttonContainer: {
//     marginTop: '1rem',
//     display: 'flex',
//     gap: '1rem',
//   },
//   logoutButton: {
//     padding: '0.5rem 1rem',
//     backgroundColor: '#e74c3c',
//     color: '#fff',
//     border: 'none',
//     cursor: 'pointer',
//     borderRadius: '4px',
//   },
//   cancelButton: {
//     padding: '0.5rem 1rem',
//     backgroundColor: '#95a5a6',
//     color: '#fff',
//     border: 'none',
//     cursor: 'pointer',
//     borderRadius: '4px',
//   },
// };

// export default Logout;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, notification } from 'antd';

const Logout = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleLogout = () => {
    // Clear session or authentication data
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userData'); // Clear any additional data if needed

    // Redirect to the landing page or login page
    navigate('/'); // Landing page or Login page
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Close the modal
  };

  return (
    <div style={styles.container}>
      <h2>Are you sure you want to log out?</h2>

      {/* Logout Button to Trigger Modal */}
      <Button
        type="primary"
        danger
        onClick={showModal}
        style={styles.logoutButton}
      >
        Log Out
      </Button>

      {/* Ant Design Modal for Confirmation */}
      <Modal
        title="Log Out Confirmation"
        visible={isModalVisible}
        onOk={handleLogout}
        onCancel={handleCancel}
        okText="Log Out"
        cancelText="Cancel"
      >
        <p>Are you sure you want to log out? You will be redirected to the landing page.</p>
      </Modal>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  logoutButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};

export default Logout;
