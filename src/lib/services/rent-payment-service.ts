import type { RentPayment } from '../domain/rent-payment.js';
import type { RentPaymentRepository } from '../repositories/rent-payment-repository.js';

export class RentPaymentService {
	constructor(private readonly rentPaymentRepository: RentPaymentRepository) {}

	async getPaymentsByLease(leaseId: string): Promise<RentPayment[]> {
		return this.rentPaymentRepository.findByLeaseId(leaseId);
	}

	async recordPayment(
		data: Omit<RentPayment, 'id' | 'createdAt' | 'updatedAt'>
	): Promise<RentPayment> {
		return this.rentPaymentRepository.create(data);
	}

	async updatePayment(
		id: string,
		data: Partial<Omit<RentPayment, 'id' | 'createdAt' | 'updatedAt'>>
	): Promise<RentPayment> {
		return this.rentPaymentRepository.update(id, data);
	}

	calculateMonthlyIncome(payments: RentPayment[]): number {
		const now = new Date();
		return payments
			.filter(
				(p) =>
					p.status === 'paid' &&
					p.paidDate &&
					p.paidDate.getMonth() === now.getMonth() &&
					p.paidDate.getFullYear() === now.getFullYear()
			)
			.reduce((sum, p) => sum + p.amount, 0);
	}
}
