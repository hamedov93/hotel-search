import React, { useEffect, useCallback, useState } from 'react';
import SearchIcon from './SearchIcon';
import styles from './Sidebar.module.scss';
import { selectSearch, setSearch } from '@app/features/hotel/searchSlice';
import { selectHotel } from '@app/features/hotel/hotelSlice';
import { useAppSelector, useAppDispatch } from '@app/redux/hooks';
import { getMinAndMaxPrice } from '@app/utils/common';
import { Hotel } from '@app/interfaces/hotel';

interface Props {
	rangeMinPrice: number;
	rangeMaxPrice: number;
}

const Sidebar: React.FC<Props> = ({ rangeMinPrice, rangeMaxPrice }: Props) => {

	const dispatch = useAppDispatch();
	const search = useAppSelector(selectSearch);

	// Min and max price that change with filters
	const { minPrice, maxPrice } = search;

	useEffect(() => {
		dispatch(setSearch({
			...search,
			minPrice: rangeMinPrice,
			maxPrice: rangeMaxPrice,
		}));
	}, [rangeMinPrice, rangeMaxPrice, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

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
				<label htmlFor="price" className={styles.priceLabel}>Filter price per night</label>
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