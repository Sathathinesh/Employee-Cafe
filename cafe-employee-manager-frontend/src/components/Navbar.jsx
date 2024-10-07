// src/components/Navbar.jsx

import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import CustomLink from './CustomLink';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Café Employee Manager
        </Typography>
        <CustomLink variant="contained" color="inherit" to="/">
           Home
        </CustomLink>
        <CustomLink variant="contained" color="inherit" to="/cafes">
        Cafes
        </CustomLink>
        <CustomLink variant="contained" color="inherit" to="/employees">
        Employees
        </CustomLink>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
