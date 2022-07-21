import { render, screen, fireEvent } from 'test-utils';
import DateSearch from '@app/components/DateSearch';

describe('<DateSearch />', () => {

	const getDateInputs = () => ({
		fromDate: screen.getByLabelText('From:'),
		toDate: screen.getByLabelText('To:'),
	});

	it('should render Search hotels heading, date inputs, submit button', () => {

		render(<DateSearch />);
		
		const heading = screen.getByText('Search hotels');
		const { fromDate, toDate } = getDateInputs() as {
			fromDate: HTMLInputElement,
			toDate: HTMLInputElement
		};
		
		const button = screen.getByRole('button');

		expect(heading).toBeInTheDocument();
		expect(fromDate).toBeInTheDocument();
		expect(toDate).toBeInTheDocument();
		expect(button).toBeInTheDocument();

		// Date inputs have initially empty values
		expect(fromDate.value).toBe('');
		expect(toDate.value).toBe('');

		// Test change event on inputs
		fireEvent.change(fromDate, { target: { value: '2022-07-25' } });
		fireEvent.change(toDate, { target: { value: '2022-08-25' } });

		expect(fromDate.value).toBe('2022-07-25');
		expect(toDate.value).toBe('2022-08-25');
	});

	it('should update the store when form is submitted', () => {

		const { store } = render(<DateSearch />);

		const { fromDate, toDate } = getDateInputs();
		const submitButton = screen.getByRole('button', { name: /Search/i });

		// Test change event on inputs
		fireEvent.change(fromDate, { target: { value: '2022-07-25' } });
		fireEvent.change(toDate, { target: { value: '2022-08-25' } });
		fireEvent.click(submitButton);

		// Search parameters should be updated
		const { search } = store.getState();

		expect(search.fromDate).toBe('2022-07-25');
		expect(search.toDate).toBe('2022-08-25');
	});
});
