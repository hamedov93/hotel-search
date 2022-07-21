import React from 'react';
import styles from './Sidebar.module.scss';

const SearchIcon: React.FC = () => (
	<svg className={`${styles.searchIcon} bi bi-search`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" id="IconChangeColor"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" id="mainIconPathAttribute" strokeWidth="0" stroke="#ff0000"></path></svg>
);

export default SearchIcon;