import React from 'react';
import styles from './DateSearch.module.scss';

interface Props {
	name: string;
	label?: string;
	value: string | null;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}

const DateInput: React.FC<Props> = ({ name, value, label, onChange }: Props) => {
	return (
		<div className={styles.dateInputWrapper}>
			{label && <label htmlFor={name} className={styles.dateInputLabel}>{label}</label> }
			<input
				type="date"
				name={name}
				id={name}
				value={value || ''}
				className={styles.dateInput}
				onChange={onChange}
			/>
		</div>
	);
}

export default DateInput;