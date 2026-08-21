<script lang="ts">
	export let status: string;

	const styles: Record<string, string> = {
		paid: 'bg-green-100 text-green-800',
		active: 'bg-green-100 text-green-800',
		occupied: 'bg-blue-100 text-blue-800',
		due: 'bg-yellow-100 text-yellow-800',
		open: 'bg-orange-100 text-orange-800',
		scheduled: 'bg-blue-100 text-blue-800',
		in_progress: 'bg-purple-100 text-purple-800',
		completed: 'bg-green-100 text-green-800',
		late: 'bg-red-100 text-red-800',
		partial: 'bg-yellow-100 text-yellow-800',
		waived: 'bg-gray-100 text-gray-800',
		expired: 'bg-red-100 text-red-800',
		vacant: 'bg-gray-100 text-gray-800',
		cancelled: 'bg-red-100 text-red-800'
	};

	$: style = styles[status] ?? 'bg-gray-100 text-gray-800';
</script>

<span class="px-2 py-0.5 rounded-full text-xs font-medium {style}">
	{status.replace(/_/g, ' ')}
</span>
