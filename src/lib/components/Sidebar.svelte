<script lang="ts">
	import { page } from '$app/stores';

	interface NavItem {
		href: string;
		label: string;
		icon: string;
	}

	const navItems: NavItem[] = [
		{ href: '/', label: 'Dashboard', icon: '🏠' },
		{ href: '/properties', label: 'Properties', icon: '🏢' },
		{ href: '/tenants', label: 'Tenants', icon: '👤' },
		{ href: '/leases', label: 'Leases', icon: '📄' },
		{ href: '/rent', label: 'Rent', icon: '💰' },
		{ href: '/expenses', label: 'Expenses', icon: '📊' },
		{ href: '/maintenance', label: 'Maintenance', icon: '🔧' },
		{ href: '/vendors', label: 'Vendors', icon: '🏪' },
		{ href: '/documents', label: 'Documents', icon: '📁' }
	];
</script>

<aside class="w-64 bg-blue-900 text-white flex flex-col shadow-lg">
	<div class="p-6 border-b border-blue-800">
		<h1 class="text-xl font-bold tracking-wide">RentalOS</h1>
		<p class="text-blue-300 text-xs mt-1">Property Management</p>
	</div>
	<nav class="flex-1 p-4 space-y-1">
		{#each navItems as item}
			<a
				href={item.href}
				class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
					{$page.url.pathname === item.href
					? 'bg-blue-700 text-white font-medium'
					: 'text-blue-200 hover:bg-blue-800 hover:text-white'}"
			>
				<span class="text-base">{item.icon}</span>
				{item.label}
			</a>
		{/each}
	</nav>
	<div class="p-4 border-t border-blue-800">
		<p class="text-blue-400 text-xs">v0.1.0</p>
	</div>
</aside>
