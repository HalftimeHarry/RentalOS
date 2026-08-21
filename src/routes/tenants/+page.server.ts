import { error } from '@sveltejs/kit';

export async function load({ locals }) {
	if (locals.user?.role !== 'admin') {
		throw error(403, 'Only property team members can view tenant records.');
	}

	const records = await locals.pb.collection('tenants').getFullList({ sort: 'moveOut' });
	return {
		tenantRecords: records.map((record) => ({
			id: record.id,
			name: record.name,
			phone: record.phone,
			email: record.email,
			moveIn: record.moveIn,
			moveOut: record.moveOut,
			leaseStatus: record.leaseStatus,
			rent: record.rent,
			depositAmount: record.depositAmount,
			documentCount: Array.isArray(record.documents) ? record.documents.length : 0,
			issue: record.issue
		}))
	};
}
