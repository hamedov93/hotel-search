
export type Hotel = {
	name: string;
	price: number;
	city: string;
	available_on: string;
};

export type SortableField = keyof Pick<Hotel, 'name' | 'price'>;
