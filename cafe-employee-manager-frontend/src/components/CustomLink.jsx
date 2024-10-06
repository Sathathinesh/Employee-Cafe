// src/components/CustomLink.jsx
import React from 'react';
import { Button } from '@mui/material';
import { router } from '../router/router'; // Adjust the import path as needed

const CustomLink = ({ to, children, ...props }) => {
  const handleClick = (e) => {
    e.preventDefault();
    router.navigate({ to });
  };

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  );
};

export default CustomLink;
