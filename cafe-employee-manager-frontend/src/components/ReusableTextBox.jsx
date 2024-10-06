// src/components/ReusableTextBox.jsx

import React from 'react';
import { TextField } from '@mui/material';

const ReusableTextBox = ({ label, name, value, onChange, required, type, inputProps, ...rest }) => {
  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      type={type || 'text'}
      inputProps={inputProps}
      margin="normal"
      variant="outlined"
      {...rest}
    />
  );
};

export default ReusableTextBox;
