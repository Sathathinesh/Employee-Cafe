// src/router/router.js

import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from '@tanstack/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from '../pages/HomePage';
import CafesPage from '../pages/CafesPage';
import EmployeesPage from '../pages/EmployeesPage';
import AddEditCafePage from '../pages/AddEditCafePage';
import AddEditEmployeePage from '../pages/AddEditEmployeePage';
import Navbar from '../components/Navbar';

// Initialize Tanstack Query Client
const queryClient = new QueryClient();

// Create a Root Layout
const RootLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);


const routes = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/cafes', element: <CafesPage /> },
      { path: '/cafes/add', element: <AddEditCafePage /> },
      { path: '/cafes/edit/:id', element: <AddEditCafePage /> },
      { path: '/employees', element: <EmployeesPage /> },
      { path: '/employees/add', element: <AddEditEmployeePage /> },
      { path: '/employees/edit/:id', element: <AddEditEmployeePage /> },
    ],
  },
];

// Create router
const router = createBrowserRouter(routes);


export {router};

function AppRouter() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default AppRouter;
