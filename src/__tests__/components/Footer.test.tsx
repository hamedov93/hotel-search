import { render, screen } from 'test-utils';
import Footer from '@app/components/Footer';

test('should render footer correctly', () => {
	render(<Footer />);
	const text = `${new Date().getFullYear()} - All rights reserved`;
	expect(screen.getByText(text, { exact: false })).toBeInTheDocument();
	expect(screen.getByText('Hotel Search App', { exact: false })).toBeInTheDocument();
});
