// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/router';
import './index.css'; // Your global CSS

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);
