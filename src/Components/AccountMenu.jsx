import React, { useState } from "react";
import { Menu as MenuIcon } from "@mui/icons-material"; // Material-UI Menu Icon

const AccountMenu = ({ toggleSidebar }) => {
  const styles = {
    menuButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#ecf0f1',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
    },
  };
 
  return (
    <div className="account-menu">
      <button style={styles.menuButton} onClick={toggleSidebar}>
        <MenuIcon fontSize="large" className="white-icon" />
      </button>
    </div>
  );
};

export default AccountMenu;

// className="menu-button" 




