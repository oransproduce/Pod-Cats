import React from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

export default function NavMenu({ anchorEl, setAnchorEl }) {
  const auth = useAuth();
  const handleClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };
  return (
    <>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/">
            <Button>
              Home
            </Button>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/login">
            <Button>
              Login
            </Button>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/signup">
            <Button>
              Signup
            </Button>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Button onClick={auth.logout}>
          Logout
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
}