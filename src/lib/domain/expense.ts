export type ExpenseCategory =
	| 'repairs'
	| 'maintenance'
	| 'utilities'
	| 'insurance'
	| 'taxes'
	| 'mortgage'
	| 'management'
	| 'advertising'
	| 'legal'
	| 'supplies'
	| 'other';

export interface Expense {
	id: string;
	propertyId: string;
	unitId?: string;
	vendorId?: string;
	category: ExpenseCategory;
	description: string;
	amount: number;
	expenseDate: Date;
	notes?: string;
	createdAt: Date;
	updatedAt: Date;
}
