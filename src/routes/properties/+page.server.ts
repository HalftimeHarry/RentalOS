import { fail, error } from '@sveltejs/kit';

export async function load({ locals }) {
	if (locals.user?.role !== 'admin') throw error(403, 'Only property team members can manage properties.');

	const records = await locals.pb.collection('properties').getFullList({ sort: 'name' });
	return {
		properties: records.map((record) => ({
			id: record.id,
			name: record.name,
			address: record.address,
			city: record.city,
			state: record.state,
			postalCode: record.postal_code,
			photos: Array.isArray(record.photos) ? record.photos : []
		}))
	};
}

export const actions = {
	createProperty: async ({ locals, request }) => {
		if (locals.user?.role !== 'admin') throw error(403, 'Only property team members can create properties.');
		const form = await request.formData();
		const name = String(form.get('name') ?? '').trim();
		const address = String(form.get('address') ?? '').trim();
		const city = String(form.get('city') ?? '').trim();
		const state = String(form.get('state') ?? '').trim();
		const postalCode = String(form.get('postalCode') ?? '').trim();
		if (!name || !address || !city || !state || !postalCode) return fail(400, { action: 'createProperty', error: 'Complete all property address fields.' });

		await locals.pb.collection('properties').create({ name, address, city, state, postal_code: postalCode, notes: '' });
		return { success: true, action: 'createProperty' };
	},

	uploadPhotos: async ({ locals, request }) => {
		if (locals.user?.role !== 'admin') throw error(403, 'Only property team members can upload property images.');
		const form = await request.formData();
		const propertyId = String(form.get('propertyId') ?? '');
		const files = form.getAll('photos').filter((value): value is File => value instanceof File && value.size > 0);
		if (!propertyId || files.length === 0) return fail(400, { action: 'uploadPhotos', error: 'Choose at least one image.' });
		if (files.some((file) => !['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 10 * 1024 * 1024)) {
			return fail(400, { action: 'uploadPhotos', error: 'Images must be JPG, PNG, or WebP files under 10 MB.' });
		}

		const body = new FormData();
		for (const file of files) body.append('photos', file, file.name);
		await locals.pb.collection('properties').update(propertyId, body);
		return { success: true, action: 'uploadPhotos' };
	}
};
