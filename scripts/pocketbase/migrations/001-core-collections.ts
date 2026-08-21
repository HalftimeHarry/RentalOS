import { CollectionManager } from '../collection-manager.js';
import type { Migration, MigrationContext } from '../types.js';

const adminOnly = "@request.auth.role = 'admin'";
const authenticated = '@request.auth.id != ""';

export class CoreCollectionsMigration implements Migration {
	readonly id = '001-core-collections';
	readonly description = 'Create RentalOS core collections and property photo storage';

	async up({ pb }: MigrationContext): Promise<void> {
		const manager = new CollectionManager(pb);

		await manager.ensureCollection({
			name: 'properties',
			type: 'base',
			fields: [
				{ name: 'name', type: 'text', required: true, max: 255 },
				{ name: 'address', type: 'text', required: true, max: 255 },
				{ name: 'city', type: 'text', required: true, max: 120 },
				{ name: 'state', type: 'text', required: true, max: 80 },
				{ name: 'postal_code', type: 'text', required: true, max: 20 },
				{ name: 'notes', type: 'text', max: 5000 },
				{ name: 'photos', type: 'file', maxSelect: 12, maxSize: 10485760, mimeTypes: ['image/jpeg', 'image/png', 'image/webp'] }
			],
			listRule: authenticated,
			viewRule: authenticated,
			createRule: adminOnly,
			updateRule: adminOnly,
			deleteRule: adminOnly
		});

		await manager.ensureCollection({
			name: 'units',
			type: 'base',
			fields: [
				{ name: 'property', type: 'relation', collectionId: await this.collectionId(pb, 'properties'), maxSelect: 1, required: true },
				{ name: 'unit_number', type: 'text', required: true, max: 50 },
				{ name: 'bedrooms', type: 'number', min: 0 },
				{ name: 'bathrooms', type: 'number', min: 0 },
				{ name: 'monthly_rent', type: 'number', min: 0 },
				{ name: 'notes', type: 'text', max: 5000 }
			],
			listRule: authenticated,
			viewRule: authenticated,
			createRule: adminOnly,
			updateRule: adminOnly,
			deleteRule: adminOnly
		});

		await manager.ensureCollection({
			name: 'leases',
			type: 'base',
			fields: [
				{ name: 'tenant', type: 'relation', collectionId: await this.collectionId(pb, 'tenants'), maxSelect: 1, required: true },
				{ name: 'unit', type: 'relation', collectionId: await this.collectionId(pb, 'units'), maxSelect: 1, required: true },
				{ name: 'start_date', type: 'date', required: true },
				{ name: 'end_date', type: 'date', required: true },
				{ name: 'monthly_rent', type: 'number', min: 0 },
				{ name: 'security_deposit', type: 'number', min: 0 },
				{ name: 'status', type: 'select', required: true, maxSelect: 1, values: ['draft', 'active', 'ending', 'ended'] },
				{ name: 'document', type: 'file', maxSelect: 1, maxSize: 20971520, mimeTypes: ['application/pdf'] }
			],
			listRule: authenticated,
			viewRule: authenticated,
			createRule: adminOnly,
			updateRule: adminOnly,
			deleteRule: adminOnly
		});

		await manager.ensureCollection({
			name: 'maintenance_requests',
			type: 'base',
			fields: [
				{ name: 'tenant', type: 'relation', collectionId: await this.collectionId(pb, 'tenants'), maxSelect: 1 },
				{ name: 'unit', type: 'relation', collectionId: await this.collectionId(pb, 'units'), maxSelect: 1 },
				{ name: 'title', type: 'text', required: true, max: 255 },
				{ name: 'description', type: 'text', required: true, max: 5000 },
				{ name: 'status', type: 'select', required: true, maxSelect: 1, values: ['open', 'scheduled', 'in_progress', 'completed', 'cancelled'] },
				{ name: 'photos', type: 'file', maxSelect: 8, maxSize: 10485760, mimeTypes: ['image/jpeg', 'image/png', 'image/webp'] }
			],
			listRule: authenticated,
			viewRule: authenticated,
			createRule: authenticated,
			updateRule: authenticated,
			deleteRule: adminOnly
		});

		await manager.ensureCollection({ name: 'documents', type: 'base', fields: [
			{ name: 'tenant', type: 'relation', collectionId: await this.collectionId(pb, 'tenants'), maxSelect: 1 },
			{ name: 'lease', type: 'relation', collectionId: await this.collectionId(pb, 'leases'), maxSelect: 1 },
			{ name: 'name', type: 'text', required: true, max: 255 },
			{ name: 'category', type: 'select', required: true, maxSelect: 1, values: ['lease', 'identity', 'income', 'receipt', 'other'] },
			{ name: 'file', type: 'file', maxSelect: 1, maxSize: 20971520, mimeTypes: ['application/pdf', 'image/jpeg', 'image/png'] }
		], listRule: authenticated, viewRule: authenticated, createRule: authenticated, updateRule: authenticated, deleteRule: adminOnly });

		await manager.ensureCollection({ name: 'activity_events', type: 'base', fields: [
			{ name: 'actor', type: 'relation', collectionId: '_pb_users_auth_', maxSelect: 1 },
			{ name: 'type', type: 'text', required: true, max: 120 },
			{ name: 'description', type: 'text', required: true, max: 2000 },
			{ name: 'metadata', type: 'json' }
		], listRule: authenticated, viewRule: authenticated, createRule: authenticated, updateRule: adminOnly, deleteRule: adminOnly });
	}

	private async collectionId(pb: MigrationContext['pb'], name: string): Promise<string> {
		return (await pb.collections.getOne(name)).id;
	}
}
