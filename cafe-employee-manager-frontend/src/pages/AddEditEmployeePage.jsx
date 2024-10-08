// src/pages/AddEditEmployeePage.jsx

import { useState, useEffect } from 'react';
import { Container, Button, Stack, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from '@tanstack/react-router'; // Change here
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	fetchEmployees,
	createEmployee,
	updateEmployee,
	fetchCafes,
} from '../api/api';
import ReusableTextBox from '../components/ReusableTextBox';
import ReusableRadioGroup from '../components/ReusableRadioGroup';
import ConfirmDialog from '../components/ConfirmDialog';
import useUnsavedChanges from '../hooks/useUnsavedChanges';

const phoneRegExp = /^[89]\d{7}$/;

const schema = yup.object().shape({
	name: yup.string().required().min(6).max(10),
	email_address: yup.string().required().email(),
	phone_number: yup
		.string()
		.required()
		.matches(phoneRegExp, 'Phone number is not valid'),
	gender: yup.string().required(),
	cafeId: yup.number().required(),
});

const AddEditEmployeePage = () => {
	const { id } = useParams(); // Change here
	const isEdit = Boolean(id);
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [openConfirm, setOpenConfirm] = useState(false);

	const { data: employeeData, isLoading } = useQuery({
		queryKey: ['employee', id],
		queryFn: () =>
			fetchEmployees().then((employees) =>
				employees.find((emp) => emp.id === Number(id))
			),
		enabled: isEdit,
	});

	const { data: cafes, isLoading: isCafesLoading } = useQuery({
		queryKey: ['cafes'],
		queryFn: fetchCafes,
	});

	const mutation = useMutation({
		mutationFn: isEdit ? updateEmployee : createEmployee,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['employees'] });
			navigate({ to: '/employees' });
		},
	});

	const {
		control,
		handleSubmit,
		reset,
		// watch,
		formState: { isDirty },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			email_address: '',
			phone_number: '',
			gender: '',
			cafeId: '',
		},
	});

	// const watchedFields = watch();

	useEffect(() => {
		if (isEdit && employeeData) {
			reset({
				name: employeeData.name,
				email_address: employeeData.email_address,
				phone_number: employeeData.phone_number,
				gender: employeeData.gender,
				cafeId: employeeData.cafeId,
			});
		}
	}, [isEdit, employeeData, reset]);

	const { prompt } = useUnsavedChanges(isDirty);

	const onSubmit = (data) => {
		const employeeData = {
			name: data.name,
			email_address: data.email_address,
			phone_number: data.phone_number,
			gender: data.gender,
			cafeId: data.cafeId,
		};
		mutation.mutate(
			isEdit ? { id: Number(id), ...employeeData } : employeeData
		);
	};

	const handleCancel = () => {
		if (isDirty) {
			setOpenConfirm(true);
		} else {
			navigate({ to: '/employees' });
		}
	};

	const confirmCancel = () => {
		setOpenConfirm(false);
		navigate({ to: '/employees' });
	};

	const cancelCancel = () => {
		setOpenConfirm(false);
	};

	if (isEdit && isLoading)
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
	if (isCafesLoading)
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
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name='name'
					control={control}
					render={({ field, fieldState: { error } }) => (
						<ReusableTextBox
							label='Name'
							{...field}
							error={!!error}
							helperText={error ? error.message : null}
							required
						/>
					)}
				/>
				<Controller
					name='email_address'
					control={control}
					render={({ field, fieldState: { error } }) => (
						<ReusableTextBox
							label='Email Address'
							{...field}
							error={!!error}
							helperText={error ? error.message : null}
							required
							type='email'
						/>
					)}
				/>
				<Controller
					name='phone_number'
					control={control}
					render={({ field, fieldState: { error } }) => (
						<ReusableTextBox
							label='Phone Number'
							{...field}
							error={!!error}
							helperText={error ? error.message : null}
							required
							type='tel'
						/>
					)}
				/>
				<Controller
					name='gender'
					control={control}
					render={({ field, fieldState: { error } }) => (
						<ReusableRadioGroup
							label='Gender'
							{...field}
							error={!!error}
							required
							options={[
								{ label: 'Male', value: 'Male' },
								{ label: 'Female', value: 'Female' },
								{ label: 'Other', value: 'Other' },
							]}
						/>
					)}
				/>
				<Controller
					name='cafeId'
					control={control}
					render={({ field, fieldState: { error } }) => (
						<TextField
							select
							label='Assigned Café'
							{...field}
							error={!!error}
							helperText={error ? error.message : null}
							required
							SelectProps={{
								native: true,
							}}
							fullWidth
							margin='normal'
							variant='outlined'
						>
							<option value=''>Select a Café</option>
							{cafes.map((cafe) => (
								<option key={cafe.id} value={cafe.id}>
									{cafe.name}
								</option>
							))}
						</TextField>
					)}
				/>
				<Stack direction='row' spacing={2} marginTop={2}>
					<Button type='submit' variant='contained' color='primary'>
						{isEdit ? 'Update' : 'Create'}
					</Button>
					<Button
						variant='outlined'
						color='secondary'
						onClick={handleCancel}
					>
						Cancel
					</Button>
				</Stack>
			</form>
			<ConfirmDialog
				open={openConfirm}
				title='Unsaved Changes'
				content='You have unsaved changes. Are you sure you want to leave?'
				onConfirm={confirmCancel}
				onCancel={cancelCancel}
			/>
			{prompt}
		</Container>
	);
};

export default AddEditEmployeePage;
