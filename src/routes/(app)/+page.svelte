<script lang="ts">
	import { pb } from '$services/pb/index.js';
	import { onMount } from 'svelte';

	let { data } = $props();

	let receipts = $state(data.receipts);

	onMount(async () => {
		await pb.collection('receipts').subscribe('*', async ({ action, record }) => {
			receipts = await pb.collection('receipts').getFullList();
		});
	});
</script>

<svelte:head>
	<title>Home - Receipt Vault</title>
</svelte:head>

<main class="relative flex h-full w-full flex-col gap-5 p-5">
	<h1>My receipts</h1>
	{#each receipts as receipt (receipt.id)}
		{@const src = pb.files.getURL(receipt, receipt.image, { thumb: '40x0' })}
		<div class="relative flex w-full items-start justify-start gap-5">
			<img {src} alt="Receipt {receipt.name}" class="size-10" />
			<div>{receipt.name}</div>
		</div>
	{/each}
</main>
