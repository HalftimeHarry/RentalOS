import type PocketBase from 'pocketbase';

export type PocketBaseClient = PocketBase;
export type CollectionType = 'base' | 'auth';

export interface MigrationContext {
	pb: PocketBaseClient;
}

export interface Migration {
	readonly id: string;
	readonly description: string;
	up(context: MigrationContext): Promise<void>;
}

export interface FieldDefinition {
	name: string;
	type: string;
	[key: string]: unknown;
}

export interface CollectionDefinition {
	name: string;
	type: CollectionType;
	fields: FieldDefinition[];
	listRule?: string;
	viewRule?: string;
	createRule?: string;
	updateRule?: string;
	deleteRule?: string;
}
