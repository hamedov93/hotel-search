import React from 'react';

const Header: React.FC = () => {
	return (
		<div className="footer" data-testid="footer">
			<small>Hotel Search App &copy; {new Date().getFullYear()} - All rights reserved</small>
		</div>
	);
}

export default Header;