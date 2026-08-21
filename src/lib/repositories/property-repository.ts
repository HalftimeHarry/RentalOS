import type { Property } from '../domain/property.js';

export interface PropertyRepository {
	findById(id: string): Promise<Property | null>;
	findAll(): Promise<Property[]>;
	create(data: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property>;
	update(id: string, data: Partial<Omit<Property, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Property>;
	delete(id: string): Promise<void>;
}
