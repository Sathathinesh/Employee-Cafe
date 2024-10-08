import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';

const CustomLink = ({ to, children, ...props }) => {
	const navigate = useNavigate();
	const handleClick = (e) => {
		e.preventDefault();
		navigate({ to });
	};

	return (
		<Button {...props} onClick={handleClick}>
			{children}
		</Button>
	);
};

CustomLink.propTypes = {
	to: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default CustomLink;
