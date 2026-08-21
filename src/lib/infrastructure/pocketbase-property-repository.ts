import type { Property } from '../domain/property.js';
import type { PropertyRepository } from '../repositories/property-repository.js';
import type PocketBase from 'pocketbase';

interface PocketBaseProperty {
	id: string;
	name: string;
	address: string;
	city: string;
	state: string;
	postal_code: string;
	notes: string;
	created: string;
	updated: string;
}

function toDomain(record: PocketBaseProperty): Property {
	return {
		id: record.id,
		name: record.name,
		address: record.address,
		city: record.city,
		state: record.state,
		postalCode: record.postal_code,
		notes: record.notes || undefined,
		createdAt: new Date(record.created),
		updatedAt: new Date(record.updated)
	};
}

export class PocketBasePropertyRepository implements PropertyRepository {
	constructor(private readonly pb: PocketBase) {}

	async findById(id: string): Promise<Property | null> {
		try {
			const record = await this.pb.collection('properties').getOne<PocketBaseProperty>(id);
			return toDomain(record);
		} catch (err: unknown) {
			if (
				typeof err === 'object' &&
				err !== null &&
				'status' in err &&
				(err as { status: number }).status === 404
			) {
				return null;
			}
			throw err;
		}
	}

	async findAll(): Promise<Property[]> {
		const records = await this.pb.collection('properties').getFullList<PocketBaseProperty>();
		return records.map(toDomain);
	}

	async create(data: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Promise<Property> {
		const record = await this.pb.collection('properties').create<PocketBaseProperty>({
			name: data.name,
			address: data.address,
			city: data.city,
			state: data.state,
			postal_code: data.postalCode,
			notes: data.notes ?? ''
		});
		return toDomain(record);
	}

	async update(
		id: string,
		data: Partial<Omit<Property, 'id' | 'createdAt' | 'updatedAt'>>
	): Promise<Property> {
		const record = await this.pb.collection('properties').update<PocketBaseProperty>(id, {
			...(data.name !== undefined && { name: data.name }),
			...(data.address !== undefined && { address: data.address }),
			...(data.city !== undefined && { city: data.city }),
			...(data.state !== undefined && { state: data.state }),
			...(data.postalCode !== undefined && { postal_code: data.postalCode }),
			...(data.notes !== undefined && { notes: data.notes })
		});
		return toDomain(record);
	}

	async delete(id: string): Promise<void> {
		await this.pb.collection('properties').delete(id);
	}
}
