import type { MaintenanceRequest } from '../domain/maintenance-request.js';
import type { MaintenanceRepository } from '../repositories/maintenance-repository.js';

export class MaintenanceService {
	constructor(private readonly maintenanceRepository: MaintenanceRepository) {}

	async getOpenRequests(): Promise<MaintenanceRequest[]> {
		return this.maintenanceRepository.findOpen();
	}

	async getRequestsByUnit(unitId: string): Promise<MaintenanceRequest[]> {
		return this.maintenanceRepository.findByUnitId(unitId);
	}

	async createRequest(
		data: Omit<MaintenanceRequest, 'id' | 'createdAt' | 'updatedAt'>
	): Promise<MaintenanceRequest> {
		return this.maintenanceRepository.create(data);
	}

	async updateRequest(
		id: string,
		data: Partial<Omit<MaintenanceRequest, 'id' | 'createdAt' | 'updatedAt'>>
	): Promise<MaintenanceRequest> {
		return this.maintenanceRepository.update(id, data);
	}
}
