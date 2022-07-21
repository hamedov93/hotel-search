import React, { useEffect, useCallback, useState } from 'react';
import SearchIcon from './SearchIcon';
import styles from './Sidebar.module.scss';
import { selectSearch, setSearch } from '../../features/hotel/searchSlice';
import { selectHotel } from '../../features/hotel/hotelSlice';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { getMinAndMaxPrice } from '../../utils/common';

const Sidebar: React.FC = () => {

	const dispatch = useAppDispatch();
	const search = useAppSelector(selectSearch);
	const { hotels } = useAppSelector(selectHotel);

	// Store absolute min and max prices in local state
	// Those will not change
	const [rangeMinPrice, setRangeMinPrice] = useState<number>(0);
	const [rangeMaxPrice, setRangeMaxPrice] = useState<number>(500);

	// Min and max price that change with filters
	const { minPrice, maxPrice } = search;

	useEffect(() => {
		// Set min and max price based on provided hotel list
		if (hotels.length === 0) {
			return;
		}

		const [minPrice, maxPrice] = getMinAndMaxPrice(hotels);

		setRangeMaxPrice(maxPrice);
		setRangeMinPrice(minPrice);

		dispatch(setSearch({
			...search,
			minPrice,
			maxPrice,
		}));
	}, [hotels.length, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

	const handlePriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearch({
			...search,
			maxPrice: Number(e.target.value),
		}));
	}, [search, dispatch]);

	const handleKeywordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearch({
			...search,
			keyword: e.target.value,
		}));
	}, [search, dispatch]);

	const priceRangePosition = 100 * (maxPrice - rangeMinPrice) / (rangeMaxPrice - rangeMinPrice);

	return (
		<div className={styles.sidebar} data-testid="sidebar">
			<div className={styles.searchInputContainer}>
				<SearchIcon />
				<input
					data-testid="keyword-input"
					className={styles.searchInput}
					type="text"
					placeholder="Hotel name or city..."
					onChange={handleKeywordChange}
				/>
			</div>
			<div>
				<label htmlFor="price" className={styles.priceLabel}>Filter price</label>
				<input
					className={styles.priceInput}
					id="price"
					type="range"
					min={rangeMinPrice}
					max={rangeMaxPrice}
					value={maxPrice}
					onChange={handlePriceChange}
				/>
				<div className={styles.priceRangeMask} style={{width: `${priceRangePosition}%`}}></div>
				<div className={styles.priceRange}>
					<span data-testid="range-min-price">{rangeMinPrice}</span>
					<span data-testid="max-price">{maxPrice}</span>
					<span data-testid="range-max-price">{rangeMaxPrice}</span>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;