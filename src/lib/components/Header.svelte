<script lang="ts">
	import { page } from '$app/stores';

	const pageTitles: Record<string, string> = {
		'/dashboard': 'Dashboard',
		'/properties': 'Properties',
		'/tenants': 'Tenants',
		'/leases': 'Leases',
		'/rent': 'Rent',
		'/expenses': 'Expenses',
		'/maintenance': 'Maintenance',
		'/vendors': 'Vendors',
		'/documents': 'Documents'
	};

	$: title = pageTitles[$page.url.pathname] ?? 'RentalOS';
	$: role = $page.data.user?.role === 'renter' ? 'Renter' : 'Property team';
</script>

<header class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
	<h2 class="text-lg font-semibold text-gray-800">{title}</h2>
	<div class="flex items-center gap-3">
		<span class="hidden text-sm text-gray-500 sm:inline">{role}</span>
		<div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
			{role === 'Renter' ? 'R' : 'A'}
		</div>
	</div>
</header>
