// src/pages/AddEditCafePage.jsx

import { useEffect, useState } from 'react';
import { Container, Button, Stack } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from '@tanstack/react-router'; // Updated imports
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { fetchCafes, createCafe, updateCafe } from '../api/api';
import ReusableTextBox from '../components/ReusableTextBox';
import ReusableFileInput from '../components/ReusableFileInput';
import ConfirmDialog from '../components/ConfirmDialog';
import useUnsavedChanges from '../hooks/useUnsavedChanges';

const schema = yup.object().shape({
	name: yup.string().required().min(6).max(10),
	description: yup.string().required().max(256),
	location: yup.string().required(),
	logo: yup.mixed().test('fileSize', 'File Size is too large', (value) => {
		if (!value || !value.length) return true; // attachment is optional
		return value[0].size <= 2000000; // 2MB
	}),
});

const AddEditCafePage = () => {
	const { id } = useParams(); // Use useRouteData to access route params
	const isEdit = Boolean(id);
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [openConfirm, setOpenConfirm] = useState(false);

	const { data: cafeData, isLoading } = useQuery({
		queryKey: ['cafe', id],
		queryFn: () =>
			fetchCafes().then((cafes) =>
				cafes.find((cafe) => cafe.id === Number(id))
			),
		enabled: isEdit,
	});

	const mutation = useMutation({
		mutationFn: isEdit ? updateCafe : createCafe,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cafes'] });
			navigate({ to: '/cafes' });
		},
	});

	const {
		control,
		handleSubmit,
		reset,
		formState: { isDirty },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			description: '',
			location: '',
			logo: null,
		},
	});

	// const watchedFields = watch();

	useEffect(() => {
		if (isEdit && cafeData) {
			reset({
				name: cafeData.name,
				description: cafeData.description,
				location: cafeData.location,
				logo: null, // Handle file input separately
			});
		}
	}, [isEdit, cafeData, reset]);

	const { prompt } = useUnsavedChanges(isDirty);

	const onSubmit = (data) => {
		const formData = {
			name: data.name,
			description: data.description,
			location: data.location,
			logo: data.logo ? data.logo[0] : null,
		};
		mutation.mutate(isEdit ? { id: Number(id), ...formData } : formData);
	};

	const handleCancel = () => {
		if (isDirty) {
			setOpenConfirm(true);
		} else {
			navigate({ to: '/cafes' });
		}
	};

	const confirmCancel = () => {
		setOpenConfirm(false);
		navigate({ to: '/cafes' });
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
					name='description'
					control={control}
					render={({ field, fieldState: { error } }) => (
						<ReusableTextBox
							label='Description'
							{...field}
							error={!!error}
							helperText={error ? error.message : null}
							required
							multiline
							rows={4}
						/>
					)}
				/>
				<Controller
					name='location'
					control={control}
					render={({ field, fieldState: { error } }) => (
						<ReusableTextBox
							label='Location'
							{...field}
							error={!!error}
							helperText={error ? error.message : null}
							required
						/>
					)}
				/>
				<Controller
					name='logo'
					control={control}
					render={({ field, fieldState: { error } }) => (
						<div style={{ marginTop: '1rem' }}>
							<ReusableFileInput
								label='Upload Logo'
								name='logo'
								onChange={(e) => field.onChange(e.target.files)}
								accept='image/*'
							/>
							{error && (
								<p style={{ color: 'red' }}>{error.message}</p>
							)}
						</div>
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

export default AddEditCafePage;
