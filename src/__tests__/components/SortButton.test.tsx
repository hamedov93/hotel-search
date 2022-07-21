import { render, screen, fireEvent } from 'test-utils';
import SortButton from '@app/components/SortButton';

describe('<SortButton />', () => {
	it('should render sort button with label and field', () => {
		render(<SortButton field="name" label="Sort by name" />);

		const button = screen.getByRole('button', { name: /Sort by name/i });
		expect(button).toBeInTheDocument();
	});

	it('should handle sort button click correctly', () => {
		const { store } = render(<SortButton field="name" label="Sort by name" />);
		const button = screen.getByRole('button', { name: /Sort by name/i });

		// Initially null
		expect(store.getState().search.sortBy).toBe(null);
		expect(button.className.indexOf('active')).toEqual(-1);

		fireEvent.click(button);
		// Updated when button is clicked
		expect(store.getState().search.sortBy).toBe('name');
		expect(button.className.indexOf('active')).toBeGreaterThan(-1);

		fireEvent.click(button);
		// Reset to null when the same button is clicked again
		expect(store.getState().search.sortBy).toBe(null);
		expect(button.className.indexOf('active')).toEqual(-1);
	});
});
