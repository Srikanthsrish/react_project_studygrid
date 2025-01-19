
import React from 'react';
import { Menu as MenuIcon } from '@mui/icons-material';

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
    <button style={styles.menuButton} onClick={toggleSidebar}>
      <MenuIcon fontSize="large" />
    </button>
  );
};

export default AccountMenu;

