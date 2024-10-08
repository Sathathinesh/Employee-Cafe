// src/router/router.js

import {
	createRootRoute,
	createRoute,
	createRouter,
	RouterProvider,
	Outlet,
} from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from '../pages/HomePage';
import CafesPage from '../pages/CafesPage';
import EmployeesPage from '../pages/EmployeesPage';
import Navbar from '../components/Navbar';
import AddEditCafePage from '../pages/AddEditCafePage';
import AddEditEmployeePage from '../pages/AddEditEmployeePage';

// Initialize Tanstack Query Client
const queryClient = new QueryClient();

// Create a Root Layout
const RootLayout = () => (
	<>
		<Navbar />
		<Outlet />
	</>
);

// Define root route
const rootRoute = createRootRoute({
	component: RootLayout,
});

// Define child routes
const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	component: HomePage,
});

const cafesRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/cafes',
	component: CafesPage,
});

const employeesRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/employees',
	component: EmployeesPage,
});

const addCafeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/cafes/add',
	component: AddEditCafePage,
});

const editCafeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/cafes/edit/$id',
	component: AddEditCafePage,
});

const addEmployeeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/employees/add',
	component: AddEditEmployeePage,
});

const editEmployeeRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/employees/edit/$id',
	component: AddEditEmployeePage,
});

// Create route tree
const routeTree = rootRoute.addChildren([
	indexRoute,
	cafesRoute,
	employeesRoute,
	addCafeRoute,
	editCafeRoute,
	addEmployeeRoute,
	editEmployeeRoute,
]);

// Create router
const router = createRouter({ routeTree });

function AppRouter() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}

export default AppRouter;
