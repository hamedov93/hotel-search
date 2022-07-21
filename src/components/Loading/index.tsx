import React from 'react';
import styles from './Loading.module.scss';

const Loading: React.FC = () => {
	return (
		<div className={styles.loading}>
			<img data-testid="loading-gif" src="/loading.gif" />
		</div>
	);
}

export default Loading;