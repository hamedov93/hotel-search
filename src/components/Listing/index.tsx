import React from 'react';
import { Hotel } from '@app/interfaces/hotel';
import styles from './Listing.module.scss';

type ListingHotelProps = Omit<Hotel, 'available_on'>;
interface ListingProps extends ListingHotelProps {
	nights: number;
}

const Listing: React.FC<ListingProps> = ({ name, price, city, nights }: ListingProps) => {
	price = nights === 0 ? price : price * nights;
	return (
		<div className={`${styles.card} hotel-listing`}>
	        <h3>{name}</h3>
	        <p><b>Price:</b> <span data-testid="listing-price">{price}</span> AED</p>
	        <p><b>City:</b> <span data-testid="listing-city">{city}</span></p>
	    </div>
	);
}

export default Listing;