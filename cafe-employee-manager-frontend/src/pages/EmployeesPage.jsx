// src/pages/EmployeesPage.jsx

import { useState } from 'react';
import { Container, TextField, Stack } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchEmployees, deleteEmployee } from '../api/api';
import ConfirmDialog from '../components/ConfirmDialog';
import CustomLink from '../components/CustomLink';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const EmployeesPage = () => {
	const queryClient = useQueryClient();
	const [filter, setFilter] = useState('');
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [employeeToDelete, setEmployeeToDelete] = useState(null);

	const {
		data: employees,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['employees', filter],
		queryFn: () => fetchEmployees(filter),
		keepPreviousData: true,
	});

	const deleteMutation = useMutation({
		mutationFn: (id) => deleteEmployee(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['employees'] });
		},
	});

	const handleDelete = (id) => {
		setEmployeeToDelete(id);
		setConfirmOpen(true);
	};

	const confirmDelete = () => {
		deleteMutation.mutate(employeeToDelete);
		setConfirmOpen(false);
		setEmployeeToDelete(null);
	};

	const cancelDelete = () => {
		setConfirmOpen(false);
		setEmployeeToDelete(null);
	};

	const columns = [
		{
			headerName: 'Employee ID',
			field: 'id',
			sortable: true,
			filter: true,
		},
		{ headerName: 'Name', field: 'name', sortable: true, filter: true },
		{
			headerName: 'Email Address',
			field: 'email_address',
			sortable: true,
			filter: true,
		},
		{
			headerName: 'Phone Number',
			field: 'phone_number',
			sortable: true,
			filter: true,
		},
		{
			headerName: 'Days Worked',
			field: 'days_worked',
			sortable: true,
			filter: true,
		},
		{
			headerName: 'Café Name',
			field: 'cafe',
			sortable: true,
			filter: true,
		},
		{
			headerName: 'Actions',
			field: 'actions',
			cellRendererFramework: (params) => (
				<Stack direction='row' spacing={1}>
					<CustomLink
						to={{ to: `/employees/edit/${params.data.id}` }}
						variant='contained'
						color='primary'
					>
						Edit
					</CustomLink>
					<CustomLink
						variant='contained'
						color='error'
						onClick={() => handleDelete(params.data.id)}
					>
						Delete
					</CustomLink>
				</Stack>
			),
		},
	];

	if (isLoading)
		return (
			<Container
				maxWidth='md'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'start',
					alignItems: 'top',
					minHeight: '100vh',
					textAlign: 'center',
					marginTop: '3rem',
				}}
			>
				<p>Loading...</p>
			</Container>
		);
	if (error)
		return (
			<Container
				maxWidth='md'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'start',
					alignItems: 'top',
					minHeight: '100vh',
					textAlign: 'center',
					marginTop: '3rem',
				}}
			>
				<p>Error loading employees</p>
			</Container>
		);

	return (
		<Container
			maxWidth='md'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'start',
				alignItems: 'top',
				minHeight: '100vh',
				textAlign: 'center',
				marginTop: '3rem',
			}}
		>
			<Stack
				direction='row'
				justifyContent='space-between'
				alignItems='center'
				marginBottom={2}
			>
				<TextField
					label='Filter by Café ID'
					variant='outlined'
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
					size='small'
					sx={{
						'& .MuiOutlinedInput-root': {
							'& fieldset': {
								borderColor: 'white',
							},
							'&:hover fieldset': {
								borderColor: 'white',
							},
							'&.Mui-focused fieldset': {
								borderColor: 'white',
							},
						},
						'& .MuiInputBase-input': {
							color: 'white',
						},
						'& .MuiInputLabel-root': {
							color: 'white',
						},
					}}
				/>
				<CustomLink
					variant='contained'
					color='primary'
					to='/employees/add'
				>
					Add New Employee
				</CustomLink>
			</Stack>
			<div
				className='ag-theme-alpine'
				style={{ height: 500, width: '100%' }}
			>
				<AgGridReact
					rowData={employees}
					columnDefs={columns}
					pagination={true}
					paginationPageSize={10}
				/>
			</div>
			<ConfirmDialog
				open={confirmOpen}
				title='Delete Confirmation'
				content='Are you sure you want to delete this employee?'
				onConfirm={confirmDelete}
				onCancel={cancelDelete}
			/>
		</Container>
	);
};

export default EmployeesPage;
