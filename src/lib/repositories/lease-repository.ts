import type { Lease } from '../domain/lease.js';

export interface LeaseRepository {
	findById(id: string): Promise<Lease | null>;
	findByUnitId(unitId: string): Promise<Lease[]>;
	findByTenantId(tenantId: string): Promise<Lease[]>;
	findActive(): Promise<Lease[]>;
	findAll(): Promise<Lease[]>;
	create(data: Omit<Lease, 'id' | 'createdAt' | 'updatedAt'>): Promise<Lease>;
	update(id: string, data: Partial<Omit<Lease, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Lease>;
	delete(id: string): Promise<void>;
}
