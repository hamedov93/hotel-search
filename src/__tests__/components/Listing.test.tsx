import { render, screen } from 'test-utils';
import Listing from '@app/components/Listing';

describe('<Listing />', () => {
	it('should render listing correctly', () => {
		render(
			<Listing
				name="Intercontinental hotel"
				price={500}
				city="Cairo"
				nights={1}
			/>
		);

		expect(screen.getByText('Intercontinental hotel')).toBeInTheDocument();
		expect(screen.getByTestId('listing-price').innerHTML).toBe("500");
		expect(screen.getByTestId('listing-city').innerHTML).toBe("Cairo");
	});
});
