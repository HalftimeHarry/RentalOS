import type { RentPayment } from '../domain/rent-payment.js';

export interface RentPaymentRepository {
	findById(id: string): Promise<RentPayment | null>;
	findByLeaseId(leaseId: string): Promise<RentPayment[]>;
	findAll(): Promise<RentPayment[]>;
	create(data: Omit<RentPayment, 'id' | 'createdAt' | 'updatedAt'>): Promise<RentPayment>;
	update(id: string, data: Partial<Omit<RentPayment, 'id' | 'createdAt' | 'updatedAt'>>): Promise<RentPayment>;
	delete(id: string): Promise<void>;
}
