import { render, screen } from 'test-utils';
import Container from '@app/components/Container';

test('should render Container with children correctly', () => {
	render(<Container>Hello world</Container>);

	expect(screen.getByTestId('container')).toBeInTheDocument();
	expect(screen.getByText('Hello world')).toBeInTheDocument();
});
