export type UnitStatus = 'vacant' | 'occupied' | 'maintenance' | 'unavailable';

export interface Unit {
	id: string;
	propertyId: string;
	unitNumber: string;
	bedrooms: number;
	bathrooms: number;
	monthlyRent: number;
	status: UnitStatus;
	notes?: string;
	createdAt: Date;
	updatedAt: Date;
}
