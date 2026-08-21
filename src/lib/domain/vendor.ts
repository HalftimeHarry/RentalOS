export interface Vendor {
	id: string;
	name: string;
	contactName?: string;
	email?: string;
	phone?: string;
	serviceType: string;
	notes?: string;
	createdAt: Date;
	updatedAt: Date;
}
