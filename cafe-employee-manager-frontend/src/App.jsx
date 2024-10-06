// App.js
import React from 'react';
import { RouterProvider } from '@tanstack/router';
import HomePage from './pages/HomePage';
import CafePage from './pages/CafesPage';
import EmployeePage from './pages/EmployeesPage';
import AddEditCafePage from './pages/AddEditCafePage';
import AddEditEmployeePage from './pages/AddEditEmployeePage';

const App = () => {
  const router = createRouter({
    routes: [
      { path: '/', component: HomePage },
      { path: '/cafes', component: CafePage },
      { path: '/employees', component: EmployeePage },
      { path: '/cafes/add', component: AddEditCafePage },
      { path: '/cafes/edit/:id', component: AddEditCafePage },
      { path: '/employees/add', component: AddEditEmployeePage },
      { path: '/employees/edit/:id', component: AddEditEmployeePage },
    ],
  });

  console.log('Starting');
  return <RouterProvider router={router} />;
};

export default App;
