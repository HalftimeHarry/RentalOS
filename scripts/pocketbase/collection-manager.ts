import type PocketBase from 'pocketbase';
import type { CollectionDefinition, FieldDefinition } from './types.js';

export class CollectionManager {
	constructor(private readonly pb: PocketBase) {}

	async ensureCollection(definition: CollectionDefinition): Promise<void> {
		let collection;
		try {
			collection = await this.pb.collections.getOne(definition.name);
		} catch (error) {
			if (!this.isNotFound(error)) throw error;
			await this.pb.collections.create(definition);
			return;
		}

		const existingNames = new Set(collection.fields.map((field: { name: string }) => field.name));
		const missingFields = definition.fields.filter((field) => !existingNames.has(field.name));
		if (missingFields.length === 0) return;

		await this.pb.collections.update(collection.id, {
			fields: [...collection.fields, ...missingFields],
			listRule: definition.listRule ?? collection.listRule,
			viewRule: definition.viewRule ?? collection.viewRule,
			createRule: definition.createRule ?? collection.createRule,
			updateRule: definition.updateRule ?? collection.updateRule,
			deleteRule: definition.deleteRule ?? collection.deleteRule
		});
	}

	async ensureField(collectionName: string, field: FieldDefinition): Promise<void> {
		const collection = await this.pb.collections.getOne(collectionName);
		if (collection.fields.some((existing: { name: string }) => existing.name === field.name)) return;
		await this.pb.collections.update(collection.id, { fields: [...collection.fields, field] });
	}

	private isNotFound(error: unknown): boolean {
		return typeof error === 'object' && error !== null && 'status' in error && error.status === 404;
	}
}
