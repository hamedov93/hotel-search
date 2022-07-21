import { hotels } from '@app/__mocks__/hotels';
import { applyFilters, getMinAndMaxPrice } from '@app/utils/common';
import { initialState as searchInitialState } from '@app/features/hotel/searchSlice';

describe('applyFilters', () => {
	it('should sort hotels by name correctly', () => {
		// We need to have two hotels with the same name
		// To cover the case where the sort function returns 0
		hotels.push(hotels[hotels.length - 1]);
		const filteredHotels = applyFilters(hotels, {
			...searchInitialState,
			sortBy: 'name',
		});

		expect(filteredHotels.find(h => h.name < filteredHotels[0].name)).not.toBeDefined();
		expect(filteredHotels.find(h => h.name > filteredHotels[filteredHotels.length - 1].name)).not.toBeDefined();
	});

	it('should sort hotels by price correctly', () => {
		const filteredHotels = applyFilters(hotels, {
			...searchInitialState,
			sortBy: 'price',
		});

		expect(filteredHotels.find(h => h.price < filteredHotels[0].price)).not.toBeDefined();
		expect(filteredHotels.find(h => h.price > filteredHotels[filteredHotels.length - 1].price)).not.toBeDefined();
	});

	it('should filter by date range correctly', () => {

		const fromDate = '2022-08-25';
		const toDate = '2022-09-05';

		// To make sure the test is valid, we need to make sure
		// hotels array contains dates outside the range first
		expect(hotels.find(hotel => hotel.available_on < fromDate)).toBeDefined();
		expect(hotels.find(hotel => hotel.available_on > toDate)).toBeDefined();

		const filteredHotels = applyFilters(hotels, {
			...searchInitialState,
			fromDate,
			toDate,
		});

		// The dates outside the range should no longer exist.
		expect(filteredHotels.find(hotel => hotel.available_on < fromDate)).not.toBeDefined();
		expect(filteredHotels.find(hotel => hotel.available_on > toDate)).not.toBeDefined();
	});

	it('should filter by price range correctly', () => {

		const minPrice = 225;
		const maxPrice = 275;

		// To make sure the test is valid, we need to make sure
		// hotels array contains prices outside the range first
		expect(hotels.find(hotel => hotel.price < minPrice)).toBeDefined();
		expect(hotels.find(hotel => hotel.price > maxPrice)).toBeDefined();

		const filteredHotels = applyFilters(hotels, {
			...searchInitialState,
			minPrice,
			maxPrice,
		});

		// The prices outside the range should no longer exist.
		expect(filteredHotels.find(hotel => hotel.price < minPrice)).not.toBeDefined();
		expect(filteredHotels.find(hotel => hotel.price > maxPrice)).not.toBeDefined();
	});

	it('should be able to search hotels by name or city', () => {

		let keyword = 'Tel 2';
		let filteredHotelsByName = applyFilters(hotels, {
			...searchInitialState,
			keyword,
		});

		expect(
			filteredHotelsByName
				.filter(h => h.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1).length
		).toEqual(filteredHotelsByName.length);

		keyword = 'Dub';
		let filteredHotelsByCity = applyFilters(hotels, {
			...searchInitialState,
			keyword,
		});

		expect(
			filteredHotelsByCity
				.filter(h => h.city.toLowerCase().indexOf(keyword.toLowerCase()) > -1).length
		).toEqual(filteredHotelsByCity.length);
	});

	it('should return min and max prices from hotels list', () => {
		const [minPrice, maxPrice] = getMinAndMaxPrice(hotels);
		expect(maxPrice).toBeGreaterThanOrEqual(minPrice);
		expect(hotels.find(h => h.price > maxPrice)).not.toBeDefined();
		expect(hotels.find(h => h.price < minPrice)).not.toBeDefined();
	});
});

export {};