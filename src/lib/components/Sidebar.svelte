<script lang="ts">
	import { page } from '$app/stores';
	import { navItems, roleLabels, type UserRole } from '$lib/auth/roles';

	let role: UserRole = 'renter';
	$: role = $page.data.user?.role ?? 'renter';
	$: visibleItems = navItems.filter((item) => item.roles.includes(role));
</script>

<aside class="hidden w-64 shrink-0 flex-col bg-blue-900 text-white shadow-lg md:flex">
	<div class="border-b border-blue-800 p-6">
		<a href="/" class="text-xl font-bold tracking-wide">RentalOS</a>
		<p class="mt-1 text-xs text-blue-300">{roleLabels[role]} workspace</p>
	</div>
	<nav class="flex-1 p-4 space-y-1">
		{#each visibleItems as item}
			<a
				href={item.href}
				class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
					{$page.url.pathname === item.href
					? 'bg-blue-700 text-white font-medium'
					: 'text-blue-200 hover:bg-blue-800 hover:text-white'}"
			>
				<span class="w-5 text-center text-base">{item.icon}</span>
				{item.label}
			</a>
		{/each}
	</nav>
	<div class="border-t border-blue-800 p-4">
		<form method="POST" action="/logout">
			<button type="submit" class="text-xs text-blue-300 hover:text-white">Sign out <span aria-hidden="true">→</span></button>
		</form>
	</div>
</aside>
