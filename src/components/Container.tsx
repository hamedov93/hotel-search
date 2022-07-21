import React from 'react';

interface Props {
	children?: React.ReactNode;
	className?: string;
}

const Container: React.FC<Props> = ({ children, className }: Props) => {
	return (
		<div className={`container ${className || ''}`} data-testid="container">
			{children}
		</div>
	);
}

export default Container;