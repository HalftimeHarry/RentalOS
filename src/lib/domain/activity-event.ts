export type ActivityEventType =
	| 'rent_payment_recorded'
	| 'maintenance_reported'
	| 'maintenance_scheduled'
	| 'maintenance_completed'
	| 'expense_recorded'
	| 'lease_created'
	| 'lease_renewed'
	| 'lease_terminated'
	| 'tenant_added'
	| 'document_uploaded';

export interface ActivityEvent {
	id: string;
	type: ActivityEventType;
	entityType: string;
	entityId: string;
	description: string;
	occurredAt: Date;
	metadata?: Record<string, unknown>;
	createdAt: Date;
}
