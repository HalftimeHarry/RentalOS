import { redirect } from '@sveltejs/kit';

export function POST({ cookies }) {
	cookies.delete('pb_auth', { path: '/' });
	throw redirect(303, '/');
}
