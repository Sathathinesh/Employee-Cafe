import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import CafePage from './pages/CafePage';
import EmployeePage from './pages/EmployeePage';
import AddEditCafePage from './pages/AddEditCafePage';
import AddEditEmployeePage from './pages/AddEditEmployeePage';

const App = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/cafes" element={<CafePage />} />
        <Route path="/employees" element={<EmployeePage />} />
        <Route path="/add-cafe" element={<AddEditCafePage />} />
        <Route path="/edit-cafe/:id" element={<AddEditCafePage />} />
        <Route path="/add-employee" element={<AddEditEmployeePage />} />
        <Route path="/edit-employee/:id" element={<AddEditEmployeePage />} />
      </Routes>
    </Router>
  </Provider>
);

export default App;
