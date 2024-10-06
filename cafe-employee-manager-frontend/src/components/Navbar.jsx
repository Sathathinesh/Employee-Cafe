// src/components/Navbar.jsx

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from '@tanstack/router';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Café Employee Manager
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/cafes">
          Cafes
        </Button>
        <Button color="inherit" component={Link} to="/employees">
          Employees
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
