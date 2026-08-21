<script lang="ts">
	import '../app.css';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Header from '$lib/components/Header.svelte';
</script>

<div class="flex h-screen bg-gray-50">
	<Sidebar />
	<div class="flex flex-col flex-1 overflow-hidden">
		<Header />
		<main class="flex-1 overflow-y-auto p-6">
			<slot />
		</main>
	</div>
</div>
