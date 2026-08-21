import type { Tenant } from '../domain/tenant.js';

export interface TenantRepository {
	findById(id: string): Promise<Tenant | null>;
	findAll(): Promise<Tenant[]>;
	create(data: Omit<Tenant, 'id' | 'createdAt' | 'updatedAt'>): Promise<Tenant>;
	update(id: string, data: Partial<Omit<Tenant, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Tenant>;
	delete(id: string): Promise<void>;
}
