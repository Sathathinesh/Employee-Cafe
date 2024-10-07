// src/router/router.js

import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from '@tanstack/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from '../pages/HomePage';
import CafesPage from '../pages/CafesPage';
import EmployeesPage from '../pages/EmployeesPage';
import Navbar from '../components/Navbar';
import AddEditCafePage from './pages/AddEditCafePage';
import AddEditEmployeePage from './pages/AddEditEmployeePage';
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
      { path: '/employees', element: <EmployeesPage /> },
      { path: '/cafes/add', component: AddEditCafePage },
      { path: '/cafes/edit/:id', component: AddEditCafePage },
      { path: '/employees/add', component: AddEditEmployeePage },
      { path: '/employees/edit/:id', component: AddEditEmployeePage },
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
