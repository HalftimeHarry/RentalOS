export type LeaseStatus = 'active' | 'expired' | 'pending' | 'terminated';

export interface Lease {
	id: string;
	unitId: string;
	tenantId: string;
	startDate: Date;
	endDate: Date;
	monthlyRent: number;
	securityDeposit: number;
	rentDueDay: number;
	status: LeaseStatus;
	notes?: string;
	createdAt: Date;
	updatedAt: Date;
}
