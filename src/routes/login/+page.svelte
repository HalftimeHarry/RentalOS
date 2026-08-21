<script lang="ts">
	export let form: { error?: string; email?: string } | null = null;
</script>

<svelte:head><title>Sign in — RentalOS</title></svelte:head>

<main class="min-h-screen bg-[#f6f8f5] px-5 py-6 text-slate-950 sm:px-8 sm:py-10">
	<nav class="mx-auto flex max-w-5xl items-center justify-between"><a href="/" class="text-xl font-semibold tracking-tight">Rental<span class="text-emerald-700">OS</span></a><a href="/apply" class="text-sm font-medium text-emerald-700 hover:text-emerald-900">Start an application →</a></nav>
	<section class="mx-auto mt-16 grid max-w-4xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
		<div><p class="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Welcome back</p><h1 class="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Pick up where you left off.</h1><p class="mt-5 leading-7 text-slate-600">Your documents, lease, rent, and messages should be easy to find. We are setting up secure PocketBase account access now.</p></div>
		<div class="rounded-[1.5rem] bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-9"><h2 class="text-2xl font-semibold">Sign in</h2><form class="mt-7 space-y-5" method="POST"><label><span class="field-label">Email address</span><input value={form?.email ?? ''} name="email" required type="email" autocomplete="email" class="field-input" /></label><label><span class="field-label">Password</span><input name="password" required type="password" autocomplete="current-password" class="field-input" /></label><button type="submit" class="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800">Continue</button></form>{#if form?.error}<p class="mt-5 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">{form.error}</p>{/if}<div class="mt-7 border-t border-slate-100 pt-6"><p class="text-xs leading-5 text-slate-500">New accounts start as renters. A property team member can promote an account to admin after verification.</p><a href="/apply" class="mt-3 inline-block text-sm font-semibold text-emerald-700 hover:text-emerald-900">Start a rental application →</a></div></div>
	</section>
</main>
