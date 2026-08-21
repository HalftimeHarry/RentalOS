<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Header from '$lib/components/Header.svelte';

	$: isPublicRoute = $page.url.pathname === '/' || $page.url.pathname.startsWith('/apply') || $page.url.pathname.startsWith('/login');
</script>

{#if isPublicRoute}
	<slot />
{:else}
	<div class="flex min-h-screen bg-gray-50">
		<Sidebar />
		<div class="flex min-w-0 flex-1 flex-col overflow-hidden">
			<Header />
			<main class="flex-1 overflow-y-auto p-4 sm:p-6">
				<slot />
			</main>
		</div>
	</div>
{/if}
