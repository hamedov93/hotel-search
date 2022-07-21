import { render, screen } from 'test-utils';
import Header from '@app/components/Header';

test('should render header correctly', () => {
	render(<Header />);
	const heading = screen.getByText('Hotel Search App');
	expect(heading).toBeInTheDocument();
});
