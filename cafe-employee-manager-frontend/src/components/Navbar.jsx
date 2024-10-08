// src/components/Navbar.jsx

import { AppBar, Toolbar, Typography, Box, Container } from '@mui/material';
import CustomLink from './CustomLink';
import { Link } from '@tanstack/react-router';

const Navbar = () => {
	return (
		<AppBar position='static'>
			<Container maxWidth='lg'>
				<Toolbar sx={{ padding: '0', color: 'white' }}>
					<Typography variant='h6' sx={{ flexGrow: 1 }}>
						<Link
							to={'/'}
							style={{
								color: 'white',
								textDecoration: 'none',
							}}
						>
							Café Employee Manager
						</Link>
					</Typography>
					<Box sx={{ display: 'flex', gap: 2 }}>
						<CustomLink
							variant='contained'
							color='inherit'
							to='/'
							sx={{
								backgroundColor: 'white',
								color: 'primary.main',
								'&:hover': {
									backgroundColor: 'primary.light',
									color: 'white',
								},
								boxShadow: 'none',
								border: 'none',
								textTransform: 'none',
							}}
						>
							Home
						</CustomLink>
						<CustomLink
							variant='contained'
							color='inherit'
							to='/cafes'
							sx={{
								backgroundColor: 'white',
								color: 'primary.main',
								'&:hover': {
									backgroundColor: 'primary.light',
									color: 'white',
								},
								boxShadow: 'none',
								border: 'none',
								textTransform: 'none',
							}}
						>
							Cafes
						</CustomLink>
						<CustomLink
							variant='contained'
							color='inherit'
							to='/employees'
							sx={{
								backgroundColor: 'white',
								color: 'primary.main',
								'&:hover': {
									backgroundColor: 'primary.light',
									color: 'white',
								},
								boxShadow: 'none',
								border: 'none',
								textTransform: 'none',
							}}
						>
							Employees
						</CustomLink>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navbar;
