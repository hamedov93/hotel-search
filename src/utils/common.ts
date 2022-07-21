import { Hotel } from '@app/interfaces/hotel';
import { SearchState } from '@app/features/hotel/searchSlice';

export const getTotalNights = (fromDate: string | null, toDate: string | null): number => {
	if (!fromDate || !toDate) {
		return 0;
	}

	const diffTime = new Date(toDate).getTime() - new Date(fromDate).getTime();

	if (diffTime < 0) {
		return 0;
	}
	
	return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export const getMinAndMaxPrice = (hotels: Array<Hotel>): [number, number] => {
	const minPriceHotel = hotels.reduce((prev, curr) => {
		return prev.price < curr.price ? prev : curr;
	});

	const maxPriceHotel = hotels.reduce((prev, curr) => {
		return prev.price > curr.price ? prev : curr;
	});

	return [minPriceHotel.price, maxPriceHotel.price];
}

export const applyFilters = (hotels: Array<Hotel>, search: SearchState): Array<Hotel> => {
	const { fromDate, toDate, keyword, minPrice, maxPrice, sortBy } = search;
	
	// Filter hotels based on search parameters
	hotels = hotels.filter(hotel => {
		if (fromDate && new Date(hotel.available_on).getTime() < new Date(fromDate).getTime()) {
			return false;
		}

		if (toDate && new Date(hotel.available_on).getTime() > new Date(toDate).getTime()) {
			return false;
		}

		if (hotel.price < minPrice || hotel.price > maxPrice) {
			return false;
		}

		if (keyword &&
			hotel.name .toLowerCase().search(keyword.toLowerCase()) === -1 &&
			hotel.city .toLowerCase().search(keyword.toLowerCase()) === -1) {
			return false;
		}

		return true;
	});

	// Sort hotels based on selected field
	if (search.sortBy === 'price') {
		hotels.sort((a, b) => a.price - b.price);
	}

	if (search.sortBy === 'name') {
		hotels.sort((a, b) => {
			let x = a.name.toLowerCase();
			let y = b.name.toLowerCase();
			if (x < y) {return -1;}
			if (x > y) {return 1;}
			return 0;
		});
	}

	return hotels;
}
