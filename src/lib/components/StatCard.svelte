<script lang="ts">
	export let label: string;
	export let value: string;
	export let sub: string = '';
	export let color: 'blue' | 'green' | 'red' | 'yellow' | 'gray' = 'blue';

	const colorMap = {
		blue: 'bg-blue-50 border-blue-200 text-blue-700',
		green: 'bg-green-50 border-green-200 text-green-700',
		red: 'bg-red-50 border-red-200 text-red-700',
		yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
		gray: 'bg-gray-50 border-gray-200 text-gray-700'
	};
</script>

<div class="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
	<p class="text-sm text-gray-500 mb-1">{label}</p>
	<p class="text-2xl font-bold text-gray-900">{value}</p>
	{#if sub}
		<p class="text-xs mt-1 {colorMap[color]} px-2 py-0.5 rounded-full inline-block border">{sub}</p>
	{/if}
</div>
