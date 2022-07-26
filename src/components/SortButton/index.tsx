import React, { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@app/redux/hooks';
import { selectSearch, setSearch } from '@app/features/hotel/searchSlice';
import { SortableField } from '@app/interfaces/hotel';
import styles from './SortButton.module.scss';

interface Props {
	field: SortableField;
	label: string;
}

const SortButton: React.FC<Props> = ({ field, label }: Props) => {

	const dispatch = useAppDispatch();
	const search = useAppSelector(selectSearch);

	const handleButtonClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		dispatch(setSearch({
			...search,
			sortBy: field === search.sortBy ? null : field,
		}));
	}, [search, field, dispatch]);

	return (
		<button
			type="button"
			className={`${styles.sortButton} ${field === search.sortBy ? styles.active : ''}`}
			onClick={handleButtonClick}
		>
			{label}
		</button>
	);
}

export default SortButton;