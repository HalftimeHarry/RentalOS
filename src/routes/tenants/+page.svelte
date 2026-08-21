<script lang="ts">
	export let data: {
		tenantRecords: Array<{
			id: string;
			name: string;
			phone: string;
			email: string;
			moveIn: string;
			moveOut: string;
			leaseStatus: string;
			rent: number;
			depositAmount: number;
			documentCount: number;
			issue: string;
		}>;
	};

	function formatDate(value: string): string {
		return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
	}

	function formatCurrency(value: number): string {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
	}
</script>

<svelte:head><title>Tenants — RentalOS</title></svelte:head>

<div class="space-y-6">
	<div class="flex flex-wrap items-end justify-between gap-4"><div><p class="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">People and leases</p><h1 class="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Tenants</h1><p class="mt-2 text-sm text-slate-500">Imported from the 2728 B Street #102 tenant records.</p></div><span class="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-800">{data.tenantRecords.length} records</span></div>
	<div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
		<div class="hidden grid-cols-[1.4fr_1.1fr_0.8fr_0.8fr_0.8fr] gap-4 border-b border-gray-100 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400 md:grid"><span>Tenant</span><span>Lease</span><span>Rent</span><span>Documents</span><span>Status</span></div>
		{#each data.tenantRecords as tenant}
			<article class="grid gap-4 border-b border-gray-100 px-5 py-5 last:border-0 md:grid-cols-[1.4fr_1.1fr_0.8fr_0.8fr_0.8fr] md:items-center md:px-6"><div><h2 class="font-semibold text-slate-900">{tenant.name}</h2><p class="mt-1 text-sm text-slate-500">{tenant.email}</p><p class="text-sm text-slate-500">{tenant.phone}</p></div><div><p class="text-sm text-slate-700">{formatDate(tenant.moveIn)} – {formatDate(tenant.moveOut)}</p><p class="mt-1 text-xs text-slate-400">Deposit {formatCurrency(tenant.depositAmount)}</p></div><div><p class="font-medium text-slate-900">{formatCurrency(tenant.rent)}</p><p class="mt-1 text-xs text-slate-400">monthly</p></div><div><p class="font-medium text-slate-900">{tenant.documentCount}</p><p class="mt-1 text-xs text-slate-400">linked files</p></div><div><span class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold {tenant.leaseStatus === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}">{tenant.leaseStatus === 'pending_start' ? 'Pending start' : tenant.leaseStatus}</span>{#if tenant.issue}<p class="mt-2 text-xs text-amber-700">Issue noted</p>{/if}</div></article>
		{/each}
	</div>
</div>
