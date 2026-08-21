export type PaymentStatus = 'due' | 'paid' | 'partial' | 'late' | 'waived';
export type PaymentMethod = 'cash' | 'check' | 'bank_transfer' | 'online' | 'other';

export interface RentPayment {
	id: string;
	leaseId: string;
	amount: number;
	dueDate: Date;
	paidDate?: Date;
	paymentMethod?: PaymentMethod;
	status: PaymentStatus;
	notes?: string;
	createdAt: Date;
	updatedAt: Date;
}
