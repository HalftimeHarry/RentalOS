import PocketBase from 'pocketbase';
import { dev } from '$app/environment';
import { redirect, type Handle } from '@sveltejs/kit';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import type { AuthUser } from './app.d.ts';

const publicPaths = ['/', '/apply', '/login', '/logout'];

function isPublicPath(pathname: string): boolean {
	return publicPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`)) || pathname.startsWith('/api/');
}

export const handle: Handle = async ({ event, resolve }) => {
	const pb = new PocketBase(PUBLIC_POCKETBASE_URL);
	const session = event.cookies.get('pb_auth');

	if (session) {
		try {
			const parsed = JSON.parse(session) as { token: string; model: AuthUser };
			pb.authStore.save(parsed.token, parsed.model);
			if (pb.authStore.isValid) {
				await pb.collection(parsed.model.collectionName ?? 'users').authRefresh();
			}
		} catch {
			pb.authStore.clear();
			event.cookies.delete('pb_auth', { path: '/' });
		}
	}

	event.locals.pb = pb;
	event.locals.user = pb.authStore.isValid ? (pb.authStore.model as AuthUser) : null;

	if (!isPublicPath(event.url.pathname) && !event.locals.user) {
		throw redirect(303, `/login?redirect=${encodeURIComponent(event.url.pathname)}`);
	}

	if (event.url.pathname.startsWith('/login') && event.locals.user) {
		throw redirect(303, '/dashboard');
	}

	return resolve(event);
};

export function sessionCookie(user: AuthUser, token: string, secure = !dev) {
	return {
		name: 'pb_auth',
		value: JSON.stringify({ token, model: user }),
		options: { path: '/', httpOnly: true, sameSite: 'lax' as const, secure, maxAge: 60 * 60 * 24 * 14 }
	};
}
