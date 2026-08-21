export interface Property {
	id: string;
	name: string;
	address: string;
	city: string;
	state: string;
	postalCode: string;
	notes?: string;
	createdAt: Date;
	updatedAt: Date;
}
