// src/pages/HomePage.jsx

import { Container, Stack, Typography } from '@mui/material';
import CustomLink from '../components/CustomLink';

const HomePage = () => {
	return (
		<Container
			maxWidth='sm'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '100vh',
				textAlign: 'center',
			}}
		>
			<Typography variant='h3' gutterBottom sx={{ marginTop: '0' }}>
				Welcome to Café Employee Manager
			</Typography>
			<Stack
				spacing={2}
				direction='row'
				justifyContent='center'
				sx={{ marginTop: '2rem' }}
			>
				<CustomLink variant='contained' color='primary' to='/cafes'>
					Manage Cafes
				</CustomLink>
				<CustomLink
					variant='contained'
					color='secondary'
					to='/employees'
				>
					Manage Employees
				</CustomLink>
			</Stack>
		</Container>
	);
};

export default HomePage;
