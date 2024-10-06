// src/components/ReusableRadioGroup.jsx

import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const ReusableRadioGroup = ({ label, name, value, onChange, options, required }) => {
  return (
    <FormControl component="fieldset" margin="normal" required={required}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup row name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default ReusableRadioGroup;
