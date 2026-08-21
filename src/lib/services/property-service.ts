import type { Property } from '../domain/property.js';
import type { PropertyRepository } from '../repositories/property-repository.js';

export class PropertyService {
	constructor(private readonly propertyRepository: PropertyRepository) {}

	async getProperty(id: string): Promise<Property | null> {
		return this.propertyRepository.findById(id);
	}

	async getAllProperties(): Promise<Property[]> {
		return this.propertyRepository.findAll();
	}

	async createProperty(
		data: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>
	): Promise<Property> {
		return this.propertyRepository.create(data);
	}

	async updateProperty(
		id: string,
		data: Partial<Omit<Property, 'id' | 'createdAt' | 'updatedAt'>>
	): Promise<Property> {
		return this.propertyRepository.update(id, data);
	}

	async deleteProperty(id: string): Promise<void> {
		return this.propertyRepository.delete(id);
	}
}
