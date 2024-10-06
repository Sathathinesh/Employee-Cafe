// src/pages/HomePage.jsx

import React from 'react';
import { Container, Stack } from '@mui/material';
import CustomLink from '../components/CustomLink';

const HomePage = () => {
  return (
    <Container style={{ marginTop: '2rem', textAlign: 'center' }}>
      <h1>Welcome to Café Employee Manager</h1>
      <Stack spacing={2} direction="row" justifyContent="center" style={{ marginTop: '2rem' }}>
        <CustomLink variant="contained" color="primary" to="/cafes">
          Manage Cafes
        </CustomLink>
        <CustomLink variant="contained" color="secondary" to="/employees">
          Manage Employees
        </CustomLink>
      </Stack>
    </Container>
  );
};

export default HomePage;
