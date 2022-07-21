import React from 'react';
import Image from 'next/image';
import styles from './Loading.module.scss';

const Loading: React.FC = () => {
	return (
		<div className={styles.loading}>
			<Image data-testid="loading-gif" src="/loading.gif" alt="loading..." width={100} height={100} />
		</div>
	);
}

export default Loading;