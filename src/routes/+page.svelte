<svelte:head>
	<title>RentalOS — Rental management, made human</title>
	<meta name="description" content="A calmer way to manage rentals, applications, leases, and renter communication." />
</svelte:head>

<script lang="ts">
	const propertySlides = [
		{
			image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
			alt: 'Bright living room with large windows and a sofa',
			label: 'Living room'
		},
		{
			image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85',
			alt: 'Warm modern kitchen with wood cabinets',
			label: 'Kitchen'
		},
		{
			image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85',
			alt: 'Sunlit bedroom with a neatly made bed',
			label: 'Bedroom'
		}
	];
	let activeSlide = 0;

	function changeSlide(direction: number) {
		activeSlide = (activeSlide + direction + propertySlides.length) % propertySlides.length;
	}
</script>

<main class="min-h-screen bg-[#f6f8f5] text-slate-950">
	<nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
		<a href="/" class="text-xl font-semibold tracking-tight">Rental<span class="text-emerald-700">OS</span></a>
		<div class="flex items-center gap-3 text-sm font-medium">
			<a href="/login" class="hidden px-4 py-2 text-slate-600 hover:text-slate-950 sm:inline">Sign in</a>
			<a href="/apply" class="rounded-full bg-slate-950 px-5 py-2.5 text-white transition hover:bg-emerald-800">Start an application</a>
		</div>
	</nav>

	<section class="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:pb-28 lg:pt-20">
		<div>
			<p class="mb-6 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">A better rental relationship</p>
			<h1 class="max-w-2xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-7xl">The place where renting gets easier.</h1>
			<p class="mt-7 max-w-xl text-lg leading-8 text-slate-600">Applications, leases, rent, maintenance, and documents in one clear place for the people who manage homes and the people who live in them.</p>
			<div class="mt-9 flex flex-wrap items-center gap-4">
				<a href="/apply" class="rounded-full bg-emerald-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-800">Apply for a rental <span aria-hidden="true">→</span></a>
				<a href="/login" class="rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-500">Explore the renter view</a>
			</div>
		</div>
		<div class="relative overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl shadow-slate-900/20">
			<div class="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]">
				{#each propertySlides as slide, index}
					<img src={slide.image} alt={slide.alt} class="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 {index === activeSlide ? 'opacity-100' : 'opacity-0'}" />
				{/each}
				<div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent"></div>
				<div class="absolute inset-x-0 bottom-0 p-6 sm:p-8"><p class="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">Maple Street Duplex · Unit 102</p><h2 class="mt-2 text-3xl font-semibold">A home with room to settle in.</h2><p class="mt-2 text-sm text-slate-200">{propertySlides[activeSlide].label} · Available for your next chapter</p></div>
				<div class="absolute right-5 top-5 flex gap-2"><button type="button" aria-label="Previous property photo" on:click={() => changeSlide(-1)} class="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-lg text-white backdrop-blur hover:bg-black/70">←</button><button type="button" aria-label="Next property photo" on:click={() => changeSlide(1)} class="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-lg text-white backdrop-blur hover:bg-black/70">→</button></div>
				<div class="absolute bottom-6 right-6 flex gap-2">{#each propertySlides as _, index}<button type="button" aria-label={`Show ${propertySlides[index].label} photo`} aria-current={index === activeSlide} on:click={() => (activeSlide = index)} class="h-2 rounded-full transition-all {index === activeSlide ? 'w-8 bg-emerald-400' : 'w-2 bg-white/60'}"></button>{/each}</div>
			</div>
		</div>
	</section>

	<section class="border-y border-slate-200 bg-white px-6 py-16 lg:px-10">
		<div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-3">
			<div><p class="text-sm font-semibold text-emerald-700">For property teams</p><h2 class="mt-3 text-2xl font-semibold tracking-tight">See the whole operation.</h2><p class="mt-3 leading-7 text-slate-600">Keep leases, payments, maintenance, and people connected without losing the human part.</p></div>
			<div><p class="text-sm font-semibold text-emerald-700">For renters</p><h2 class="mt-3 text-2xl font-semibold tracking-tight">Know what happens next.</h2><p class="mt-3 leading-7 text-slate-600">Apply, upload, sign, pay, and ask for help from one focused renter workspace.</p></div>
			<div><p class="text-sm font-semibold text-emerald-700">From first hello to renewal</p><h2 class="mt-3 text-2xl font-semibold tracking-tight">A shared source of truth.</h2><p class="mt-3 leading-7 text-slate-600">Everyone gets the right view, the right documents, and fewer unanswered questions.</p></div>
		</div>
	</section>

	<footer class="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 px-6 py-8 text-sm text-slate-500 lg:px-10"><span>RentalOS</span><span>Clearer rentals for everyone.</span></footer>
</main>
