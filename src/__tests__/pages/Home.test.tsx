import { render, screen, fireEvent } from 'test-utils';
import Home, { getServerSideProps } from '@app/pages/index';
import { setSearch } from '@app/features/hotel/searchSlice';
import { hotels } from '@app/__mocks__/hotels';
import { initialState as searchInitialState } from '@app/features/hotel/searchSlice';
import type { GetServerSidePropsContext } from 'next';

describe('<Home />', () => {
	it('should render home page without crashing', () => {
		const { container } = render(<Home hotels={hotels} />);
  		expect(screen.getByTestId('date-search-form')).toBeInTheDocument();
  		expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  		expect(screen.getByText('Total Nights: 0')).toBeInTheDocument();
  		expect(screen.getByRole('button', { name: /Sort by name/i })).toBeInTheDocument();
  		expect(screen.getByRole('button', { name: /Sort by price/i })).toBeInTheDocument();
  		// All hotels array should be rendered if no search params are provided
  		expect(container.getElementsByClassName('hotel-listing').length).toEqual(hotels.length);
	});

	it('should render no hotels when hotels prop is empty', () => {
		const { container} = render(<Home hotels={[]} />);
		expect(container.getElementsByClassName('hotel-listing').length).toEqual(0);
		expect(screen.getByText('No results found')).toBeInTheDocument();
	});

	it('should render total nights correctly', () => {

		render(<Home hotels={hotels} />);
		
		const fromDateInput = screen.getByLabelText('From:');
		const toDateInput = screen.getByLabelText('To:');
		const submitButton = screen.getByRole('button', { name: /Search/i });

		fireEvent.change(fromDateInput, { target: { value: '2022-08-10' } });
		fireEvent.change(toDateInput, { target: { value: '2022-08-15' } });
		fireEvent.click(submitButton);

		expect(screen.getByText('Total Nights: 5')).toBeInTheDocument();

		fireEvent.change(fromDateInput, { target: { value: '2022-08-15' } });
		fireEvent.change(toDateInput, { target: { value: '2022-08-10' } });
		fireEvent.click(submitButton);

		expect(screen.getByText('Total Nights: 0')).toBeInTheDocument();
	});

	it('should fetch hotels server side', async () => {
		const result = await getServerSideProps({} as GetServerSidePropsContext);
		expect(result).toMatchObject({
			props: {
				hotels: expect.arrayContaining([
					expect.objectContaining({
						name: expect.any(String),
						price: expect.any(String),
						city: expect.any(String),
						available_on: expect.any(String),
					}),
				]),
			},
		});
	});

	// TODO
	// Add test cases for rendering correct listing based on search filters
});
