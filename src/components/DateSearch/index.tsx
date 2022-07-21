import React, { useCallback, useState } from 'react';
import DateInput from './DateInput';
import styles from './DateSearch.module.scss';
import { selectSearch, setSearch } from '../../features/hotel/searchSlice';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';

const DateSearch: React.FC = () => {

	const dispatch = useAppDispatch();
	const search = useAppSelector(selectSearch);
  	const { fromDate, toDate } = search;

  	// Create temp state vars for dates
  	// Becuase we will update redux store only on form submit
  	const [tempFromDate, setTempFromDate] = useState<string|null>(fromDate);
  	const [tempToDate, setTempToDate] = useState<string|null>(toDate);

  	const handleFromDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  		const input = e.target;
  		setTempFromDate(input.value);
  	}, []);

  	const handleToDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  		const input = e.target;
  		setTempToDate(input.value);
  	}, []);

  	const handleFormSubmit = useCallback((e: React.FormEvent) => {
  		e.preventDefault();
  		dispatch(setSearch({
  			...search,
  			fromDate: tempFromDate,
  			toDate: tempToDate,
  		}));
  	}, [dispatch, search, tempFromDate, tempToDate]);

	return (
		<div className={styles.dateSearchWrapper} data-testid="date-search-form">
			<h1>Search hotels</h1>
			<form className={styles.dateSearchForm} onSubmit={handleFormSubmit}>
				<DateInput
					name="fromDate"
					label="From:"
					value={tempFromDate}
					onChange={handleFromDateChange}
				/>
				
				<DateInput
					name="toDate"
					label="To:"
					value={tempToDate}
					onChange={handleToDateChange}
				/>
				
				<button type="submit" className={styles.button}>Search</button>
			</form>
		</div>
	);
}

export default DateSearch;