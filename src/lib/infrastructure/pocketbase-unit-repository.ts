import type { Unit, UnitStatus } from '../domain/unit.js';
import type { UnitRepository } from '../repositories/unit-repository.js';
import type PocketBase from 'pocketbase';

interface PocketBaseUnit {
	id: string;
	property_id: string;
	unit_number: string;
	bedrooms: number;
	bathrooms: number;
	monthly_rent: number;
	status: UnitStatus;
	notes: string;
	created: string;
	updated: string;
}

function toDomain(record: PocketBaseUnit): Unit {
	return {
		id: record.id,
		propertyId: record.property_id,
		unitNumber: record.unit_number,
		bedrooms: record.bedrooms,
		bathrooms: record.bathrooms,
		monthlyRent: record.monthly_rent,
		status: record.status,
		notes: record.notes || undefined,
		createdAt: new Date(record.created),
		updatedAt: new Date(record.updated)
	};
}

export class PocketBaseUnitRepository implements UnitRepository {
	constructor(private readonly pb: PocketBase) {}

	async findById(id: string): Promise<Unit | null> {
		try {
			const record = await this.pb.collection('units').getOne<PocketBaseUnit>(id);
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

	async findByPropertyId(propertyId: string): Promise<Unit[]> {
		const records = await this.pb
			.collection('units')
			.getFullList<PocketBaseUnit>({ filter: 'property_id = {:propertyId}', params: { propertyId } });
		return records.map(toDomain);
	}

	async findAll(): Promise<Unit[]> {
		const records = await this.pb.collection('units').getFullList<PocketBaseUnit>();
		return records.map(toDomain);
	}

	async create(data: Omit<Unit, 'id' | 'createdAt' | 'updatedAt'>): Promise<Unit> {
		const record = await this.pb.collection('units').create<PocketBaseUnit>({
			property_id: data.propertyId,
			unit_number: data.unitNumber,
			bedrooms: data.bedrooms,
			bathrooms: data.bathrooms,
			monthly_rent: data.monthlyRent,
			status: data.status,
			notes: data.notes ?? ''
		});
		return toDomain(record);
	}

	async update(id: string, data: Partial<Omit<Unit, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Unit> {
		const record = await this.pb.collection('units').update<PocketBaseUnit>(id, {
			...(data.propertyId !== undefined && { property_id: data.propertyId }),
			...(data.unitNumber !== undefined && { unit_number: data.unitNumber }),
			...(data.bedrooms !== undefined && { bedrooms: data.bedrooms }),
			...(data.bathrooms !== undefined && { bathrooms: data.bathrooms }),
			...(data.monthlyRent !== undefined && { monthly_rent: data.monthlyRent }),
			...(data.status !== undefined && { status: data.status }),
			...(data.notes !== undefined && { notes: data.notes })
		});
		return toDomain(record);
	}

	async delete(id: string): Promise<void> {
		await this.pb.collection('units').delete(id);
	}
}
