import type { MaintenanceRequest } from '../domain/maintenance-request.js';

export interface MaintenanceRepository {
	findById(id: string): Promise<MaintenanceRequest | null>;
	findByPropertyId(propertyId: string): Promise<MaintenanceRequest[]>;
	findByUnitId(unitId: string): Promise<MaintenanceRequest[]>;
	findOpen(): Promise<MaintenanceRequest[]>;
	findAll(): Promise<MaintenanceRequest[]>;
	create(data: Omit<MaintenanceRequest, 'id' | 'createdAt' | 'updatedAt'>): Promise<MaintenanceRequest>;
	update(id: string, data: Partial<Omit<MaintenanceRequest, 'id' | 'createdAt' | 'updatedAt'>>): Promise<MaintenanceRequest>;
	delete(id: string): Promise<void>;
}
