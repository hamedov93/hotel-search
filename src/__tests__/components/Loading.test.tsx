import { render, screen } from 'test-utils';
import Loading from '@app/components/Loading';

describe('<Loading />', () => {
	it('should render loading gif correctly', () => {
		render(<Loading />);
		const img = screen.getByTestId('loading-gif');
		expect(img).toBeInTheDocument();
	});
});
