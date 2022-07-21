import { screen, render, fireEvent } from 'test-utils';
import DateInput from '@app/components/DateSearch/DateInput';

describe('<DateInput />', () => {
	it('should render a date input correctly', () => {

		render(
			<DateInput
				name="fromDate"
				label="From date"
				value={null}
				onChange={() => {}}
			/>
		);

		const input = screen.getByLabelText('From date') as HTMLInputElement;
		expect(input).toBeInTheDocument();
		expect(input.value).toBe('');
		expect(input.name).toBe('fromDate');
		expect(input.id).toBe('fromDate');
	});

	it('should render a date input with value', () => {

		render(
			<DateInput
				name="fromDate"
				label="From date"
				value="2022-07-25"
				onChange={() => {}}
			/>
		);

		const input = screen.getByLabelText('From date') as HTMLInputElement;
		expect(input.value).toBe('2022-07-25');
	});

	it('should call on change handler', () => {
		const changeHandler = jest.fn();

		render(
			<DateInput
				name="fromDate"
				label="From date"
				value={null}
				onChange={changeHandler}
			/>
		);

		const input = screen.getByLabelText('From date');
		
		fireEvent.change(input, { target: { value: '2022-07-25' } });

		expect(changeHandler).toHaveBeenCalled();
	});
});
