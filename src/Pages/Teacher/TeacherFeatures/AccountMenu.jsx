import React from 'react';
import { Menu as MenuIcon, AccountCircle as ProfileIcon, ExitToApp as LogoutIcon } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

const AccountMenu = ({ toggleSidebar }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
    <div>
      <button style={styles.menuButton} onClick={toggleSidebar}>
        <MenuIcon fontSize="large" />
      </button>
      <Button onClick={handleClick} style={{ marginLeft: '10px', color: '#ecf0f1' }}>
        {/* <ProfileIcon fontSize="large" /> */}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <Link to="/teacher/dashboard/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ProfileIcon style={{ marginRight: '10px' }} />
            Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/teacher/logout" style={{ textDecoration: 'none', color: 'inherit' }}>
            <LogoutIcon style={{ marginRight: '10px' }} />
            Logout
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AccountMenu;



