import type { Lease } from '../domain/lease.js';
import type { LeaseRepository } from '../repositories/lease-repository.js';

export class LeaseService {
	constructor(private readonly leaseRepository: LeaseRepository) {}

	async getLease(id: string): Promise<Lease | null> {
		return this.leaseRepository.findById(id);
	}

	async getActiveLeases(): Promise<Lease[]> {
		return this.leaseRepository.findActive();
	}

	async getLeasesByUnit(unitId: string): Promise<Lease[]> {
		return this.leaseRepository.findByUnitId(unitId);
	}

	async getLeasesByTenant(tenantId: string): Promise<Lease[]> {
		return this.leaseRepository.findByTenantId(tenantId);
	}

	async createLease(
		data: Omit<Lease, 'id' | 'createdAt' | 'updatedAt'>
	): Promise<Lease> {
		return this.leaseRepository.create(data);
	}

	async updateLease(
		id: string,
		data: Partial<Omit<Lease, 'id' | 'createdAt' | 'updatedAt'>>
	): Promise<Lease> {
		return this.leaseRepository.update(id, data);
	}

	isLeaseExpiringSoon(lease: Lease, daysThreshold = 60): boolean {
		const now = new Date();
		const msThreshold = daysThreshold * 24 * 60 * 60 * 1000;
		return (
			lease.status === 'active' &&
			lease.endDate.getTime() - now.getTime() <= msThreshold
		);
	}

	getNextRentDueDate(lease: Lease): Date {
		const now = new Date();
		const due = new Date(now.getFullYear(), now.getMonth(), lease.rentDueDay);
		if (due <= now) {
			due.setMonth(due.getMonth() + 1);
		}
		return due;
	}
}
