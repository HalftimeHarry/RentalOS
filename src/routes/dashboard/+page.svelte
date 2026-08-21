<script lang="ts">
	import { page } from '$app/stores';
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
	$: role = $page.data.user?.role ?? 'renter';

	const now = new Date();
	const monthlyIncome = mockPayments
		.filter((payment) => payment.status === 'paid' && payment.paidDate?.getMonth() === now.getMonth() && payment.paidDate?.getFullYear() === now.getFullYear())
		.reduce((sum, payment) => sum + payment.amount, 0);
	const monthlyExpenses = mockExpenses.reduce((sum, expense) => sum + expense.amount, 0);
	const netIncome = monthlyIncome - monthlyExpenses;
	const openMaintenance = mockMaintenanceRequests.filter((request) => request.status === 'open' || request.status === 'scheduled');
	const nextDueDate = new Date();
	nextDueDate.setDate(mockLease.rentDueDay);
	if (nextDueDate <= new Date()) nextDueDate.setMonth(nextDueDate.getMonth() + 1);

	function formatDate(date: Date): string {
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
	}

	function formatCurrency(amount: number): string {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
	}
</script>

<svelte:head>
	<title>{role === 'renter' ? 'My rental' : 'Dashboard'} — RentalOS</title>
</svelte:head>

{#if role === 'renter'}
	<div class="space-y-6">
		<div class="rounded-xl bg-slate-950 p-6 text-white shadow-sm sm:p-8">
			<p class="text-sm text-emerald-300">Welcome back, {mockTenant.firstName}</p>
			<div class="mt-3 flex flex-wrap items-end justify-between gap-5">
				<div><h1 class="text-3xl font-semibold tracking-tight">Your rental, in view.</h1><p class="mt-2 text-sm text-slate-400">{mockProperty.name} · Unit {mockUnit.unitNumber}</p></div>
				<a href="/leases" class="rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400">Open my lease</a>
			</div>
		</div>

		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<StatCard label="Monthly rent" value={formatCurrency(mockLease.monthlyRent)} />
			<StatCard label="Next rent due" value={formatDate(nextDueDate)} sub="Auto-pay is off" color="yellow" />
			<StatCard label="Lease ends" value={formatDate(mockLease.endDate)} color="gray" />
			<StatCard label="Open requests" value={String(openMaintenance.length)} color={openMaintenance.length ? 'red' : 'green'} />
		</div>

		<div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
			<div class="rounded-xl border border-gray-200 bg-white shadow-sm">
				<div class="flex items-center justify-between border-b border-gray-100 px-6 py-4"><div><h2 class="font-semibold text-gray-800">Lease renewal</h2><p class="mt-1 text-sm text-gray-500">Your lease ends soon. Review your options with the property team.</p></div><span class="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">Action needed</span></div>
				<div class="space-y-4 px-6 py-5"><div class="flex items-center justify-between text-sm"><span class="text-gray-500">Current lease</span><span class="font-medium text-gray-900">{formatDate(mockLease.startDate)} – {formatDate(mockLease.endDate)}</span></div><div class="h-2 rounded-full bg-gray-100"><div class="h-2 w-[88%] rounded-full bg-emerald-600"></div></div><div class="flex items-center justify-between text-sm"><span class="text-gray-500">Next step</span><a href="/documents" class="font-semibold text-emerald-700 hover:text-emerald-900">Review documents →</a></div></div>
			</div>
			<div class="rounded-xl border border-gray-200 bg-white shadow-sm"><div class="border-b border-gray-100 px-6 py-4"><h2 class="font-semibold text-gray-800">Quick actions</h2></div><div class="grid gap-3 p-5"><a href="/maintenance" class="rounded-lg border border-gray-200 p-4 text-sm font-medium text-gray-800 hover:border-emerald-500 hover:bg-emerald-50">Report a maintenance issue <span class="float-right text-emerald-700">→</span></a><a href="/documents" class="rounded-lg border border-gray-200 p-4 text-sm font-medium text-gray-800 hover:border-emerald-500 hover:bg-emerald-50">Upload a document <span class="float-right text-emerald-700">→</span></a></div></div>
		</div>
	</div>
{:else}
	<div class="space-y-6">
		<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"><div class="flex flex-wrap items-start gap-6"><div><p class="text-xs uppercase tracking-wide text-gray-500">Property</p><p class="text-base font-semibold text-gray-900">{mockProperty.name}</p><p class="text-sm text-gray-500">{mockProperty.address}, {mockProperty.city}, {mockProperty.state} {mockProperty.postalCode}</p></div><div><p class="text-xs uppercase tracking-wide text-gray-500">Unit</p><p class="text-base font-semibold text-gray-900">{mockUnit.unitNumber}</p><p class="text-sm text-gray-500">{mockUnit.bedrooms} bd / {mockUnit.bathrooms} ba</p></div><div><p class="text-xs uppercase tracking-wide text-gray-500">Tenant</p><p class="text-base font-semibold text-gray-900">{mockTenant.firstName} {mockTenant.lastName}</p><p class="text-sm text-gray-500">{mockTenant.email}</p></div><div><p class="text-xs uppercase tracking-wide text-gray-500">Lease</p><p class="text-sm text-gray-700">{formatDate(mockLease.startDate)} – {formatDate(mockLease.endDate)}</p><StatusBadge status={mockLease.status} /></div></div></div>
		<div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6"><StatCard label="Monthly Rent" value={formatCurrency(mockLease.monthlyRent)} /><StatCard label="Security Deposit" value={formatCurrency(mockLease.securityDeposit)} color="gray" /><StatCard label="Monthly Income" value={formatCurrency(monthlyIncome)} color="green" /><StatCard label="Monthly Expenses" value={formatCurrency(monthlyExpenses)} color="red" /><StatCard label="Net Income" value={formatCurrency(netIncome)} color={netIncome >= 0 ? 'green' : 'red'} /><StatCard label="Next Rent Due" value={formatDate(nextDueDate)} sub="paid" color="green" /></div>
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-2"><div class="rounded-xl border border-gray-200 bg-white shadow-sm"><div class="flex items-center justify-between border-b border-gray-100 px-6 py-4"><h3 class="font-semibold text-gray-800">Open Maintenance</h3><span class="text-sm text-gray-400">{openMaintenance.length} open</span></div><div class="divide-y divide-gray-50">{#each openMaintenance as request}<div class="px-6 py-4"><div class="flex items-start justify-between gap-2"><div><p class="text-sm font-medium text-gray-900">{request.title}</p><p class="mt-0.5 text-xs text-gray-500">{request.description}</p></div><StatusBadge status={request.status} /></div><p class="mt-2 text-xs text-gray-400">Reported {formatDate(request.reportedDate)}</p></div>{/each}</div></div><div class="rounded-xl border border-gray-200 bg-white shadow-sm"><div class="border-b border-gray-100 px-6 py-4"><h3 class="font-semibold text-gray-800">Recent Activity</h3></div><div class="divide-y divide-gray-50">{#each [...mockActivityEvents].sort((a, b) => b.occurredAt.getTime() - a.occurredAt.getTime()) as event}<div class="px-6 py-3"><p class="text-sm text-gray-800">{event.description}</p><p class="mt-0.5 text-xs text-gray-400">{formatDate(event.occurredAt)}</p></div>{/each}</div></div></div>
	</div>
{/if}
