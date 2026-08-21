import type { Vendor } from '../domain/vendor.js';

export interface VendorRepository {
	findById(id: string): Promise<Vendor | null>;
	findAll(): Promise<Vendor[]>;
	create(data: Omit<Vendor, 'id' | 'createdAt' | 'updatedAt'>): Promise<Vendor>;
	update(id: string, data: Partial<Omit<Vendor, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Vendor>;
	delete(id: string): Promise<void>;
}
