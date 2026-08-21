import type { Unit } from '../domain/unit.js';

export interface UnitRepository {
	findById(id: string): Promise<Unit | null>;
	findByPropertyId(propertyId: string): Promise<Unit[]>;
	findAll(): Promise<Unit[]>;
	create(data: Omit<Unit, 'id' | 'createdAt' | 'updatedAt'>): Promise<Unit>;
	update(id: string, data: Partial<Omit<Unit, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Unit>;
	delete(id: string): Promise<void>;
}
