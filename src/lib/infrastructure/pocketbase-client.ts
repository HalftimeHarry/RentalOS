import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

let client: PocketBase | null = null;

export function getPocketBaseClient(): PocketBase {
	if (!client) {
		client = new PocketBase(PUBLIC_POCKETBASE_URL);
	}
	return client;
}
