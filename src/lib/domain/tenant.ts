export interface EmergencyContact {
	name: string;
	relationship: string;
	phone: string;
	email?: string;
}

export interface Tenant {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	emergencyContact?: EmergencyContact;
	notes?: string;
	createdAt: Date;
	updatedAt: Date;
}
