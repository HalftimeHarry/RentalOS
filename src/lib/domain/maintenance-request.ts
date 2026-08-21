export type MaintenanceStatus =
	| 'open'
	| 'scheduled'
	| 'in_progress'
	| 'completed'
	| 'cancelled';

export interface MaintenanceRequest {
	id: string;
	propertyId: string;
	unitId: string;
	title: string;
	description: string;
	reportedDate: Date;
	scheduledDate?: Date;
	completedDate?: Date;
	status: MaintenanceStatus;
	vendorId?: string;
	estimatedCost?: number;
	actualCost?: number;
	notes?: string;
	createdAt: Date;
	updatedAt: Date;
}
