<script lang="ts">
	const steps = ['Rental', 'About you', 'Income', 'Documents', 'Review'];
	let currentStep = 0;
	let submitted = false;
	let selectedFiles: string[] = [];

	let application = {
		property: 'Maple Street Duplex',
		unit: 'Unit 102',
		moveIn: '',
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		occupants: '1',
		employer: '',
		monthlyIncome: '',
		employmentLength: '',
		referenceName: '',
		referencePhone: '',
		agreement: false
	};

	function nextStep() {
		if (currentStep < steps.length - 1) currentStep += 1;
	}

	function previousStep() {
		if (currentStep > 0) currentStep -= 1;
	}

	function handleFiles(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		selectedFiles = Array.from(input.files ?? []).map((file) => file.name);
	}

	function submitApplication() {
		submitted = true;
	}
</script>

<svelte:head>
	<title>Rental application — RentalOS</title>
	<meta name="description" content="Complete your RentalOS rental application." />
</svelte:head>

<main class="min-h-screen bg-[#f6f8f5] px-5 py-6 text-slate-950 sm:px-8 sm:py-10">
	<nav class="mx-auto flex max-w-5xl items-center justify-between">
		<a href="/" class="text-xl font-semibold tracking-tight">Rental<span class="text-emerald-700">OS</span></a>
		<a href="/login" class="text-sm font-medium text-slate-600 hover:text-slate-950">Already have an account? <span class="text-emerald-700">Sign in</span></a>
	</nav>

	{#if submitted}
		<section class="mx-auto mt-16 max-w-xl rounded-[2rem] bg-white p-8 text-center shadow-xl shadow-slate-900/5 sm:p-12">
			<div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">✓</div>
			<p class="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Application received</p>
			<h1 class="mt-3 text-3xl font-semibold tracking-tight">We have your application.</h1>
			<p class="mt-4 leading-7 text-slate-600">The property team can now review your details. We will use the email you provided for next steps.</p>
			<div class="mt-8 flex flex-wrap justify-center gap-3"><a href="/" class="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800">Return home</a><a href="/dashboard?role=renter" class="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-500">View renter workspace</a></div>
		</section>
	{:else}
		<section class="mx-auto mt-12 max-w-5xl">
			<div class="max-w-2xl"><p class="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Rental application</p><h1 class="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Let’s get you home.</h1><p class="mt-4 text-lg leading-8 text-slate-600">Take your time. You can review everything before submitting.</p></div>

			<div class="mt-10 grid gap-8 lg:grid-cols-[190px_1fr]">
				<ol class="flex gap-3 overflow-x-auto pb-2 lg:block lg:space-y-4 lg:pb-0">
					{#each steps as step, index}
						<li class="flex shrink-0 items-center gap-3 text-sm lg:gap-4"><span class="flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold {index === currentStep ? 'border-emerald-700 bg-emerald-700 text-white' : index < currentStep ? 'border-emerald-200 bg-emerald-100 text-emerald-800' : 'border-slate-300 text-slate-400'}">{index < currentStep ? '✓' : index + 1}</span><span class={index === currentStep ? 'font-semibold text-slate-900' : 'text-slate-500'}>{step}</span></li>
					{/each}
				</ol>

				<form class="rounded-[1.5rem] bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-9" on:submit|preventDefault={currentStep === steps.length - 1 ? submitApplication : nextStep}>
					{#if currentStep === 0}
						<div><h2 class="text-2xl font-semibold">Where would you like to live?</h2><p class="mt-2 text-sm text-slate-500">Start with the home you are applying for.</p><div class="mt-8 grid gap-5 sm:grid-cols-2"><label class="sm:col-span-2"><span class="field-label">Property</span><select bind:value={application.property} class="field-input"><option>Maple Street Duplex</option><option>Oak Avenue Apartments</option></select></label><label><span class="field-label">Unit</span><select bind:value={application.unit} class="field-input"><option>Unit 102</option><option>Unit 201</option></select></label><label><span class="field-label">Desired move-in date</span><input bind:value={application.moveIn} type="date" class="field-input" /></label></div></div>
					{:else if currentStep === 1}
						<div><h2 class="text-2xl font-semibold">Tell us about yourself.</h2><p class="mt-2 text-sm text-slate-500">This will become your renter profile if your application is approved.</p><div class="mt-8 grid gap-5 sm:grid-cols-2"><label><span class="field-label">First name</span><input bind:value={application.firstName} required class="field-input" /></label><label><span class="field-label">Last name</span><input bind:value={application.lastName} required class="field-input" /></label><label><span class="field-label">Email address</span><input bind:value={application.email} required type="email" class="field-input" /></label><label><span class="field-label">Phone number</span><input bind:value={application.phone} required type="tel" class="field-input" /></label><label><span class="field-label">People who will live here</span><select bind:value={application.occupants} class="field-input"><option value="1">Just me</option><option value="2">2 people</option><option value="3">3 people</option><option value="4">4+ people</option></select></label></div></div>
					{:else if currentStep === 2}
						<div><h2 class="text-2xl font-semibold">Show us your income.</h2><p class="mt-2 text-sm text-slate-500">A few details help the property team review your application.</p><div class="mt-8 grid gap-5 sm:grid-cols-2"><label><span class="field-label">Employer or income source</span><input bind:value={application.employer} required class="field-input" /></label><label><span class="field-label">Monthly gross income</span><input bind:value={application.monthlyIncome} required type="number" min="0" class="field-input" placeholder="$ 0" /></label><label><span class="field-label">Time in current employment</span><select bind:value={application.employmentLength} class="field-input"><option value="">Select one</option><option>Less than 6 months</option><option>6–12 months</option><option>1–3 years</option><option>More than 3 years</option></select></label><label><span class="field-label">Current landlord or reference</span><input bind:value={application.referenceName} class="field-input" placeholder="Name" /></label><label><span class="field-label">Reference phone</span><input bind:value={application.referencePhone} type="tel" class="field-input" /></label></div></div>
					{:else if currentStep === 3}
						<div><h2 class="text-2xl font-semibold">Add supporting documents.</h2><p class="mt-2 text-sm text-slate-500">Upload proof of income or identification. You can add more later.</p><label class="mt-8 flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 text-center transition hover:border-emerald-500 hover:bg-emerald-50"><span class="text-3xl text-emerald-700">↑</span><span class="mt-3 text-sm font-semibold text-slate-800">Choose files to upload</span><span class="mt-1 text-xs text-slate-500">PDF, JPG, or PNG up to 10 MB</span><input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" class="sr-only" on:change={handleFiles} /></label>{#if selectedFiles.length}<div class="mt-5 space-y-2">{#each selectedFiles as file}<div class="flex items-center justify-between rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-900"><span>{file}</span><span>Ready</span></div>{/each}</div>{/if}</div>
					{:else}
						<div><h2 class="text-2xl font-semibold">Review before sending.</h2><p class="mt-2 text-sm text-slate-500">Make sure everything looks right. The property team will review your application after submission.</p><div class="mt-8 divide-y divide-slate-100 rounded-2xl border border-slate-200"><div class="flex justify-between gap-4 p-4 text-sm"><span class="text-slate-500">Rental</span><span class="font-medium text-slate-900">{application.property}, {application.unit}</span></div><div class="flex justify-between gap-4 p-4 text-sm"><span class="text-slate-500">Applicant</span><span class="font-medium text-slate-900">{application.firstName || 'Not provided'} {application.lastName}</span></div><div class="flex justify-between gap-4 p-4 text-sm"><span class="text-slate-500">Contact</span><span class="font-medium text-slate-900">{application.email || 'Not provided'}</span></div><div class="flex justify-between gap-4 p-4 text-sm"><span class="text-slate-500">Documents</span><span class="font-medium text-slate-900">{selectedFiles.length ? `${selectedFiles.length} attached` : 'None attached'}</span></div></div><label class="mt-6 flex gap-3 text-sm text-slate-600"><input bind:checked={application.agreement} required type="checkbox" class="mt-1 h-4 w-4 accent-emerald-700" />I confirm that the information above is accurate and I consent to the property team reviewing this application.</label></div>
					{/if}
					<div class="mt-10 flex items-center justify-between gap-4 border-t border-slate-100 pt-6"><button type="button" on:click={previousStep} disabled={currentStep === 0} class="rounded-full px-4 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-950 disabled:invisible">Back</button><button type="submit" class="rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/10 hover:bg-emerald-800">{currentStep === steps.length - 1 ? 'Submit application' : 'Continue'} <span aria-hidden="true">→</span></button></div>
				</form>
			</div>
		</section>
	{/if}
</main>
