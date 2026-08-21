<script lang="ts">
	import StatCard from '$lib/components/StatCard.svelte';
	import StatusBadge from '$lib/components/StatusBadge.svelte';
	import {
		mockProperty,
		mockUnit,
		mockTenant,
		mockLease,
		mockPayments,
		mockExpenses,
		mockMaintenanceRequests,
		mockActivityEvents
	} from '$lib/mock/dashboard-data.js';

	const now = new Date();
	const monthlyIncome = mockPayments
		.filter(
			(p) =>
				p.status === 'paid' &&
				p.paidDate !== undefined &&
				p.paidDate.getMonth() === now.getMonth() &&
				p.paidDate.getFullYear() === now.getFullYear()
		)
		.reduce((sum, p) => sum + p.amount, 0);

	const monthlyExpenses = mockExpenses.reduce((sum, e) => sum + e.amount, 0);
	const netIncome = monthlyIncome - monthlyExpenses;

	const openMaintenance = mockMaintenanceRequests.filter(
		(r) => r.status === 'open' || r.status === 'scheduled'
	);

	function formatDate(date: Date): string {
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
	}

	function formatCurrency(amount: number): string {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
	}

	const nextDueDate = new Date();
	nextDueDate.setDate(mockLease.rentDueDay);
	if (nextDueDate <= new Date()) nextDueDate.setMonth(nextDueDate.getMonth() + 1);
</script>

<svelte:head>
	<title>Dashboard — RentalOS</title>
</svelte:head>

<div class="space-y-6">
	<div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
		<div class="flex flex-wrap gap-6 items-start">
			<div>
				<p class="text-xs text-gray-500 uppercase tracking-wide">Property</p>
				<p class="text-base font-semibold text-gray-900">{mockProperty.name}</p>
				<p class="text-sm text-gray-500">{mockProperty.address}, {mockProperty.city}, {mockProperty.state} {mockProperty.postalCode}</p>
			</div>
			<div>
				<p class="text-xs text-gray-500 uppercase tracking-wide">Unit</p>
				<p class="text-base font-semibold text-gray-900">{mockUnit.unitNumber}</p>
				<p class="text-sm text-gray-500">{mockUnit.bedrooms} bd / {mockUnit.bathrooms} ba</p>
			</div>
			<div>
				<p class="text-xs text-gray-500 uppercase tracking-wide">Tenant</p>
				<p class="text-base font-semibold text-gray-900">{mockTenant.firstName} {mockTenant.lastName}</p>
				<p class="text-sm text-gray-500">{mockTenant.email}</p>
			</div>
			<div>
				<p class="text-xs text-gray-500 uppercase tracking-wide">Lease</p>
				<p class="text-sm text-gray-700">{formatDate(mockLease.startDate)} – {formatDate(mockLease.endDate)}</p>
				<StatusBadge status={mockLease.status} />
			</div>
		</div>
	</div>

	<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
		<StatCard label="Monthly Rent" value={formatCurrency(mockLease.monthlyRent)} />
		<StatCard label="Security Deposit" value={formatCurrency(mockLease.securityDeposit)} color="gray" />
		<StatCard label="Monthly Income" value={formatCurrency(monthlyIncome)} color="green" />
		<StatCard label="Monthly Expenses" value={formatCurrency(monthlyExpenses)} color="red" />
		<StatCard label="Net Income" value={formatCurrency(netIncome)} color={netIncome >= 0 ? 'green' : 'red'} />
		<StatCard label="Next Rent Due" value={formatDate(nextDueDate)} sub={mockPayments[0]?.status === 'paid' ? 'paid' : 'due'} color={mockPayments[0]?.status === 'paid' ? 'green' : 'yellow'} />
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
		<div class="bg-white rounded-xl border border-gray-200 shadow-sm">
			<div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
				<h3 class="font-semibold text-gray-800">Open Maintenance</h3>
				<span class="text-sm text-gray-400">{openMaintenance.length} open</span>
			</div>
			<div class="divide-y divide-gray-50">
				{#each openMaintenance as req}
					<div class="px-6 py-4">
						<div class="flex items-start justify-between gap-2">
							<div>
								<p class="text-sm font-medium text-gray-900">{req.title}</p>
								<p class="text-xs text-gray-500 mt-0.5">{req.description}</p>
							</div>
							<StatusBadge status={req.status} />
						</div>
						<p class="text-xs text-gray-400 mt-2">Reported {formatDate(req.reportedDate)}</p>
					</div>
				{/each}
				{#if openMaintenance.length === 0}
					<p class="px-6 py-4 text-sm text-gray-400">No open maintenance requests.</p>
				{/if}
			</div>
		</div>

		<div class="bg-white rounded-xl border border-gray-200 shadow-sm">
			<div class="px-6 py-4 border-b border-gray-100">
				<h3 class="font-semibold text-gray-800">Recent Activity</h3>
			</div>
			<div class="divide-y divide-gray-50">
				{#each [...mockActivityEvents].sort((a, b) => b.occurredAt.getTime() - a.occurredAt.getTime()) as evt}
					<div class="px-6 py-3">
						<p class="text-sm text-gray-800">{evt.description}</p>
						<p class="text-xs text-gray-400 mt-0.5">{formatDate(evt.occurredAt)}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
