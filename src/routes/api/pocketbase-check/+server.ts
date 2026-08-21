import PocketBase from 'pocketbase';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { json } from '@sveltejs/kit';

export async function GET() {
	if (!dev) {
		return json({ error: 'Not found' }, { status: 404 });
	}

	const client = new PocketBase(PUBLIC_POCKETBASE_URL);
	const login = env.POCKETBASE_LOGIN;
	const password = env.POCKETBASE_PASS;

	if (!login || !password) {
		return json({ error: 'PocketBase credentials are not configured' }, { status: 500 });
	}

	try {
		const authResponse = await client.collection('_superusers').authWithPassword(login, password);

		return json({
			serverReachable: true,
			authenticated: true,
			authStoreValid: client.authStore.isValid,
			authenticatedRecordId: authResponse.record.id
		});
	} catch (error) {
		const status =
			typeof error === 'object' && error !== null && 'status' in error && typeof error.status === 'number'
				? error.status
				: 502;
		const message = error instanceof Error ? error.message : 'PocketBase authentication failed';

		return json(
			{
				serverReachable: status !== 502,
				authenticated: false,
				authStoreValid: client.authStore.isValid,
				error: message
			},
			{ status: typeof status === 'number' ? status : 502 }
		);
	} finally {
		client.authStore.clear();
	}
}