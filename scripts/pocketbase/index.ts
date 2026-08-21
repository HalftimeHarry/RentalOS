import { readFileSync } from 'node:fs';
import PocketBase from 'pocketbase';
import { CoreCollectionsMigration } from './migrations/001-core-collections.js';
import type { Migration } from './types.js';

function loadEnvironment(): Record<string, string> {
	return Object.fromEntries(
		readFileSync('.env', 'utf8')
			.split(/\r?\n/)
			.filter((line: string) => line.length > 0 && line[0] !== '#')
			.map((line: string) => {
				const separator = line.indexOf('=');
				return [line.slice(0, separator), line.slice(separator + 1)];
			})
	);
}

class MigrationRunner {
	constructor(private readonly migrations: Migration[]) {}

	async run(pb: PocketBase): Promise<void> {
		const context = { pb };
		for (const migration of this.migrations.sort((left, right) => left.id.localeCompare(right.id))) {
			console.log(`Applying ${migration.id}: ${migration.description}`);
			await migration.up(context);
			console.log(`Applied ${migration.id}`);
		}
	}
}

const env = loadEnvironment();
const pb = new PocketBase(env.PUBLIC_POCKETBASE_URL);

try {
	await pb.collection('_superusers').authWithPassword(env.POCKETBASE_LOGIN, env.POCKETBASE_PASS);
	await new MigrationRunner([new CoreCollectionsMigration()]).run(pb);
	console.log('PocketBase migrations complete.');
} catch (error) {
	const details = error instanceof Error ? { message: error.message } : { message: 'PocketBase migration failed' };
	console.error(JSON.stringify(details));
	process.exitCode = 1;
} finally {
	pb.authStore.clear();
}
