<script lang="ts">
	import { page } from '$app/state';
	import { buttonVariant } from '$components/core';
</script>

<main class="relative flex h-full w-full flex-col items-start justify-center gap-10 p-5">
	<h1 class="text-2xl font-semibold text-red-500">Oh no !</h1>
	<p class="text-zinc-500">An unexpected error has occurred : {page.error?.message}.</p>
	<a href="/" class={buttonVariant()}>Go to main page</a>
</main>
