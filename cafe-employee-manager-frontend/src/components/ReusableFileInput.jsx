// src/components/ReusableFileInput.jsx

import React from 'react';
import { Button } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const ReusableFileInput = ({ label, name, onChange, accept, ...rest }) => {
  return (
    <div>
      <input
        accept={accept}
        style={{ display: 'none' }}
        id={`contained-button-file-${name}`}
        type="file"
        name={name}
        onChange={onChange}
        {...rest}
      />
      <label htmlFor={`contained-button-file-${name}`}>
        <Button variant="contained" component="span" startIcon={<UploadFileIcon />}>
          {label}
        </Button>
      </label>
    </div>
  );
};

export default ReusableFileInput;
