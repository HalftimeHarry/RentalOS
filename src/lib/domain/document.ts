export type DocumentType =
	| 'lease'
	| 'receipt'
	| 'invoice'
	| 'inspection_report'
	| 'notice'
	| 'other';

export type DocumentEntityType =
	| 'property'
	| 'unit'
	| 'tenant'
	| 'lease'
	| 'maintenance'
	| 'expense';

export interface Document {
	id: string;
	entityType: DocumentEntityType;
	entityId: string;
	type: DocumentType;
	name: string;
	fileUrl?: string;
	notes?: string;
	createdAt: Date;
	updatedAt: Date;
}
