import { fail, redirect } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { sessionCookie } from '../../hooks.server';
import type { AuthUser } from '../../app.d.ts';

export const actions = {
	default: async ({ request, cookies, url }) => {
		const formData = await request.formData();
		const email = String(formData.get('email') ?? '').trim();
		const password = String(formData.get('password') ?? '');

		if (!email || !password) {
			return fail(400, { error: 'Enter your email and password.', email });
		}

		const pb = new PocketBase(PUBLIC_POCKETBASE_URL);
		try {
			const response = await pb.collection('users').authWithPassword(email, password);
			const user = response.record as unknown as AuthUser;
			const cookie = sessionCookie(user, response.token);
			cookies.set(cookie.name, cookie.value, cookie.options);
		} catch {
			return fail(401, { error: 'Those sign-in details did not work.', email });
		} finally {
			pb.authStore.clear();
		}

		const destination = url.searchParams.get('redirect');
		throw redirect(303, destination?.startsWith('/') ? destination : '/dashboard');
	}
};
